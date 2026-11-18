<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class EstadisticaController extends Controller
{
    public function index()
    {
        return Inertia::render('Estadisticas');
    }
}