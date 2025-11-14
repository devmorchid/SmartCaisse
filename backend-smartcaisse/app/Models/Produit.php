<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Produit extends Model
{
    use HasFactory;
    
   protected $fillable = [
    'nom',
    'prix_vente',
    'cout',
    'quantite_stock',
    'stock_minimum',
    'categorie',
    'fournisseur_id',
    'image',
    'reference',
    'barcode',
    'user_id',
    ];


        public function ventes()
        {
            return $this->belongsToMany(Vente::class, 'vente_produits')
                ->withPivot('quantite', 'prix_unitaire', 'sous_total');
        }

  

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class);
    }





//     public function stocks()
// {
//     return $this->hasMany(Stock::class);
// }

}
