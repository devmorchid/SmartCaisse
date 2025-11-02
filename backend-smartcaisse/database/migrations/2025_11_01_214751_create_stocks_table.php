<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stocks', function (Blueprint $table) {
            $table->engine = 'InnoDB'; // ضروري باش تقبل foreign keys
            
            $table->id();
            $table->unsignedBigInteger('produit_id');
            $table->integer('quantite')->default(0);
            $table->string('emplacement')->nullable();
            $table->date('date_entree')->nullable();
            $table->timestamps();

            $table->foreign('produit_id')
                  ->references('id')
                  ->on('produits')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stocks');
    }
};
