<?php

namespace App\Http\Middleware\Provider;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureProviderRejected
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || $user->role !== User::ROLE_PROVIDER) {
            abort(403);
        }

        if ($user->provider?->application_status !== 'rejected') {
            return redirect()->route('home');
        }

        return $next($request);
    }
}
