<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;
     protected $fillable = ['vente_id', 'montant', 'methode', 'statut'];

    public function vente()
    {
        return $this->belongsTo(Vente::class);
    }

    public function cheque()
    {
        return $this->hasOne(Cheque::class);
    }
}
