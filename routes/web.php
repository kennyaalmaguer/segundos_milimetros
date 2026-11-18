<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\NotaController;
use App\Http\Controllers\ColeccionController;
use App\Http\Controllers\EstadisticaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecuerdoController;
use App\Models\Recuerdo;


// Pantalla principal pública
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

// Rutas para INVITADOS (Login y Registro)
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::get('/registro', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/registro', [AuthController::class, 'register']);
});

// Rutas PROTEGIDAS (Solo usuarios logueados)
Route::middleware('auth')->group(function () {
    Route::get('/inicio', function () {
        $recuerdos = Recuerdo::where('user_id', auth()->id())
            ->latest()
            ->get()
            ->map(function ($r) {
                return [
                    'id' => $r->id,
                    'titulo' => $r->titulo,
                    'descripcion' => $r->descripcion,
                    'filtro' => $r->filtro,
                    'imagen_url' => asset('storage/' . $r->imagen_path),
                    'fecha' => $r->created_at->format('d M Y'),
                ];
            });

        return Inertia::render('Inicio', [
            'recuerdos' => $recuerdos,
        ]);
    })->name('inicio');

    // Ruta para la vista independiente del álbum completo de recuerdos (plana en Recuerdos.jsx)
    Route::get('/recuerdos', function () {
        $recuerdos = Recuerdo::where('user_id', auth()->id())
            ->latest()
            ->get()
            ->map(function ($r) {
                return [
                    'id' => $r->id,
                    'titulo' => $r->titulo,
                    'descripcion' => $r->descripcion,
                    'filtro' => $r->filtro,
                    'imagen_url' => asset('storage/' . $r->imagen_path),
                    'fecha' => $r->created_at->format('d M Y'),
                ];
            });

        return Inertia::render('Recuerdos', [
            'recuerdos' => $recuerdos,
        ]);
    })->name('recuerdos.index');

    // Rutas de Acciones para Galería de Recuerdos
    Route::post('/recuerdos', [RecuerdoController::class, 'store'])->name('recuerdos.store');
    Route::delete('/recuerdos/{recuerdo}', [RecuerdoController::class, 'destroy'])->name('recuerdos.destroy');

    Route::get('/equipos', [EquipoController::class, 'index'])->name('equipos.index');
    Route::get('/notas', [NotaController::class, 'index'])->name('notas.index');
    
    // Rutas del Álbum / Colecciones (GET para ver la vista, POST para guardar el sticker)
    Route::get('/colecciones', [ColeccionController::class, 'index'])->name('colecciones.index');
    Route::post('/colecciones/guardar', [ColeccionController::class, 'store'])->name('colecciones.store');

    Route::get('/estadisticas', [EstadisticaController::class, 'index'])->name('estadisticas.index');
    
    // Ruta para el minijuego de béisbol
    Route::get('/juego', function () {
        return Inertia::render('Juego');
    })->name('juego.index');

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});