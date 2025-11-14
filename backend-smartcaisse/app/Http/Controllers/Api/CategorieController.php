<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    
    public function index()
    {
        return Categorie::all();
    }

   
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255|unique:categories,nom',
        ]);

        $categorie = Categorie::create($validated);

        return response()->json($categorie, 201);
    }
}
