<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckProviderStatus
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Check if user is logged in, is a provider, and has a rejected application
        if ($user && $user->role === 'provider' && $user->provider?->application_status === 'rejected') {
            
            // Allow them to access the "resubmit documents" API endpoints (if you have them)
            // or maybe a logout endpoint, otherwise block normal API routes.
            $allowedRoutes = ['provider.resubmit', 'logout', 'user.profile'];

            if (! in_array($request->route()->getName(), $allowedRoutes)) {
                return response()->json([
                    'message' => 'Your application was rejected.',
                    'status' => 'rejected'
                ], 403); // 403 Forbidden
            }
        }

        return $next($request);
    }
}
