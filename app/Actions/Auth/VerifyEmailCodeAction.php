<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Cache;

class VerifyEmailCodeAction
{
    private const MAX_ATTEMPTS = 5;

    public function execute(User $user, string $code): void
    {
        $cacheKey = "email-verify:{$user->id}";
        $data = Cache::get($cacheKey);

        if (!$data) {
            throw new HttpResponseException(response()->json([
                'message' => 'Verification code has expired. Please request a new one.',
            ], 422));
        }

        // Check max attempts
        if (($data['attempts'] ?? 0) >= self::MAX_ATTEMPTS) {
            Cache::forget($cacheKey);

            throw new HttpResponseException(response()->json([
                'message' => 'Too many failed attempts. Please request a new code.',
            ], 429));
        }

        // Wrong code — increment attempts
        if ($data['code'] !== $code) {
            $data['attempts'] = ($data['attempts'] ?? 0) + 1;
            Cache::put($cacheKey, $data, now()->addMinutes(15));

            $remaining = self::MAX_ATTEMPTS - $data['attempts'];

            throw new HttpResponseException(response()->json([
                'message' => "Invalid verification code. {$remaining} attempt(s) remaining.",
            ], 422));
        }

        // Code is correct — verify the email
        $user->update(['email_verified_at' => now()]);
        Cache::forget($cacheKey);
    }
}
