import { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Trophy, ArrowLeft, Play, RotateCcw } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';

export default function Juego({ auth }) {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameover'
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [highScore, setHighScore] = useState(0);

    // Referencias mutables para el bucle de renderizado en Canvas
    const gameStateRef = useRef(gameState);
    gameStateRef.current = gameState;

    const scoreRef = useRef(score);
    scoreRef.current = score;

    const timeLeftRef = useRef(timeLeft);
    timeLeftRef.current = timeLeft;

    const highScoreRef = useRef(highScore);
    highScoreRef.current = highScore;

    useEffect(() => {
        const saved = localStorage.getItem('liga_mx_norte_juego_high_score');
        if (saved) setHighScore(parseInt(saved));
    }, []);

    // Bloqueo estricto de scroll en móvil mientras se está jugando
    useEffect(() => {
        if (gameState === 'playing') {
            document.body.style.overflow = 'hidden';
            document.body.style.overscrollBehavior = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.overscrollBehavior = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.overscrollBehavior = '';
        };
    }, [gameState]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameState('playing');
    };

    useEffect(() => {
        if (gameState !== 'playing') return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            if (!canvas || !canvas.parentElement) return;
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let animationFrameId;
        let objects = [];
        let floatingTexts = [];
        let sliceTrail = [];
        let lastSpawn = 0;

        // Carga de tus imágenes desde public/images/
        const pelotaImg = new Image();
        pelotaImg.src = '/images/pelota.png';

        const guanteImg = new Image();
        guanteImg.src = '/images/guante.png';

        let isSwiping = false;

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: clientX - rect.left, y: clientY - rect.top };
        };

        const handleTouchStart = (e) => {
            if (e.cancelable) e.preventDefault();
            isSwiping = true;
            sliceTrail = [getPos(e)];
        };

        const handleTouchMove = (e) => {
            if (e.cancelable) e.preventDefault();
            if (!isSwiping) return;
            const pos = getPos(e);
            sliceTrail.push(pos);
            if (sliceTrail.length > 8) sliceTrail.shift();

            // Detección de cortes con los objetos voladores
            objects.forEach((obj) => {
                if (!obj.sliced) {
                    const dist = Math.hypot(pos.x - obj.x, pos.y - obj.y);
                    if (dist < obj.radius + 25) {
                        obj.sliced = true;

                        if (obj.type === 'pelota') {
                            setScore((s) => {
                                const newScore = s + 10;
                                if (newScore > highScoreRef.current) {
                                    setHighScore(newScore);
                                    localStorage.setItem('liga_mx_norte_juego_high_score', newScore);
                                }
                                return newScore;
                            });
                            setTimeLeft((t) => Math.min(t + 2, 45));

                            floatingTexts.push({
                                x: obj.x,
                                y: obj.y,
                                text: '+10',
                                color: '#22c55e',
                                alpha: 1,
                                vy: -2.2
                            });
                        } else {
                            setScore((s) => Math.max(0, s - 15));
                            setTimeLeft((t) => Math.max(0, t - 5));

                            floatingTexts.push({
                                x: obj.x,
                                y: obj.y,
                                text: '-15',
                                color: '#ef4444',
                                alpha: 1,
                                vy: -2.2
                            });
                        }
                    }
                }
            });
        };

        const handleTouchEnd = () => {
            isSwiping = false;
            sliceTrail = [];
        };

        canvas.addEventListener('mousedown', handleTouchStart);
        canvas.addEventListener('mousemove', handleTouchMove);
        window.addEventListener('mouseup', handleTouchEnd);

        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        // Reloj con dificultad progresiva agresiva desde los 50 puntos
        const timerInterval = setInterval(() => {
            if (gameStateRef.current === 'playing') {
                setTimeLeft((prev) => {
                    const currentScore = scoreRef.current;
                    const penaltyFactor = currentScore >= 50 
                        ? 1.6 + Math.floor((currentScore - 50) / 50) * 0.25 
                        : 1 + (currentScore / 50) * 0.6;
                    
                    const nextTime = prev - 0.1 * penaltyFactor;
                    if (nextTime <= 0) {
                        setGameState('gameover');
                        return 0;
                    }
                    return nextTime;
                });
            }
        }, 100);

        // Bucle de física y renderizado
        const render = (timestamp) => {
            if (gameStateRef.current !== 'playing') return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const currentScore = scoreRef.current;
            const effectiveLevel = currentScore >= 50 
                ? 6 + Math.floor((currentScore - 50) / 30) 
                : Math.floor(currentScore / 10);

            const spawnInterval = Math.max(240, 950 - effectiveLevel * 105);

            if (timestamp - lastSpawn > spawnInterval) {
                const burstCount = currentScore >= 50 
                    ? (Math.random() < 0.45 ? 4 : Math.random() < 0.7 ? 3 : 2)
                    : (currentScore >= 20 ? 2 : 1);

                const guanteProbability = currentScore >= 50 
                    ? Math.min(0.78, 0.70 + Math.floor((currentScore - 50) / 50) * 0.02)
                    : 0.45 + (currentScore / 50) * 0.25;

                const isMobile = canvas.width < 500;
                const objRadius = isMobile ? 32 : 38;

                let pelotaSpawnedInBurst = false;

                for (let i = 0; i < burstCount; i++) {
                    let isGuante = Math.random() < guanteProbability;
                    if (burstCount >= 3 && i === burstCount - 1 && !pelotaSpawnedInBurst) {
                        isGuante = false;
                    }
                    if (!isGuante) pelotaSpawnedInBurst = true;

                    objects.push({
                        x: Math.random() * (canvas.width - 80) + 40,
                        y: canvas.height + 50 + i * 25,
                        vx: (Math.random() - 0.5) * (isMobile ? 4.5 : 6.5),
                        vy: -13.5 - Math.random() * 5 - Math.min(effectiveLevel * 0.7, 5),
                        radius: objRadius,
                        type: isGuante ? 'guante' : 'pelota',
                        sliced: false,
                        rotation: 0,
                        vRot: (Math.random() - 0.5) * 0.11,
                    });
                }
                lastSpawn = timestamp;
            }

            // Actualizar y dibujar objetos
            for (let i = objects.length - 1; i >= 0; i--) {
                const obj = objects[i];
                obj.x += obj.vx;
                obj.y += obj.vy;
                obj.vy += 0.44;
                obj.rotation += obj.vRot;

                ctx.save();
                ctx.translate(obj.x, obj.y);
                ctx.rotate(obj.rotation);

                if (!obj.sliced) {
                    const img = obj.type === 'pelota' ? pelotaImg : guanteImg;
                    if (img.complete && img.naturalWidth !== 0) {
                        ctx.drawImage(img, -obj.radius, -obj.radius, obj.radius * 2, obj.radius * 2);
                    }
                }
                ctx.restore();

                if (obj.y > canvas.height + 120) {
                    objects.splice(i, 1);
                }
            }

            // Actualizar y dibujar textos flotantes (+10 / -15)
            for (let i = floatingTexts.length - 1; i >= 0; i--) {
                const ft = floatingTexts[i];
                ft.y += ft.vy;
                ft.alpha -= 0.025;

                if (ft.alpha <= 0) {
                    floatingTexts.splice(i, 1);
                    continue;
                }

                ctx.save();
                ctx.globalAlpha = ft.alpha;
                ctx.font = 'italic 900 28px sans-serif';
                ctx.fillStyle = ft.color;
                ctx.textAlign = 'center';
                ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
                ctx.shadowBlur = 6;
                ctx.fillText(ft.text, ft.x, ft.y);
                ctx.restore();
            }

            // Estela de corte láser rojo estilo ninja
            if (sliceTrail.length > 1) {
                ctx.beginPath();
                ctx.moveTo(sliceTrail[0].x, sliceTrail[0].y);
                for (let i = 1; i < sliceTrail.length; i++) {
                    ctx.lineTo(sliceTrail[i].x, sliceTrail[i].y);
                }
                ctx.strokeStyle = 'rgba(220, 38, 38, 0.85)';
                ctx.lineWidth = 6;
                ctx.lineCap = 'round';
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'red';
                ctx.stroke();
                ctx.shadowBlur = 0;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(timerInterval);
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousedown', handleTouchStart);
            canvas.removeEventListener('mousemove', handleTouchMove);
            window.removeEventListener('mouseup', handleTouchEnd);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [gameState]);

    return (
        <AppLayout auth={auth} title="Zona de Juegos - Liga MX Norte">
            <Head title="Zona de Juegos" />

            <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-24 sm:pb-32">
                {/* Cabecera y botón de retorno a Inicio (Cambiado a ruta estricta /inicio) */}
                <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
                    <Link
                        href="/inicio"
                        className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#0a1128] text-white px-3 sm:px-4 py-2 rounded-sm font-bold text-xs sm:text-sm border-l-4 border-red-700 hover:bg-[#131c36] transition-all cursor-pointer"
                    >
                        <ArrowLeft size={16} /> Volver al Inicio
                    </Link>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-yellow-500 font-black italic text-sm sm:text-lg bg-[#0a1128] px-3 sm:px-4 py-2 border border-blue-900/50 rounded-sm">
                        <Trophy size={18} /> Récord: {highScore} pts
                    </div>
                </div>

                {/* Banner principal */}
                <div className="bg-[#0a1128] border-l-[8px] sm:border-l-[12px] border-red-700 p-4 sm:p-6 shadow-2xl mb-4 sm:mb-8">
                    <h2 className="text-xl sm:text-3xl font-black italic text-white uppercase tracking-wider">Zona de Juegos: Béisbol Ninja</h2>
                    <p className="text-gray-400 font-medium text-xs sm:text-sm mt-1 leading-tight">
                        Desliza el dedo o el mouse para cortar las pelotas y sumar puntos y tiempo. Cuidado con cortar los guantes: te restarán puntos y penalizarán el cronómetro. ¡Al llegar a 50 puntos se desata la lluvia de guantes y el reloj se acelera!
                    </p>
                </div>

                {/* Contenedor del Juego responsivo */}
                <div className="relative w-full h-[68dvh] min-h-[420px] max-h-[580px] bg-[#0a1128] border-2 border-dashed border-blue-900/50 rounded-sm overflow-hidden shadow-2xl flex flex-col items-center justify-center select-none">
                    
                    {/* Pantalla de Inicio */}
                    {gameState === 'start' && (
                        <div className="absolute inset-0 z-20 bg-[#0a1128]/95 flex flex-col items-center justify-center p-6 text-center">
                            <h1 className="text-3xl sm:text-4xl font-black italic text-white uppercase tracking-wider mb-3">
                                Ninja <span className="text-red-600">Baseball</span>
                            </h1>
                            <p className="text-gray-300 text-xs sm:text-sm max-w-md mb-6 leading-relaxed font-medium">
                                Corta las <span className="text-blue-400 font-bold">pelotas (+10)</span> para ganar tiempo y puntos. Esquiva los <span className="text-red-500 font-bold">guantes (-15)</span> o perderás velocidad y puntaje.
                            </p>
                            <button
                                onClick={startGame}
                                className="bg-red-700 hover:bg-red-600 text-white font-black italic tracking-wider text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm shadow-[0_0_20px_rgba(220,38,38,0.6)] flex items-center gap-3 transition-transform active:scale-95 cursor-pointer uppercase"
                            >
                                <Play size={20} /> Iniciar Partida
                            </button>
                        </div>
                    )}

                    {/* Pantalla de Game Over */}
                    {gameState === 'gameover' && (
                        <div className="absolute inset-0 z-20 bg-[#0a1128]/95 flex flex-col items-center justify-center p-6 text-center">
                            <h2 className="text-3xl sm:text-4xl font-black italic text-red-600 uppercase tracking-wider mb-2">
                                ¡Se Acabó el Tiempo!
                            </h2>
                            <p className="text-gray-300 text-xs sm:text-sm mb-2 font-medium">Puntuación Final:</p>
                            <span className="text-5xl sm:text-6xl font-black italic text-white mb-6">{score}</span>
                            <button
                                onClick={startGame}
                                className="bg-red-700 hover:bg-red-600 text-white font-black italic tracking-wider px-6 sm:px-8 py-3 rounded-sm shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer uppercase text-xs sm:text-sm"
                            >
                                <RotateCcw size={18} /> Jugar de Nuevo
                            </button>
                        </div>
                    )}

                    {/* HUD superior flotante dentro del canvas */}
                    {gameState === 'playing' && (
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-10 flex justify-between items-center pointer-events-none">
                            <div className="bg-[#131c36]/90 border border-blue-900/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-white font-black italic text-base sm:text-lg shadow-md">
                                Puntos: <span className="text-red-500">{score}</span>
                            </div>
                            <div className={`bg-[#131c36]/90 border px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-white font-black italic text-base sm:text-lg shadow-md ${timeLeft < 10 ? 'border-red-600 text-red-500 animate-pulse' : 'border-blue-900/50'}`}>
                                Tiempo: {Math.ceil(timeLeft)}s
                            </div>
                        </div>
                    )}

                    {/* Canvas interactivo */}
                    <canvas ref={canvasRef} className="w-full h-full cursor-crosshair touch-none block" />
                </div>
            </div>
        </AppLayout>
    );
}