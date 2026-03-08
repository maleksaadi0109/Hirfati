<?php

namespace App\Actions\Auth;

use App\Mail\Auth\EmailVerificationCodeMail;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class RegisterStoreAction
{
    private const CODE_LIFETIME_MINUTES = 30;
    private const REGISTRATION_CACHE_PREFIX = 'pending-registration:';
    private const PENDING_DOCUMENTS_DIR = 'temp/pending_registrations';
    private const REGISTRATION_FILE_DISK = 'local';

    /**
     * Validate data, store pending registration in cache, and send verification code.
     */
    public function execute(RegisterRequest $request): string
    {
        $validated = $request->validated();

        $pendingToken = Str::uuid()->toString();

        $tempFilePath = null;
        if ($request->hasFile('id_document')) {
            $tempFilePath = $request->file('id_document')
                ->store(self::PENDING_DOCUMENTS_DIR, self::REGISTRATION_FILE_DISK);
        }

        $code = (string) random_int(100000, 999999);
        unset($validated['id_document']);

        $cacheKey = self::REGISTRATION_CACHE_PREFIX . $pendingToken;
        Cache::put($cacheKey, [
            'data'       => $validated,
            'code'       => $code,
            'attempts'   => 0,
            'send_count' => 1,
            'file_path'  => $tempFilePath,
        ], now()->addMinutes(self::CODE_LIFETIME_MINUTES));

        try {
            Mail::to($validated['email'])->send(
                new EmailVerificationCodeMail($code, $validated['first_name'])
            );
        } catch (\Throwable $mailException) {
            Cache::forget($cacheKey);

            if ($tempFilePath && Storage::disk(self::REGISTRATION_FILE_DISK)->exists($tempFilePath)) {
                Storage::disk(self::REGISTRATION_FILE_DISK)->delete($tempFilePath);
            }

            throw $mailException;
        }

        return $pendingToken;
    }
}
