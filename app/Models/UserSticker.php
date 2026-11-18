<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSticker extends Model
{
    use HasFactory;

    protected $table = 'user_stickers';

    protected $fillable = [
        'user_id',
        'sticker_id',
        'count',
    ];
}