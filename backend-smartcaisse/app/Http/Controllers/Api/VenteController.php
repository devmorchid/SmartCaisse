<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vente;
use App\Models\Produit;
use App\Events\NouvelleVenteCreee;
use App\Events\StockFaible;


class VenteController extends Controller
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

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    
    $vente = Vente::create([
        'user_id' => auth()->id(),
        'status' => 'en cours',
        'total' => 0
    ]);

    foreach ($request->produits as $item) {
        $vente->produits()->attach($item['produit_id'], [
            'quantite' => $item['quantite'],
            'prix' => $item['prix']
        ]);

        // 🔄 Mise à jour du stock
        $produit = Produit::find($item['produit_id']);
        $produit->quantite_stock -= $item['quantite'];
        $produit->save();

        #🧩 Déclenchement
        if ($produit->quantite_stock < 5) {
        event(new StockFaible($produit));
        }

    }
    //notification 
    event(new NouvelleVenteCreee($vente));

    // 🔢 Calculer total automatiquement
    $vente->calculerTotal();

    return response()->json(['message' => 'Vente créée avec succès', 'vente' => $vente->load('produits')]);
}



    /**
     * Display the specified resource.
     */
    public function show(Vente $vente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vente $vente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vente $vente)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vente $vente)
    {
        //
    }
}
