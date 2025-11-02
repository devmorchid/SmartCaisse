<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Colis;
use App\Models\Produit;

class ColisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }



    /**
     * Store a newly created resource in storage.
     */
   public function store(Request $request)
{
    $colis = Colis::create($request->all());

    // 🔄 Mise à jour du stock produit
    $produit = Produit::find($request->produit_id);
    $produit->quantite_stock += $request->quantite;
    $produit->save();

    return response()->json(['message' => 'Colis ajouté et stock mis à jour', 'colis' => $colis]);
}


    /**
     * Display the specified resource.
     */
    public function show(Colis $colis)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Colis $colis)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Colis $colis)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Colis $colis)
    {
        //
    }
}
