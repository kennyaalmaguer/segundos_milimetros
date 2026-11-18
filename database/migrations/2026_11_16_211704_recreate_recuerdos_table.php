<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('recuerdos');

        Schema::create('recuerdos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('titulo');
            $table->string('descripcion', 255)->nullable();
            $table->string('filtro')->default('normal');
            $table->string('imagen_path');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recuerdos');
    }
};