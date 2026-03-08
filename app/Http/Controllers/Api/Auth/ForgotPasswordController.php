<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Actions\Auth\SendResetCodeAction;
use App\Actions\Auth\VerifyResetCodeAction;
use App\Actions\Auth\ResetPasswordAction;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Traits\ApiResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    use ApiResponses;

    /**
     * Step 1: Send a 6-digit reset code to the user's email.
     */
    public function sendCode(ForgotPasswordRequest $request, SendResetCodeAction $action): JsonResponse
    {
        $action->execute($request->email, $request->ip());

        return $this->ok('Reset code sent to your email.');
    }

    /**
     * Step 2: Verify the 6-digit code the user entered.
     */
    public function verifyCode(Request $request, VerifyResetCodeAction $action): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
            'code'  => ['required', 'string', 'size:6'],
        ]);

        $action->execute($request->email, $request->code, $request->ip());

        return $this->ok('Code verified successfully.');
    }

    /**
     * Step 3: Reset the password (only after code is verified).
     */
    public function resetPassword(Request $request, ResetPasswordAction $action): JsonResponse
    {
        $request->validate([
            'email'    => ['required', 'email', 'exists:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $action->execute($request->email, $request->password);

        return $this->ok('Password reset successfully.');
    }
}
