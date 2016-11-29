<?php

namespace App\Http\Middleware;

use Closure;

class AngularJsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->header('page') && $request->header('page') == 'loaded'){

            return $next($request);
        }

        if($request->path() == 'admin'){
            return view('admin');
        }
        return view('user');
    }
}
