<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\CraftsmanApprovalController;

/*
|--------------------------------------------------------------------------
| Admin API Routes
|--------------------------------------------------------------------------
|
| GET    /admin/craftsmen                    → List pending providers
| GET    /admin/craftsmen/{provider}         → View provider details
| PATCH  /admin/craftsmen/{provider}/approve → Approve provider
| PATCH  /admin/craftsmen/{provider}/reject  → Reject provider
|
*/

Route::middleware('auth:sanctum','role:admin')->prefix('admin')->group(function () {

    // Craftsman approval management
    Route::prefix('craftsmen')->group(function () {
        Route::get('/',              [CraftsmanApprovalController::class, 'index']);
        Route::get('/{provider}',    [CraftsmanApprovalController::class, 'show']);
        Route::get('/{provider}/document', [CraftsmanApprovalController::class, 'document']);
        Route::patch('/{provider}/approve', [CraftsmanApprovalController::class, 'approve']);
        Route::patch('/{provider}/reject',  [CraftsmanApprovalController::class, 'reject']);
    });
});
