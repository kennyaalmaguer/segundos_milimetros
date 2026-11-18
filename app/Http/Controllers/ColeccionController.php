<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserSticker;
use Inertia\Inertia;

class ColeccionController extends Controller
{
    // Carga la vista de Inertia pasando los stickers actuales del usuario autenticado
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $stickers = UserSticker::where('user_id', $userId)->get();
        
        return Inertia::render('Colecciones', [
            'stickers' => $stickers
        ]);
    }

    // Guarda o incrementa el sticker seleccionado al reclamar el regalo
    public function store(Request $request)
    {
        $userId = $request->user()->id;
        $stickerId = $request->input('sticker_id');

        $userSticker = UserSticker::where('user_id', $userId)
                                  ->where('sticker_id', $stickerId)
                                  ->first();

        if (!$userSticker) {
            $userSticker = new UserSticker();
            $userSticker->user_id = $userId;
            $userSticker->sticker_id = $stickerId;
            $userSticker->count = 1;
        } else {
            $userSticker->count += 1;
        }
        
        $userSticker->save();

        return back(); // Refresca la página de Inertia con los datos actualizados de forma nativa
    }
}