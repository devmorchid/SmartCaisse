<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
  public function handle(Request $request, Closure $next, $role)
{
    if (!$request->user()) {
        return response()->json([
            'error' => 'User NOT authenticated',
            'token' => $request->bearerToken(),
        ], 401);
    }

    if (!$request->user()->hasRole($role)) {
        return response()->json([
            'error' => 'User authenticated but wrong role',
            'user_roles' => $request->user()->roles->pluck('name'),
            'required_role' => $role
        ], 403);
    }

    return $next($request);
}

}
