<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class NotaController extends Controller
{
    public function index()
    {
        // Solo renderizamos la vista, sin mandar datos
        return Inertia::render('Notas');
    }
}