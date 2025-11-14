<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class vente_produits extends Model
{
    use HasFactory;
    protected $fillable = [
    'vente_id',
    'produit_id',
    'quantite',
    'prix_unitaire',
    'sous_total',
];

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    public function vente()
    {
        return $this->belongsTo(Vente::class);
    }


//     public function produits()
// {
//     return $this->belongsToMany(Produit::class, 'vente_produits')
//         ->withPivot('quantite', 'prix_unitaire', 'sous_total');
// }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
