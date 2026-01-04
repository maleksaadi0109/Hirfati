<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('marketplace/index');
})->name('home');

Route::get('/login', function () {
    return Inertia::render('auth/login');
})->name('login');

Route::get('/onboarding', function () {
    return Inertia::render('auth/Onboarding');
})->name('onboarding');

Route::middleware(['auth', 'verified'])->group(function () {
    // Protected routes can go here
});

// Temporarily exposed for frontend testing
Route::get('/client/dashboard', function () {
    return Inertia::render('client/Dashboard');
})->name('client.dashboard');

Route::get('/client/messages', function () {
    return Inertia::render('client/Messages');
})->name('client.messages');

Route::get('/worker/messages', function () {
    return Inertia::render('worker/Messages');
})->name('worker.messages');

Route::get('/worker/dashboard', function () {
    return Inertia::render('worker/Dashboard');
})->name('worker.dashboard');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

require __DIR__.'/settings.php';
