<?php

namespace App\Actions\Auth;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;

class VerifyResetCodeAction
{
    /**
     * Max verification attempts allowed per window.
     */
    private const MAX_ATTEMPTS = 5;

    /**
     * Rate-limit window in seconds (1 hour).
     */
    private const WINDOW_SECONDS = 60 * 60;

    /**
     * How long a code stays valid (in minutes).
     */
    private const CODE_LIFETIME_MINUTES = 15;

    /**
     * Verify the reset code and return a short-lived token for the password reset step.
     */
    public function execute(string $email, string $code, string $ip): void
    {
        $this->ensureNotRateLimited($email, $ip);

        $record = DB::table('password_reset_tokens')
            ->where('email', $email)
            ->first();

        if (! $record) {
            throw new HttpResponseException(response()->json([
                'message' => __('No reset code found for this email.'),
            ], 404));
        }

        // Check if the code has expired
        if (now()->diffInMinutes($record->created_at) > self::CODE_LIFETIME_MINUTES) {
            DB::table('password_reset_tokens')->where('email', $email)->delete();

            throw new HttpResponseException(response()->json([
                'message' => __('Reset code has expired. Please request a new one.'),
            ], 422));
        }

        // Check if the code matches
        if (! Hash::check($code, $record->token)) {
            throw new HttpResponseException(response()->json([
                'message' => __('Invalid reset code.'),
            ], 422));
        }

        // Code is valid — clear the rate limiter for verification
        $key = 'verify-reset-code:' . strtolower($email) . '|' . $ip;
        RateLimiter::clear($key);
    }

    /**
     * Abort with 429 if the user has failed too many verification attempts.
     */
    private function ensureNotRateLimited(string $email, string $ip): void
    {
        $key = 'verify-reset-code:' . strtolower($email) . '|' . $ip;

        if (RateLimiter::tooManyAttempts($key, self::MAX_ATTEMPTS)) {
            $seconds = RateLimiter::availableIn($key);

            throw new HttpResponseException(response()->json([
                'message'             => __('Too many failed attempts. Please try again later.'),
                'retry_after_seconds' => $seconds,
            ], 429));
        }

        RateLimiter::hit($key, self::WINDOW_SECONDS);
    }
}
