<?php

namespace App\Actions\Auth;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class VerifyRegistrationCodeAction
{
    private const MAX_ATTEMPTS = 5;
    private const REGISTRATION_FILE_DISK = 'local';

    /**
     * Verify the registration code and create the user.
     *
     * @return array{user: UserResource, access_token: string}
     */
    public function execute(string $pendingToken, string $code): array
    {
        $cacheKey = "pending-registration:{$pendingToken}";
        $pending = Cache::get($cacheKey);

        // 1. Check if pending registration exists
        if (!$pending) {
            throw new HttpResponseException(response()->json([
                'message' => 'Registration session has expired. Please register again.',
            ], 422));
        }

        // 2. Check max attempts
        if (($pending['attempts'] ?? 0) >= self::MAX_ATTEMPTS) {
            // Clean up: delete cache + temp file
            $this->cleanup($cacheKey, $pending['file_path'] ?? null);

            throw new HttpResponseException(response()->json([
                'message' => 'Too many failed attempts. Please register again.',
            ], 429));
        }

        // 3. Wrong code — increment attempts
        if ($pending['code'] !== $code) {
            $pending['attempts'] = ($pending['attempts'] ?? 0) + 1;
            Cache::put($cacheKey, $pending, now()->addMinutes(30));

            $remaining = self::MAX_ATTEMPTS - $pending['attempts'];

            throw new HttpResponseException(response()->json([
                'message' => "Invalid verification code. {$remaining} attempt(s) remaining.",
            ], 422));
        }

        // 4. Code is correct — NOW create the user in the database
        try {
            $user = DB::transaction(function () use ($pending) {
                $data = $pending['data'];

                // Move temp file to final location if it exists
                $finalDocPath = null;
                if (!empty($pending['file_path'])) {
                    $finalDocPath = str_replace('temp/pending_registrations/', 'verification_documents/', $pending['file_path']);
                    Storage::disk(self::REGISTRATION_FILE_DISK)->move($pending['file_path'], $finalDocPath);
                }

                // Create the user
                $user = User::create([
                    'first_name'      => $data['first_name'],
                    'last_name'       => $data['last_name'],
                    'email'           => $data['email'],
                    'password'        => $data['password'],
                    'phone_number'    => $data['phone_number'],
                    'role'            => $data['role'] ?? User::ROLE_CUSTOMER,
                    'latitude'        => $data['latitude'] ?? null,
                    'longitude'       => $data['longitude'] ?? null,
                    'city'            => $data['city'] ?? null,
                    'email_verified_at' => now(), // Email is verified!
                ]);

                // Create role-specific profile
                if ($user->role === User::ROLE_CUSTOMER) {
                    $user->customer()->create([]);
                } elseif ($user->role === User::ROLE_PROVIDER) {
                    $user->provider()->create([
                        'profession'                 => $data['profession'] ?? $data['category'] ?? 'Pending',
                        'years_of_experience'        => $data['experience'] ?? null,
                        'verification_document_path' => $finalDocPath,
                        'application_status'         => 'pending',
                        'is_available'               => true,
                    ]);
                }

                return $user;
            });
        } catch (QueryException $e) {
            
            $sqlState = $e->errorInfo[0] ?? null;
            $driverCode = $e->errorInfo[1] ?? null;

            if ($sqlState === '23000' || $sqlState === '23505' || (int) $driverCode === 1062) {
                $this->cleanup($cacheKey, $pending['file_path'] ?? null);

                throw new HttpResponseException(response()->json([
                    'message' => 'Email or phone number is already registered.',
                ], 409));
            }

            throw $e;
        }

        // 5. Create auth token
        $token = $user->createToken('auth_token')->plainTextToken;

        // 6. Clean up cache
        Cache::forget($cacheKey);

        return [
            'user'         => UserResource::make($user),
            'access_token' => $token,
        ];
    }

    /**
     * Clean up cache and temp files.
     */
    private function cleanup(string $cacheKey, ?string $filePath): void
    {
        Cache::forget($cacheKey);

        if ($filePath && Storage::disk(self::REGISTRATION_FILE_DISK)->exists($filePath)) {
            Storage::disk(self::REGISTRATION_FILE_DISK)->delete($filePath);
        }
    }
}
