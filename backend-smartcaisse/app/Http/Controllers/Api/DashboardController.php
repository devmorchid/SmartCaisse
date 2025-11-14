<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vente;
use App\Models\Paiement;
use App\Models\Cheque;
use App\Models\Produit;
use App\Models\Colis;
use App\Models\Fournisseur;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $totalVentes = Vente::count();
        $revenuTotal = Vente::sum('total');
        $produitsCount = Produit::count();
        $colisCount = Colis::count();
        $fournisseursCount = Fournisseur::count();

        $paiementsParMethode = Paiement::select('methode', DB::raw('SUM(montant) as total'))
            ->groupBy('methode')
            ->pluck('total', 'methode');

        $chequesStats = [
            'encaissés' => Cheque::where('statut', 'encaisse')->count(),
            'en_attente' => Cheque::where('statut', 'en attente')->count(),
        ];

        $produitsStockFaible = Produit::whereColumn('quantite_stock', '<=', 'stock_minimum')->count();

        $lastVentes = Vente::latest()->take(5)->get(['id', 'total', 'created_at']);

        return response()->json([
            'totalVentes' => $totalVentes,
            'revenuTotal' => $revenuTotal,
            'produitsCount' => $produitsCount,
            'colisCount' => $colisCount,
            'fournisseursCount' => $fournisseursCount,
            'paiements' => $paiementsParMethode,
            'cheques' => $chequesStats,
            'stockFaible' => $produitsStockFaible,
            'lastVentes' => $lastVentes,
        ]);
    }
}
