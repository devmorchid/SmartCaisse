<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;
        protected $fillable = [
        'produit_id',
        'quantite',
        'emplacement',
        'date_entree',
    ];

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }
}
