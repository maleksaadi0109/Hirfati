<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginUserAction
{
    /**
     * Handle the user login and token generation.
     * * @return array{user: User, access_token: string, token_type: string}
     *
     * @throws ValidationException
     */
    public function execute(array $credentials): array
    {
        if (! Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['The email or password you entered is incorrect.'],
            ]);
        }

        // Regenerate the session so the web session cookie is persisted.
        // This allows web routes (e.g. /admin/craftsmen) to recognise the user.
        request()->session()->regenerate();

        /** @var User $user */
        $user = Auth::user();

        // Block suspended accounts
        if ($user->is_blocked) {
            $this->deleteSession();
           

            throw ValidationException::withMessages([
                'email' => ['Your account has been suspended. Please contact support.'],
            ]);
        }

        // Block providers who are not approved yet
        if ($user->role === User::ROLE_PROVIDER) {
            $status = $user->provider?->application_status;

            if ($status === 'pending') {
                 $this->deleteSession();

                throw ValidationException::withMessages([
                    'email' => ['Your provider application is under review. Please wait for admin approval.'],
                ]);
            }

            if ($status === 'rejected') {
                $token = $user->createToken(
                    'auth_token',
                    ['*'],
                    now()->addMinutes(5)
                )->plainTextToken;

                return [
                    'user' => $user,
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'status' => 'rejected',
                ];
            }
        }

        $minutes = $user->role === 'admin' ? 60 : 10080; // admin=1h, normal=7 days

        $token = $user->createToken(
            'auth_token',
            ['*'],
            now()->addMinutes($minutes)
        )->plainTextToken;

        return [
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'status' => 'ok',
        ];
    }
    private function deleteSession(){
        Auth::logout();
         request()->session()->invalidate();
            request()->session()->regenerateToken();
    }
}
