<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\ForgotPasswordController;
use App\Http\Controllers\Api\Auth\EmailVerificationController;

/*
|--------------------------------------------------------------------------
| Authentication API Routes
|--------------------------------------------------------------------------
|
| POST /register          → Start registration (cache + send code)
| POST /register/verify   → Verify code and create account
| POST /register/resend   → Resend verification code
| POST /login             → Login and get token
| POST /logout            → Revoke current token (auth required)
| POST /password/send-code   → Send password reset code
| POST /password/verify-code → Verify reset code
| POST /password/reset       → Set new password
| POST /email/send-verification → Send email verification (auth required)
| POST /email/verify            → Verify email code (auth required)
|
*/

// ─── Registration ────────────────────────────────────────────────────
Route::prefix('register')->group(function () {
    Route::post('/',       [RegisterController::class, 'store'])->middleware('throttle:register');
    Route::post('/verify', [RegisterController::class, 'verify'])->middleware('throttle:register-verify');
    Route::post('/resend', [RegisterController::class, 'resendCode'])->middleware('throttle:register-resend');
});

// ─── Login ───────────────────────────────────────────────────────────
Route::post('/login', [LoginController::class, 'login'])
    ->middleware([
        'throttle:login',
        \Illuminate\Cookie\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
    ]);

// ─── Forgot Password ────────────────────────────────────────────────
Route::prefix('password')->group(function () {
    Route::post('/send-code',   [ForgotPasswordController::class, 'sendCode'])->middleware('throttle:password-send-code');
    Route::post('/verify-code', [ForgotPasswordController::class, 'verifyCode'])->middleware('throttle:password-verify-code');
    Route::post('/reset',       [ForgotPasswordController::class, 'resetPassword']);
});

// ─── Authenticated Routes ────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);

    // Email verification
    Route::prefix('email')->group(function () {
        Route::post('/send-verification', [EmailVerificationController::class, 'sendCode']);
        Route::post('/verify',            [EmailVerificationController::class, 'verify']);
    });
});
