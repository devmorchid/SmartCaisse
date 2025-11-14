<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{

    public function show(Request $request)
    {
        return response()->json($request->user());
    }


    public function update(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return response()->json([
            'message' => 'Profil mis à jour avec succès ✅',
            'user' => $user,
        ]);
    }

    
    public function changePassword(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Le mot de passe actuel est incorrect ⚠️',
            ], 422);
        }

      
        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        return response()->json([
            'message' => 'Mot de passe modifié avec succès 🔒',
        ]);
    }

public function index()
{
    try {
        $users = User::all(['id', 'name', 'email', 'created_at']);
        return response()->json($users, 200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Erreur interne du serveur',
            'error' => $e->getMessage(),
        ], 500);
    }
}


}
