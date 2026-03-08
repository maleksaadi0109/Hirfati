<?php

namespace App\Http\Responses;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Laravel\Fortify\Fortify;

class CustomLoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        /** @var User $user */
        $user = Auth::user();

        // If the user is a provider with a rejected application,
        // redirect them to the rejected-approval page instead of dashboard.
        if ($user && $user->role === User::ROLE_PROVIDER) {
            $status = $user->provider?->application_status;

            if ($status === 'rejected') {
                return $request->wantsJson()
                    ? response()->json(['two_factor' => false, 'redirect' => '/rejected-approval'])
                    : redirect('/rejected-approval');
            }

            if ($status === 'pending') {
                // Log the user out - they shouldn't be allowed in at all
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                // Redirect back to login with an error
                return $request->wantsJson()
                    ? response()->json(['message' => 'Your provider application is under review.'], 403)
                    : redirect('/login')->withErrors([
                        'email' => 'Your provider application is under review. Please wait for admin approval.',
                    ]);
            }
        }

        // If the user is blocked, log them out
        if ($user && $user->is_blocked) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return $request->wantsJson()
                ? response()->json(['message' => 'Your account has been suspended.'], 403)
                : redirect('/login')->withErrors([
                    'email' => 'Your account has been suspended. Please contact support.',
                ]);
        }

        // Default: redirect to dashboard
        return $request->wantsJson()
            ? response()->json(['two_factor' => false])
            : redirect()->intended(Fortify::redirects('login'));
    }
}
