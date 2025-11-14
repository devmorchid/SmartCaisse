<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->decimal('prix_vente', 10, 2);
            $table->decimal('cout', 10, 2);
            $table->integer('quantite_stock');
            $table->integer('stock_minimum')->default(0);
            $table->string('categorie');
            $table->unsignedBigInteger('fournisseur_id');
            $table->string('image')->nullable();
            $table->string('reference')->unique();
            $table->string('barcode')->unique();
            $table->timestamps();
            $table->foreign('fournisseur_id')->references('id')->on('fournisseurs');
        });;





    }

    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
