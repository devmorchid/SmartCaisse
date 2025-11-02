<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Paiement;
use App\Models\Cheque;
use App\Models\Vente;



class PaiementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
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

    // 🧾 Si c’est un chèque → créer un enregistrement
    if ($request->methode === 'chèque') {
        Cheque::create([
            'paiement_id' => $paiement->id,
            'numero' => $request->numero,
            'banque' => $request->banque,
            'date_encaissement' => $request->date_encaissement,
            'statut' => 'en attente'
        ]);
    }

    // 🧮 Mettre à jour le total payé de la vente
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


    /**
     * Display the specified resource.
     */
    public function show(Paiement $paiement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paiement $paiement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paiement $paiement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paiement $paiement)
    {
        //
    }
}
