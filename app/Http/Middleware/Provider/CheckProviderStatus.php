<?php

namespace App\Http\Middleware\Provider;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckProviderStatus
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Check if user is logged in, is a provider, and has a rejected application
        if ($user && $user->role === 'provider' && $user->provider?->application_status === 'rejected' ||$user->provider?->application_status === 'pending') {
            
           abort(403);
        }

        return $next($request);
    }
}
