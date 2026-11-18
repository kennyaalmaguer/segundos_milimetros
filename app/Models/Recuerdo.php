<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recuerdo extends Model
{
    protected $fillable = [
        'user_id',
        'titulo',
        'descripcion',
        'filtro',
        'imagen_path',
    ];
}