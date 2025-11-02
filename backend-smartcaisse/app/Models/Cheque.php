<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cheque extends Model
{
    use HasFactory;
    protected $fillable = ['paiement_id', 'numero', 'banque', 'date_encaissement', 'statut'];

    public function paiement()
    {
        return $this->belongsTo(Paiement::class);
    }
}
