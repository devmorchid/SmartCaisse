<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vente;
use App\Models\Paiement;
use App\Models\Cheque;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class VenteController extends Controller
{
   public function store(Request $request)
{
    $vente = Vente::create([
        'user_id' => $request->user_id,
        'total' => $request->total,
        'status' => 'terminée',
    ]);

   
    foreach ($request->produits as $p) {
        $vente->produits()->attach($p['id'], [
            'quantite' => $p['quantite'],
            'prix' => $p['prix'],
        ]);
    }

    
    foreach ($request->paiements as $p) {
        $paiement = Paiement::create([
            'vente_id' => $vente->id,
            'montant' => $p['montant'],
            'methode' => $p['methode'],
            'statut' => $p['statut'],
        ]);

        if ($p['methode'] === 'chèque' && isset($p['cheque'])) {
            Cheque::create([
                'paiement_id' => $paiement->id,
                'numero' => $p['cheque']['numero'] ?? '',
                'banque' => $p['cheque']['banque'] ?? '',
                'date_encaissement' => $p['cheque']['date_encaissement'] ?? null,
                'statut' => 'en attente',
            ]);
        }
    }

    return response()->json([
        'message' => 'Vente enregistrée avec succès',
        'vente_id' => $vente->id
    ], 201);
}

}
