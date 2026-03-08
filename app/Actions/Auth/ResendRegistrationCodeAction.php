<?php

namespace App\Actions\Auth;

use App\Mail\Auth\EmailVerificationCodeMail;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;

class ResendRegistrationCodeAction
{
    private const MAX_RESENDS = 3;
    private const CODE_LIFETIME_MINUTES = 30;

    /**
     * Resend the verification code for a pending registration.
     */
    public function execute(string $pendingToken): void
    {
        $cacheKey = "pending-registration:{$pendingToken}";
        $pending = Cache::get($cacheKey);

        // 1. Check if pending registration exists
        if (!$pending) {
            throw new HttpResponseException(response()->json([
                'message' => 'Registration session has expired. Please register again.',
            ], 422));
        }

        // 2. Check max resends
        if (($pending['send_count'] ?? 1) >= self::MAX_RESENDS) {
            throw new HttpResponseException(response()->json([
                'message' => 'Maximum resend limit reached. Please register again.',
            ], 429));
        }

        // 3. Generate a new code
        $newCode = (string) random_int(100000, 999999);

        $data = $pending['data'];

        // 4. Send the new code via email first; cache is updated only on success.
        Mail::to($data['email'])->send(
            new EmailVerificationCodeMail($newCode, $data['first_name'])
        );

        // 5. Update cache with new code and reset attempts
        $pending['code']       = $newCode;
        $pending['attempts']   = 0;
        $pending['send_count'] = ($pending['send_count'] ?? 1) + 1;

        Cache::put($cacheKey, $pending, now()->addMinutes(self::CODE_LIFETIME_MINUTES));
    }
}
