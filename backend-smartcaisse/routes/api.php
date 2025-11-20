<?php

use App\Http\Controllers\Api\ChequeController;
use App\Http\Controllers\Api\FournisseurController;
use App\Http\Controllers\Api\StockController;
use App\Http\Controllers\Api\VenteController;
use App\Http\Controllers\Api\PaiementController;
use App\Http\Controllers\Api\ColisController;
use App\Http\Controllers\Api\ProduitController;



use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;



use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\UserController;



Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);

});

Route::middleware(['auth:sanctum', 'role:manager'])->group(function () {
    // routes dyal manager
});







Route::middleware(['auth:sanctum'])->group(function () { 
   

Route::middleware('auth:sanctum')->get('/dashboard', [DashboardController::class, 'index']);


    Route::get('/profile', [UserController::class, 'show']);
    Route::put('/profile', [UserController::class, 'update']);
    Route::put('/profile/password', [UserController::class, 'changePassword']);
 

    Route::get('/categories', [CategorieController::class, 'index']);
    Route::post('/categories', [CategorieController::class, 'store']);

    Route::get('fournisseurs', [FournisseurController::class, 'index']);
    Route::post('fournisseurs', [FournisseurController::class, 'store']);
    Route::get('fournisseurs/{id}', [FournisseurController::class, 'show']);
    Route::put('fournisseurs/{id}', [FournisseurController::class, 'update']);
    Route::delete('fournisseurs/{id}', [FournisseurController::class, 'destroy']);


   
    Route::get('/ventes/produits',[ProduitController::class,'index']);
    Route::post('produits', [ProduitController::class, 'store']);     
    Route::get('produits/{id}', [ProduitController::class, 'show']);   
    Route::put('produits/{id}', [ProduitController::class, 'update']);
    Route::post('produits/{id}', [ProduitController::class, 'update']);
    Route::delete('produits/{id}', [ProduitController::class, 'destroy']);

    Route::post('ventes',[VenteController::class, 'store']);
  
    Route::get('/produits', [ProduitController::class, 'indexVentes']);


    Route::get('paiements', [PaiementController::class, 'index']);
    Route::post('paiements', [PaiementController::class, 'store']);
    Route::get('paiements/{id}', [PaiementController::class, 'show']);
    Route::put('paiements/{id}', [PaiementController::class, 'update']);
    Route::delete('paiements/{id}', [PaiementController::class, 'destroy']);


    Route::get('cheques', [ChequeController::class, 'index']);
    Route::put('/cheques/{id}/encaisser', [ChequeController::class, 'encaisser']);
  
    // Route::get('colis', [ColisController::class, 'index']);
    // Route::post('colis', [ColisController::class, 'store']);
    // Route::get('colis/{id}', [ColisController::class, 'show']);
    // Route::put('colis/{id}', [ColisController::class, 'update']);
    // Route::delete('colis/{id}', [ColisController::class, 'destroy']);

});


// Route::middleware(['auth:sanctum'])->group(function () {
//     Route::get('dashboard/summary', [DashboardController::class, 'summary']);
//     Route::get('dashboard/revenue-chart', [DashboardController::class, 'revenueChart']); // daily series
//     Route::get('dashboard/top-products', [DashboardController::class, 'topProducts']);
//     Route::get('dashboard/payment-breakdown', [DashboardController::class, 'paymentBreakdown']);
// });



// Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
//     Route::get('/admin/dashboard', function () {
//         return response()->json(['message' => 'Bienvenue Admin 👑']);
//     });
// });


// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });



require __DIR__.'/auth.php';
