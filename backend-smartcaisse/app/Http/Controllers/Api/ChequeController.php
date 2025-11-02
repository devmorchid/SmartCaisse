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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Cheque $cheque)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cheque $cheque)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, Cheque $cheque)
{
    $cheque->update($request->all());

    if ($request->statut === 'encaissé') {
        $cheque->paiement->update(['statut' => 'confirmé']);
    }

    return response()->json(['message' => 'Statut du chèque mis à jour', 'cheque' => $cheque]);
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cheque $cheque)
    {
        //
    }
}
