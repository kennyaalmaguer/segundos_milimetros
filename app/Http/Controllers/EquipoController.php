<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class EquipoController extends Controller
{
    public function index()
    {
        $equipos = [
            [
                'id' => 1,
                'nombre' => 'Sultanes de Monterrey',
                'fundacion' => '1939',
                'estadio' => 'Estadio Mobil Super',
                'rosterKey' => 'José Cardona (OF), Roberto Valenzuela (INF)',
                'imagen' => 'https://images.unsplash.com/photo-1541534409395-5fa0f7797b5e?q=80&w=1000&auto=format&fit=crop'
            ],
            [
                'id' => 2,
                'nombre' => 'Toros de Tijuana',
                'fundacion' => '2004',
                'estadio' => 'Estadio Chevron',
                'rosterKey' => 'Junior Lake (OF), Nick Struck (P)',
                'imagen' => 'https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=1000&auto=format&fit=crop'
            ],
            [
                'id' => 3,
                'nombre' => 'Saraperos de Saltillo',
                'fundacion' => '1970',
                'estadio' => 'Estadio Francisco I. Madero',
                'rosterKey' => 'Henry Urrutia (INF), Fernando Villegas (OF)',
                'imagen' => 'https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=1000&auto=format&fit=crop'
            ],
            [
                'id' => 4,
                'nombre' => 'Acereros de Monclova',
                'fundacion' => '1974',
                'estadio' => 'Estadio Kickapoo Lucky Eagle',
                'rosterKey' => 'Addison Russell (INF), Chris Carter (1B)',
                'imagen' => 'https://images.unsplash.com/photo-1588832051183-505cb22b93df?q=80&w=1000&auto=format&fit=crop'
            ],
            [
                'id' => 5,
                'nombre' => 'Algodoneros de Unión Laguna',
                'fundacion' => '1940',
                'estadio' => 'Estadio Revolución',
                'rosterKey' => 'Nick Torres (OF), Didi Gregorius (INF)',
                'imagen' => 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=1000&auto=format&fit=crop'
            ],
            [
                'id' => 6,
                'nombre' => 'Tecolotes de los Dos Laredos',
                'fundacion' => '1940',
                'estadio' => 'Parque La Junta / Uni-Trade Stadium',
                'rosterKey' => 'Kennys Vargas (1B), Danry Vásquez (OF)',
                'imagen' => 'https://images.unsplash.com/photo-1505666287802-931dc83948e9?q=80&w=1000&auto=format&fit=crop'
            ],
            [
                'id' => 7,
                'nombre' => 'Rieleros de Aguascalientes',
                'fundacion' => '1975',
                'estadio' => 'Estadio Alberto Romo Chávez',
                'rosterKey' => 'Ángel Reyes (OF), Ramón Ríos (INF)',
                'imagen' => 'https://images.unsplash.com/photo-1562077772-3b12e86af4f9?q=80&w=1000&auto=format&fit=crop'
            ],
            [
                'id' => 8,
                'nombre' => 'Caliente de Durango',
                'fundacion' => '2024',
                'estadio' => 'Estadio Francisco Villa',
                'rosterKey' => 'James Nelson (INF), Neftalí Feliz (P)',
                'imagen' => 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?q=80&w=1000&auto=format&fit=crop'
            ],
            [
                'id' => 9,
                'nombre' => 'Charros de Jalisco',
                'fundacion' => '1949',
                'estadio' => 'Estadio Panamericano',
                'rosterKey' => 'Japhet Amador (DH), Christian Villanueva (3B)',
                'imagen' => 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?q=80&w=1000&auto=format&fit=crop'
            ],
            [
                'id' => 10,
                'nombre' => 'Dorados de Chihuahua',
                'fundacion' => '1936',
                'estadio' => 'Estadio Monumental Chihuahua',
                'rosterKey' => 'Sebastián Elizalde (OF), Wilfredo Tovar (INF)',
                'imagen' => 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop'
            ]
        ];

        return Inertia::render('Equipos', [
            'equipos' => $equipos
        ]);
    }
}