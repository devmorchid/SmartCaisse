<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    public function indexVentes(Request $request)
{
    $user = $request->user(); 

   
    if ($user->role === 'admin') {
        return Produit::with('fournisseur')->get();
    }

    return Produit::with('fournisseur')
        ->where('user_id', $user->id)
        ->get();
}

    public function index()
    {

        return Produit::with('fournisseur')->paginate(10);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        'prix_vente' => 'required|numeric',
        'cout' => 'required|numeric',
        'quantite_stock' => 'required|integer',
        'stock_minimum' => 'required|integer',
        'categorie' => 'required|string',
        'fournisseur_id' => 'required|exists:fournisseurs,id',
        'reference' => 'required|string',
        'barcode' => 'required|string',
        'image' => 'nullable|image|max:2048',
    ]);

    $validated['user_id'] = $request->user()->id;

    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $path = $file->store('produits', 'public');
        $validated['image'] = $path;
    }
    $produit = Produit::create($validated);


    return response()->json([
        'message' => 'Produit ajouté avec succès ✔️',
        'produit' => $produit
    ], 201);
}

    public function show($id)
    {
        $produit = Produit::with('fournisseur')->find($id);

        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        return response()->json($produit);
    }
    public function update(Request $request, $id)
    {
        $produit = Produit::findOrFail($id);
        $validated['user_id'] = $request->user()->id;
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prix_vente' => 'required|numeric',
            'cout' => 'required|numeric',
            'quantite_stock' => 'required|integer',
            'stock_minimum' => 'required|integer',
            'categorie' => 'required|string',
            'fournisseur_id' => 'required|exists:fournisseurs,id',
            'reference' => 'required|string',
            'barcode' => 'required|string',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('produits', 'public');
            $validated['image'] = $path;
        }

        $produit->update($validated);

        return response()->json([
            'message' => 'Produit mis à jour avec succès',
            'produit' => $produit
        ], 200);
    }
    public function destroy($id)
    {
        $produit = Produit::find($id);

        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        $produit->delete();

        return response()->json(['message' => 'Produit supprimé avec succès']);
    }
}
