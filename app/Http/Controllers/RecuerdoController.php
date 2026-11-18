<?php

namespace App\Http\Controllers;

use App\Models\Recuerdo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class RecuerdoController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'titulo' => 'required|string|max:80',
            'descripcion' => 'nullable|string|max:180',
            'filtro' => 'required|string|max:50',
            'imagen_base64' => 'required|string|max:700000',
        ]);

        $imageContents = base64_decode($data['imagen_base64'], true);

        if ($imageContents === false || strlen($imageContents) > 512 * 1024) {
            throw ValidationException::withMessages([
                'imagen_base64' => 'La foto no es válida o supera el límite de 512 KB.',
            ]);
        }

        $imageInfo = getimagesizefromstring($imageContents);

        if (
            $imageInfo === false
            || ($imageInfo['mime'] ?? null) !== 'image/jpeg'
            || $imageInfo[0] > 1280
            || $imageInfo[1] > 1280
        ) {
            throw ValidationException::withMessages([
                'imagen_base64' => 'La foto debe ser JPEG y no superar 1280 × 1280 píxeles.',
            ]);
        }

        $path = 'recuerdos/'.Str::uuid().'.jpg';

        if (! Storage::disk('public')->put($path, $imageContents)) {
            throw new \RuntimeException('No se pudo guardar la foto en el almacenamiento público.');
        }

        Recuerdo::create([
            'user_id' => $request->user()->id,
            'titulo' => $data['titulo'],
            'descripcion' => $data['descripcion'] ?? null,
            'filtro' => $data['filtro'],
            'imagen_path' => $path,
        ]);

        return back();
    }

    public function destroy(Request $request, Recuerdo $recuerdo)
    {
        if ($recuerdo->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($recuerdo->imagen_path) {
            Storage::disk('public')->delete($recuerdo->imagen_path);
        }

        $recuerdo->delete();

        return back();
    }
}