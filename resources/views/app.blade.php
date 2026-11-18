<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>Segundos y Milimetros</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- 1. A-Frame (UNA SOLA VEZ para evitar colapso de Three.js) -->
        <script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>
        
        <!-- 2. MindAR Image (Exclusivo para tus tarjetas/escudos en Coleccionables) -->
        <script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js"></script>
        
        <!-- 3. Extras de A-Frame (Solo si usas modelos .fbx/.gltf en coleccionables) -->
        <script src="https://cdn.jsdelivr.net/gh/c-frame/aframe-extras@720m/dist/aframe-extras.loaders.min.js"></script>

        <!-- Scripts de Laravel / Vite -->
        @viteReactRefresh
        @vite(['resources/js/app.jsx'])
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>