<?php

use App\Http\Controllers\Api\ChequeController;
use App\Http\Controllers\Api\FournisseurController;
use App\Http\Controllers\Api\StockController;
use App\Http\Controllers\Api\VenteController;
use App\Http\Controllers\Api\PaiementController;
use App\Http\Controllers\Api\ColisController;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\DashboardController;



// ✅ Routes protégées par authentification
Route::middleware(['auth:sanctum'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Ventes Routes
    |--------------------------------------------------------------------------
    */
    Route::get('ventes', [VenteController::class, 'index']);      
    Route::post('ventes', [VenteController::class, 'store']);     
    Route::get('ventes/{id}', [VenteController::class, 'show']);   
    Route::put('ventes/{id}', [VenteController::class, 'update']);
    Route::delete('ventes/{id}', [VenteController::class, 'destroy']); 

    /*
    |--------------------------------------------------------------------------
    | Stocks Routes
    |--------------------------------------------------------------------------
    */
    Route::get('stocks', [StockController::class, 'index']);
    Route::post('stocks', [StockController::class, 'store']);
    Route::get('stocks/{id}', [StockController::class, 'show']);
    Route::put('stocks/{id}', [StockController::class, 'update']);
    Route::delete('stocks/{id}', [StockController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | Fournisseurs Routes
    |--------------------------------------------------------------------------
    */
    Route::get('fournisseurs', [FournisseurController::class, 'index']);
    Route::post('fournisseurs', [FournisseurController::class, 'store']);
    Route::get('fournisseurs/{id}', [FournisseurController::class, 'show']);
    Route::put('fournisseurs/{id}', [FournisseurController::class, 'update']);
    Route::delete('fournisseurs/{id}', [FournisseurController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | Paiements Routes
    |--------------------------------------------------------------------------
    */
    Route::get('paiements', [PaiementController::class, 'index']);
    Route::post('paiements', [PaiementController::class, 'store']);
    Route::get('paiements/{id}', [PaiementController::class, 'show']);
    Route::put('paiements/{id}', [PaiementController::class, 'update']);
    Route::delete('paiements/{id}', [PaiementController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | Chèques Routes
    |--------------------------------------------------------------------------
    */
    Route::get('cheques', [ChequeController::class, 'index']);
    Route::post('cheques', [ChequeController::class, 'store']);
    Route::get('cheques/{id}', [ChequeController::class, 'show']);
    Route::put('cheques/{id}', [ChequeController::class, 'update']);
    Route::delete('cheques/{id}', [ChequeController::class, 'destroy']);


    /*
    |--------------------------------------------------------------------------
    | Colis Routes
    |--------------------------------------------------------------------------
    */
    Route::get('colis', [ColisController::class, 'index']);
    Route::post('colis', [ColisController::class, 'store']);
    Route::get('colis/{id}', [ColisController::class, 'show']);
    Route::put('colis/{id}', [ColisController::class, 'update']);
    Route::delete('colis/{id}', [ColisController::class, 'destroy']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('dashboard/summary', [DashboardController::class, 'summary']);
    Route::get('dashboard/revenue-chart', [DashboardController::class, 'revenueChart']); // daily series
    Route::get('dashboard/top-products', [DashboardController::class, 'topProducts']);
    Route::get('dashboard/payment-breakdown', [DashboardController::class, 'paymentBreakdown']);
});








Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', function () {
        return response()->json(['message' => 'Bienvenue Admin 👑']);
    });
});


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});



require __DIR__.'/auth.php';
