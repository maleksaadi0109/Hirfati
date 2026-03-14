<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Provider\ResubmitApplicationController;

/*
|--------------------------------------------------------------------------
| Provider API Routes
|--------------------------------------------------------------------------
|
| POST /provider/resubmit          → Resubmit rejected application
|
*/

Route::middleware(['auth:sanctum', 'rejected_provider'])->prefix('provider')->group(function () {
    Route::post('/resubmit', ResubmitApplicationController::class)->name('provider.resubmit');
});
