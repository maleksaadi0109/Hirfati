<?php

namespace App\Http\Controllers\Api\Auth;

use App\Actions\Auth\SendEmailVerificationCodeAction;
use App\Actions\Auth\VerifyEmailCodeAction;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmailVerificationController extends Controller
{
    use ApiResponses;

    /**
     * Send (or resend) a 6-digit verification code to the authenticated user's email.
     */
    public function sendCode(Request $request, SendEmailVerificationCodeAction $action): JsonResponse
    {
        $action->execute($request->user(), $request->ip());

        return $this->success('Verification code sent to your email.', [], 200);
    }

    /**
     * Verify the code the user submitted.
     */
    public function verify(Request $request, VerifyEmailCodeAction $action): JsonResponse
    {
        $request->validate([
            'code' => ['required', 'string', 'size:6'],
        ]);

        $action->execute($request->user(), $request->input('code'));

        return $this->success('Email verified successfully.', [], 200);
    }
}
