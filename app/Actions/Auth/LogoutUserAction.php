<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class LogoutUserAction
{
    public function execute(User $user): void
    {
        // 1. Delete the Sanctum API token
        /** @var \Laravel\Sanctum\PersonalAccessToken|null $token */
        $token = $user->currentAccessToken();

        if ($token) {
            $token->delete();
        } else {
            $user->tokens()->delete();
        }

        // 2. Destroy the web session (since login also creates a session)
        Auth::guard('web')->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
    }
}
