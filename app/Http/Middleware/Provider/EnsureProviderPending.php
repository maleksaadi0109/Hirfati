<?php

namespace App\Http\Middleware\Provider;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class EnsureProviderPending
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

        if ($user->provider?->application_status !== 'pending') {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Status is not pending'], 403);
            }
            return redirect()->route('home');
        }

        return $next($request);
    }
}
