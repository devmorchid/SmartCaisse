<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Colis;
use App\Models\Produit;

class ColisController extends Controller
{
   
    public function index()
    {
        //
    }



    
   public function store(Request $request)
{
    $colis = Colis::create($request->all());

  
    $produit = Produit::find($request->produit_id);
    $produit->quantite_stock += $request->quantite;
    $produit->save();

    return response()->json(['message' => 'Colis ajouté et stock mis à jour', 'colis' => $colis]);
}


   
    public function show(Colis $colis)
    {
        //
    }

  
    public function edit(Colis $colis)
    {
        //
    }

    public function update(Request $request, Colis $colis)
    {
        //
    }

 
    public function destroy(Colis $colis)
    {
        //
    }
}
