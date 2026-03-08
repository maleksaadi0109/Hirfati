<?php

namespace App\Actions\Auth;

use App\Mail\Auth\EmailVerificationCodeMail;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Exceptions\HttpResponseException;

class SendEmailVerificationCodeAction
{
    private const MAX_SENDS = 5;
    private const WINDOW_SECONDS = 3600; // 1 hour
    private const CODE_LIFETIME_MINUTES = 15;

    public function execute(User $user, string $ip): void
    {
        if (!$user->email) {
            throw new HttpResponseException(response()->json([
                'message' => 'No email address associated with this account.',
            ], 422));
        }

        if ($user->email_verified_at) {
            throw new HttpResponseException(response()->json([
                'message' => 'Email is already verified.',
            ], 422));
        }

        $this->ensureNotRateLimited($user->id, $ip);

        $code = random_int(100000, 999999);

        // Store code in cache for 15 minutes
        Cache::put(
            "email-verify:{$user->id}",
            [
                'code'       => (string) $code,
                'attempts'   => 0,
                'created_at' => now()->timestamp,
            ],
            now()->addMinutes(self::CODE_LIFETIME_MINUTES)
        );

        Mail::to($user->email)->send(
            new EmailVerificationCodeMail((string) $code, $user->first_name)
        );
    }

    private function ensureNotRateLimited(int $userId, string $ip): void
    {
        $key = "email-verify-send:{$userId}|{$ip}";

        if (RateLimiter::tooManyAttempts($key, self::MAX_SENDS)) {
            $seconds = RateLimiter::availableIn($key);

            throw new HttpResponseException(response()->json([
                'message'             => 'Too many verification emails. Please try again later.',
                'retry_after_seconds' => $seconds,
            ], 429));
        }

        RateLimiter::hit($key, self::WINDOW_SECONDS);
    }
}
