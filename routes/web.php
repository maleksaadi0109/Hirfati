<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('marketplace/index');
})->name('home');

Route::get('/onboarding', function () {
    return Inertia::render('auth/Onboarding');
})->name('onboarding');

Route::get('/rejected-approval', function () {
    return Inertia::render('auth/rejected-approval');
})->name('rejected-approval');

Route::middleware([])->group(function () {
    Route::get('/dashboard', function (Request $request) {
        return match ($request->user()?->role) {
            'provider' => redirect()->route('worker.dashboard'),
            default => redirect()->route('client.dashboard'),
        };
    })->name('dashboard');

    Route::get('/client/dashboard', function () {
        return Inertia::render('client/Dashboard');
    })->name('client.dashboard');

    Route::get('/client/messages', function () {
        return Inertia::render('client/Messages');
    })->name('client.messages');

    Route::get('/worker/dashboard', function () {
        return Inertia::render('worker/Dashboard');
    })->name('worker.dashboard');

    Route::get('/worker/messages', function () {
        return Inertia::render('worker/Messages');
    })->name('worker.messages');
   
  
});

require __DIR__.'/settings.php';
