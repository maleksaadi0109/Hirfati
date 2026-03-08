<?php

namespace App\Actions\Auth;

use App\Mail\Auth\SendResetCodeMail;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;

class SendResetCodeAction
{
    /**
     * Max code sends allowed per window.
     */
    private const MAX_SENDS = 3;

    /**
     * Rate-limit window in seconds (3 hours).
     */
    private const WINDOW_SECONDS = 3 * 60 * 60;
    /**
     * How long a code stays valid (in minutes).
     */
    private const CODE_LIFETIME_MINUTES = 15;

    public function execute(string $email, string $ip): void
    {
        $this->ensureNotRateLimited($email, $ip);
        $this->deleteExpiredTokens();

        $code = random_int(100000, 999999);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            [
                'token'      => Hash::make($code),
                'created_at' => now(),
            ]
        );

        Mail::to($email)->send(new SendResetCodeMail($code));
    }

    /**
     * Remove stale reset tokens so the table does not keep expired records.
     */
    private function deleteExpiredTokens(): void
    {
        DB::table('password_reset_tokens')
            ->where('created_at', '<', now()->subMinutes(self::CODE_LIFETIME_MINUTES))
            ->delete();
    }

    /**
     * Abort with 429 if the user has sent too many codes.
     */
    private function ensureNotRateLimited(string $email, string $ip): void
    {
        $key = 'send-reset-code:' . strtolower($email) . '|' . $ip;

        if (RateLimiter::tooManyAttempts($key, self::MAX_SENDS)) {


            throw new HttpResponseException(response()->json([
                'message'             => __('Too many code requests. Please try again later.')
           ], 429));
        }

        RateLimiter::hit($key, self::WINDOW_SECONDS);
    }
}
