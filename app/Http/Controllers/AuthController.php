<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    // Muestra la vista de Registro
    public function showRegister()
    {
        return Inertia::render('Auth/Register'); 
    }

    // Guarda al usuario en la base de datos
    public function register(Request $request)
    {
        $campos = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $usuario = User::create([
            'name' => $campos['name'],
            'email' => $campos['email'],
            'password' => Hash::make($campos['password']),
        ]);

        // Inicia sesión automáticamente después de registrarse
        Auth::login($usuario);

        return redirect()->route('inicio');
    }

    // Muestra la vista de Login
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    // Valida las credenciales e inicia sesión
    public function login(Request $request)
    {
        $credenciales = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credenciales)) {
            $request->session()->regenerate();

            return redirect()->route('inicio');
        }

        return back()->withErrors([
            'email' => 'Las credenciales no coinciden con nuestros registros.',
        ]);
    }

    // Cierra la sesión
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}