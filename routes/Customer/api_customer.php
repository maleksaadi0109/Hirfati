<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\ForgotPasswordController;
use App\Http\Controllers\Api\Auth\EmailVerificationController;

Route::middleware('auth:sanctum','role:customer')->group(function () {
    Route::put('/client/profile/update', [\App\Http\Controllers\Api\Client\UpdateUserInfoController::class, 'update'])->middleware('throttle:client-profile-update');
    Route::get('/client/addresses', [\App\Http\Controllers\Api\Client\CustomerAddressController::class, 'index']);
    Route::post('/client/addresses', [\App\Http\Controllers\Api\Client\CustomerAddressController::class, 'store']);
    Route::get('/client/addresses/{address}', [\App\Http\Controllers\Api\Client\CustomerAddressController::class, 'show']);
    Route::put('/client/addresses/{address}', [\App\Http\Controllers\Api\Client\CustomerAddressController::class, 'update']);
    Route::delete('/client/addresses/{address}', [\App\Http\Controllers\Api\Client\CustomerAddressController::class, 'destroy']);
    Route::put('/client/addresses/{address}/default', [\App\Http\Controllers\Api\Client\CustomerAddressController::class, 'setDefault']);

    // Order Routes
    Route::get('/client/orders', [\App\Http\Controllers\Api\Client\OrderController::class, 'index']);
    Route::post('/client/orders', [\App\Http\Controllers\Api\Client\OrderController::class, 'store']);
    Route::get('/client/orders/{order}', [\App\Http\Controllers\Api\Client\OrderController::class, 'show']);
    Route::patch('/client/orders/{order}/cancel', [\App\Http\Controllers\Api\Client\OrderController::class, 'cancel']);
});
