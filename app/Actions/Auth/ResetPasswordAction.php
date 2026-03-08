<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ResetPasswordAction
{
    /**
     * Reset the user's password and clean up the token.
     */
    public function execute(string $email, string $password): void
    {
        $user = User::where('email', $email)->first();

        if (! $user) {
            throw new HttpResponseException(response()->json([
                'message' => __('User not found.'),
            ], 404));
        }

        $user->update([
            'password' => Hash::make($password),
        ]);

        // Remove the reset token so it can't be reused
        DB::table('password_reset_tokens')->where('email', $email)->delete();
    }
}
