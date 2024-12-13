<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\ClearRequest;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
            ClearRequest::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e) {
            return Inertia::render('404')
                ->toResponse(request())
                ->setStatusCode(404);
        });

        $exceptions->renderable(function (\Error $e) {
            if (config('app.debug')) {
                return null;
            }
            
            return Inertia::render('500')
                ->toResponse(request())
                ->setStatusCode(500);
        });
    })->create();
