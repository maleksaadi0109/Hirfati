<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Actions\Auth\RegisterStoreAction;
use App\Actions\Auth\VerifyRegistrationCodeAction;
use App\Actions\Auth\ResendRegistrationCodeAction;
use App\Traits\ApiResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    use ApiResponses;

    /**
     * Step 1: Validate data, store in cache, send verification code.
     * The user is NOT created in the database yet.
     */
    public function store(RegisterRequest $request, RegisterStoreAction $action): JsonResponse
    {
        try {
            $pendingToken = $action->execute($request);

            return $this->success('Verification code sent to your email.', [
                'pending_token' => $pendingToken,
            ], 200);

        } catch (\Throwable $e) {
            report($e);

            return $this->error('Failed to process registration. Please try again later.', 500);
        }
    }

    /**
     * Step 2: Verify the code and NOW create the user in the database.
     */
    public function verify(Request $request, VerifyRegistrationCodeAction $action): JsonResponse
    {
        $request->validate([
            'pending_token' => ['required', 'string', 'uuid'],
            'code'          => ['required', 'string', 'size:6'],
        ]);

        $result = $action->execute(
            $request->input('pending_token'),
            $request->input('code')
        );

        return $this->success('Account created successfully.', $result, 201);
    }

    /**
     * Resend the verification code for a pending registration.
     */
    public function resendCode(Request $request, ResendRegistrationCodeAction $action): JsonResponse
    {
        $request->validate([
            'pending_token' => ['required', 'string', 'uuid'],
        ]);

        $action->execute($request->input('pending_token'));

        return $this->success('Verification code resent to your email.', [], 200);
    }
}
