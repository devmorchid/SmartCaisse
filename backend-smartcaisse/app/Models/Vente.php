<?php
namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vente extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'total', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function paiements()
    {
        return $this->hasMany(Paiement::class);
    }

    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'vente_produit')
                    ->withPivot('quantite', 'prix')
                    ->withTimestamps();
    }
    

    public function calculerTotal()
{
    $total = 0;
    foreach ($this->produits as $produit) {
        $total += $produit->pivot->quantite * $produit->pivot->prix;
    }
    $this->update(['total' => $total]);
    return $total;
}

}

