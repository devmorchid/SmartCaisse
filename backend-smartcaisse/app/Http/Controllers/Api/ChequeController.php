<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cheque;





class ChequeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
 public function index()
{
    $cheques = Cheque::with(['paiement.vente'])->get();

    return response()->json($cheques);
}

  public function store(Request $request)
{
    $validated = $request->validate([
        'paiement_id' => 'required|exists:paiements,id',
        'numero' => 'required|string|max:255',
        'banque' => 'required|string|max:255',
        'date_encaissement' => 'required|date',
        'statut' => 'nullable|string|in:en attente,encaisse',
    ]);

    $cheque = Cheque::create($validated);

    return response()->json([
        'message' => 'Chèque ajouté avec succès',
        'cheque' => $cheque->load('paiement.vente')
    ], 201);
}


     public function encaisser($id)
    {
        $cheque = Cheque::findOrFail($id);
        $cheque->statut = 'encaissé';
        $cheque->save();

        return response()->json(['message' => 'Chèque encaissé avec succès !']);
    }

   
    public function edit(Cheque $cheque)
    {
        //
    }

    
   public function update(Request $request, Cheque $cheque)
{
    $cheque->update($request->all());

    if ($request->statut === 'encaissé') {
        $cheque->paiement->update(['statut' => 'confirmé']);
    }

    return response()->json(['message' => 'Statut du chèque mis à jour', 'cheque' => $cheque]);
}


    
    public function destroy(Cheque $cheque)
    {
        //
    }
}
