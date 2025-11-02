<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Fournisseur;


class FournisseurController extends Controller
{

    public function index()
    {
        return response()->json(Fournisseur::all());
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:fournisseurs',
            'telephone' => 'required|string|max:20',
            'adresse' => 'required|string|max:255',
        ]);

        $fournisseur = Fournisseur::create($validated);

        
        return response()->json([
            'message' => 'Fournisseur créé avec succès ✅',
            'data' => $fournisseur
        ], 201);
    }


   public function show($id)
{
   
    $fournisseur = Fournisseur::find($id);

    if (!$fournisseur) {
        return response()->json([
            'message' => 'Fournisseur non trouvé ❌'
        ], 404);
    }

    return response()->json($fournisseur, 200);
}


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fournisseur $fournisseur)
    {
        
    }

    public function update(Request $request, $id)
    {
    $fournisseur = Fournisseur::find($id);
    if (!$fournisseur) {
        return response()->json([
            'message' => 'Fournisseur non trouvé ❌'
        ], 404);
    }

    $validated = $request->validate([
        'nom' => 'sometimes|string|max:255',
        'email' => 'sometimes|email|unique:fournisseurs,email,' . $id,
        'telephone' => 'sometimes|string|max:20',
        'adresse' => 'sometimes|string|max:255',
    ]);
    $fournisseur->update($validated);
    return response()->json([
        'message' => 'Fournisseur mis à jour ✅',
        'data' => $fournisseur
    ], 200);
    }


  public function destroy($id)
{
  
    $fournisseur = Fournisseur::find($id);

    if (!$fournisseur) {
        return response()->json([
            'message' => 'Fournisseur non trouvé ❌'
        ], 404);
    }

    $fournisseur->delete();

    return response()->json([
        'message' => 'Fournisseur supprimé avec succès ✅'
    ], 200);
}

}
