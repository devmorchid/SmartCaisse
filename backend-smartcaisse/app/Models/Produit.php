<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;
    
    protected $fillable = ['nom', 'prix', 'quantite_stock', 'fournisseur_id'];

    public function ventes()
    {
        return $this->belongsToMany(Vente::class, 'vente_produit')
                    ->withPivot('quantite', 'prix');
    }

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class);
    }
    public function stocks()
{
    return $this->hasMany(Stock::class);
}

}
