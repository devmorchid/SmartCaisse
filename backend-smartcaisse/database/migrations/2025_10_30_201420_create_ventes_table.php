<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ventes', function (Blueprint $table) {
            $table->id();
             $table->foreignId('user_id')->constrained()->onDelete('cascade'); // علاقة مع جدول users
            $table->decimal('total', 10, 2); // 
            $table->string('status'); //  (ex: en cours, payée, annulée)

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ventes');
    }
};
