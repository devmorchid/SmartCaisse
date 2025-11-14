<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Paiement;
use App\Models\Cheque;
use App\Models\Vente;



class PaiementController extends Controller
{
   
    public function index()
    {
        //
    }

   
    public function create()
    {
        //
    }

public function store(Request $request)
{
    $paiement = Paiement::create([
        'vente_id' => $request->vente_id,
        'montant' => $request->montant,
        'methode' => $request->methode,
        'statut' => $request->methode === 'chèque' ? 'en attente' : 'confirmé',
    ]);

 
    if ($request->methode === 'chèque') {
        Cheque::create([
            'paiement_id' => $paiement->id,
            'numero' => $request->numero,
            'banque' => $request->banque,
            'date_encaissement' => $request->date_encaissement,
            'statut' => 'en attente'
        ]);
    }

  
    $vente = Vente::find($request->vente_id);
    $totalPaye = $vente->paiements()->sum('montant');

    if ($totalPaye >= $vente->total) {
        $vente->status = 'payée';
    } else {
        $vente->status = 'partielle';
    }
    $vente->save();

    return response()->json(['message' => 'Paiement ajouté avec succès', 'paiement' => $paiement]);
}


  
    public function show(Paiement $paiement)
    {
        //
    }

  
    public function edit(Paiement $paiement)
    {
        //
    }

  
    public function update(Request $request, Paiement $paiement)
    {
        //
    }

 
    public function destroy(Paiement $paiement)
    {
        //
    }
}
