<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Fournisseur;

class FournisseurController extends Controller
{
    
    // =============================
    //  AFFICHER TOUS LES FOURNISSEURS
    // =============================
    public function index(Request $request)
    {
        $user = $request->user();

        logger($user);
      
        if ($user->hasRole('admin')) {
            return response()->json(Fournisseur::all());
        }

   
        if ($user->hasRole('Manager')) {
            return response()->json(
                Fournisseur::where('user_id', $user->id)->get()
            );
        }

        return response()->json(["message" => "Accès refusé"], 403);
    }


    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'nom'       => 'required|string|max:255',
            'email'     => 'required|email|unique:fournisseurs',
            'telephone' => 'required|string|max:20',
            'adresse'   => 'required|string|max:255',
        ]);

     
        $validated['user_id'] = $request->user()->id;

      
        $fournisseur = Fournisseur::create($validated);

        return response()->json([
            'message' => 'Fournisseur créé avec succès',
            'data'    => $fournisseur
        ], 201);
    }

 
    public function show(Request $request, $id)
    {
        $fournisseur = Fournisseur::find($id);

        if (!$fournisseur) {
            return response()->json(['message' => 'Fournisseur non trouvé'], 404);
        }

        $user = $request->user();

   
        if ($user->hasRole('admin')) {
            return response()->json($fournisseur);
        }

       
        if ($user->hasRole('manager') && $fournisseur->user_id == $user->id) {
            return response()->json($fournisseur);
        }

        return response()->json(['message' => 'Accès refusé'], 403);
    }

    public function update(Request $request, $id)
    {
        $fournisseur = Fournisseur::find($id);

        if (!$fournisseur) {
            return response()->json(['message' => 'Fournisseur non trouvé'], 404);
        }

        $user = $request->user();

       
        if ($user->hasRole('manager') && $fournisseur->user_id != $user->id) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

       
        $validated = $request->validate([
            'nom'       => 'sometimes|string|max:255',
            'email'     => 'sometimes|email|unique:fournisseurs,email,' . $id,
            'telephone' => 'sometimes|string|max:20',
            'adresse'   => 'sometimes|string|max:255',
        ]);

        $fournisseur->update($validated);

        return response()->json([
            'message' => 'Fournisseur mis à jour',
            'data'    => $fournisseur
        ]);
    }


    public function destroy(Request $request, $id)
    {
        $fournisseur = Fournisseur::find($id);

        if (!$fournisseur) {
            return response()->json(['message' => 'Fournisseur non trouvé'], 404);
        }

        $user = $request->user();

       
        if ($user->hasRole('manager') && $fournisseur->user_id != $user->id) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        $fournisseur->delete();

        return response()->json(['message' => 'Fournisseur supprimé']);
    }
}
