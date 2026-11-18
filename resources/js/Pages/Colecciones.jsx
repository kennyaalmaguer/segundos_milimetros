import { useState, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import { Camera, Lock, X, Scan, Award, CheckCircle2, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';

export default function Colecciones({ auth, stickers = [] }) {
    const [isScanning, setIsScanning] = useState(false);
    const [scannedResult, setScannedResult] = useState(null); 
    const [isClaiming, setIsClaiming] = useState(false);
    const [showClaimButton, setShowClaimButton] = useState(false); 

    const [userStickers, setUserStickers] = useState(() => {
        const formatted = {};
        try {
            if (Array.isArray(stickers)) {
                stickers.forEach(s => {
                    if (s && s.sticker_id) {
                        formatted[s.sticker_id] = { count: s.count || 1, unlocked: true };
                    }
                });
            }
        } catch (e) {
            console.error("Error al formatear stickers:", e);
        }
        return formatted;
    });
    
    const timerRef = useRef(null);
    const albumSlots = Array.from({ length: 12 }, (_, i) => i + 1);

    useEffect(() => {
        if (isScanning) {
            document.body.style.overflow = 'hidden';
            document.body.style.overscrollBehavior = 'none';

            const initTimer = setTimeout(() => {
                const targetEntity = document.querySelector('[mindar-image-target]');
                if (targetEntity && !targetEntity.hasAttribute('data-listener')) {
                    targetEntity.setAttribute('data-listener', 'true');
                    
                    targetEntity.addEventListener('targetFound', () => {
                        if (showClaimButton || timerRef.current) return;

                        timerRef.current = setTimeout(() => {
                            setShowClaimButton(true); 
                        }, 3000);
                    });

                    targetEntity.addEventListener('targetLost', () => {
                        if (!showClaimButton && timerRef.current) {
                            clearTimeout(timerRef.current);
                            timerRef.current = null;
                        }
                    });
                }
            }, 1000);

            return () => clearTimeout(initTimer);
        } else {
            document.body.style.overflow = '';
            document.body.style.overscrollBehavior = '';
            setShowClaimButton(false);
            setScannedResult(null);
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = null;
            
            document.querySelectorAll('video').forEach((v) => {
                if (v.srcObject) v.srcObject.getTracks().forEach((track) => track.stop());
                v.remove();
            });
            document.querySelectorAll('.mindar-ui-overlay, .mindar-ui-loading').forEach((el) => el.remove());
        }
    }, [isScanning, showClaimButton]);

    const handleOpenGift = () => {
        const randomStickerId = Math.floor(Math.random() * 12) + 1;
        const isFirst = !userStickers[randomStickerId]?.unlocked;
        const currentCount = (userStickers[randomStickerId]?.count || 0) + 1;

        setScannedResult({
            team: "Sultanes de Monterrey",
            stickerId: randomStickerId,
            stickerPath: `/stickers/s${randomStickerId}.jpg`,
            isFirstTime: isFirst,
            count: currentCount
        });
    };

    const handleClaimSticker = () => {
        if (!scannedResult) return;
        setIsClaiming(true);

        router.post('/colecciones/guardar', { sticker_id: scannedResult.stickerId }, {
            preserveScroll: true,
            onSuccess: () => {
                setUserStickers(prev => ({
                    ...prev,
                    [scannedResult.stickerId]: {
                        count: scannedResult.count,
                        unlocked: true
                    }
                }));
                setIsClaiming(false);
                setScannedResult(null);
                setShowClaimButton(false);
                setIsScanning(false); 
            },
            onError: (err) => {
                console.error("Error al guardar sticker:", err);
                setIsClaiming(false);
            }
        });
    };

    return (
        <AppLayout auth={auth} title="Salón de las Colecciones - Liga MX Norte">
            <Head title="Salón de las Colecciones" />

            <div className="max-w-5xl mx-auto px-4 py-8 pb-32">
                <div className="bg-[#0a1128] border-l-[12px] border-red-700 p-6 shadow-2xl mb-8">
                    <h2 className="text-3xl font-black italic text-white uppercase tracking-wider">Tu Álbum</h2>
                    <p className="text-gray-400 font-medium text-sm mt-1 leading-tight">
                        Escanea los escudos oficiales de los equipos en productos, boletos o estadios para desbloquear tarjetas exclusivas.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {albumSlots.map((slot) => {
                        const stickerData = userStickers[slot];
                        const isUnlocked = stickerData?.unlocked;
                        const count = stickerData?.count || 0;

                        return (
                            <div key={slot} className="aspect-[3/4] bg-[#131c36] border-2 border-dashed border-blue-900/50 rounded-sm flex flex-col items-center justify-center relative overflow-hidden group shadow-inner">
                                {isUnlocked ? (
                                    <>
                                        <img 
                                            src={`/stickers/s${slot}.jpg`} 
                                            alt={`Sticker ${slot}`} 
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                                        <div className="absolute top-2 right-2 bg-red-700 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                                            x{count}
                                        </div>
                                        <span className="absolute bottom-2 text-xs font-black italic text-white uppercase tracking-wider">
                                            #{slot.toString().padStart(2, '0')} - Desbloqueado
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-400 to-transparent pointer-events-none" />
                                        <Lock size={32} className="text-blue-900/70 mb-2" />
                                        <span className="text-blue-900/70 font-black italic text-2xl">
                                            {slot.toString().padStart(2, '0')}
                                        </span>
                                        <div className="absolute bottom-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center px-2">
                                            Tarjeta Oculta
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {!isScanning && (
                <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none">
                    <button 
                        onClick={() => setIsScanning(true)}
                        className="pointer-events-auto bg-red-700 text-white p-5 rounded-full shadow-[0_10px_25px_rgba(220,38,38,0.6)] flex items-center justify-center hover:bg-red-600 transition-transform active:scale-95 border-4 border-[#e4e5e8] cursor-pointer"
                    >
                        <Camera size={36} />
                    </button>
                </div>
            )}

            {isScanning && (
                <div className="fixed inset-0 z-[100] bg-black overflow-hidden w-screen h-[100dvh]">
                    <style>{`
                        .a-enter-vr, .a-enter-ar, .a-enter-vr-button, .a-enter-ar-button {
                            display: none !important;
                            visibility: hidden !important;
                            opacity: 0 !important;
                            pointer-events: none !important;
                        }
                        /* Estilos para forzar que el video de la cámara cubra toda la pantalla en móviles */
                        a-scene {
                            width: 100% !important;
                            height: 100% !important;
                            position: absolute !important;
                            top: 0 !important;
                            left: 0 !important;
                        }
                        video {
                            object-fit: cover !important;
                            width: 100vw !important;
                            height: 100vh !important;
                            position: absolute !important;
                            top: 50% !important;
                            left: 50% !important;
                            transform: translate(-50%, -50%) !important;
                        }
                    `}</style>

                    <a-scene 
                        mindar-image="imageTargetSrc: /targets.mind; autoStart: true; uiScanning: no;" 
                        color-space="sRGB" 
                        renderer="colorManagement: true, physicallyCorrectLights" 
                        vr-mode-ui="enabled: false" 
                        device-orientation-permission-ui="enabled: false"
                        embedded
                    >
                        <a-assets>
                            <a-asset-item id="sultanes-obj" src="/modelos3d/escudo.obj"></a-asset-item>
                            <img id="sultanes-tex" src="/modelos3d/txsultanes.jpg" alt="Textura" />
                        </a-assets>



                        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

                        <a-entity mindar-image-target="targetIndex: 0">
                            <a-entity 
                                obj-model="obj: #sultanes-obj" 
                                material="src: #sultanes-tex"
                                rotation="0 0 0" 
                                position="0 0 0" 
                                scale="0.1 0.1 0.1" 
                                animation="property: rotation; to: 0 360 0; dur: 5000; easing: linear; loop: true;"
                            ></a-entity>
                        </a-entity>
                    </a-scene>


                    <div className="absolute inset-0 z-[150] pointer-events-none flex flex-col items-center justify-center">
                        <div className="relative aspect-square w-[75vw] max-w-[280px] sm:max-w-sm border border-white/20 flex items-center justify-center overflow-hidden bg-transparent">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white" />
                            <Scan size={60} className="text-white/20" />
                            <div className="absolute left-0 right-0 h-[2px] bg-red-500 shadow-[0_0_15px_rgba(220,38,38,1)] animate-[pulse_2s_ease-in-out_infinite]" />
                        </div>
                    </div>

                    <div className="absolute bottom-24 left-0 right-0 z-[180] flex justify-center pointer-events-none px-6">
                        <AnimatePresence>
                            {showClaimButton && !scannedResult && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="pointer-events-auto"
                                >
                                    <button 
                                        onClick={handleOpenGift}
                                        className="bg-red-600 hover:bg-red-500 text-white p-4 rounded-full shadow-[0_5px_25px_rgba(220,38,38,0.9)] flex items-center justify-center border-2 border-white/80 animate-bounce cursor-pointer transition-transform active:scale-95"
                                        title="¡Abrir Recompensa!"
                                    >
                                        <Gift size={28} />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <AnimatePresence>
                        {scannedResult && typeof scannedResult === 'object' && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="absolute inset-0 z-[250] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
                            >
                                <div className="bg-[#131c36] border-2 border-red-700/60 p-6 rounded-xl max-w-sm w-full shadow-2xl flex flex-col items-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-2 bg-red-700" />
                                    
                                    <Award size={48} className="text-red-500 mb-2 animate-bounce" />
                                    <h3 className="text-2xl font-black italic text-white uppercase tracking-wider">¡Felicidades!</h3>
                                    <p className="text-gray-400 text-xs mt-1 mb-4">Has descubierto una tarjeta secreta del escudo de {scannedResult.team}.</p>

                                    <div className="relative aspect-[3/4] w-40 mb-4 border-2 border-white/20 rounded-lg overflow-hidden shadow-lg group">
                                        <img 
                                            src={scannedResult.stickerPath} 
                                            alt="Sticker Obtenido" 
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 inset-x-0 bg-black/70 py-1 text-[11px] font-black text-white uppercase">
                                            Sticker #{scannedResult.stickerId}
                                        </div>
                                    </div>

                                    {scannedResult.isFirstTime ? (
                                        <p className="text-emerald-400 text-xs font-bold mb-4">✨ ¡Nuevo equipo registrado en tu álbum!</p>
                                    ) : (
                                        <p className="text-blue-400 text-xs font-bold mb-4">🔄 ¡Sticker repetido! Ya tienes {scannedResult.count} en total.</p>
                                    )}

                                    <button 
                                        onClick={handleClaimSticker}
                                        disabled={isClaiming}
                                        className="w-full bg-red-700 hover:bg-red-600 text-white font-black py-3 rounded-lg uppercase tracking-wider text-sm shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <CheckCircle2 size={18} /> Guardar en Colección
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!scannedResult && (
                        <button 
                            onClick={() => setIsScanning(false)}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold text-sm tracking-wider shadow-lg transition-all pointer-events-auto cursor-pointer"
                        >
                            <X size={20} /> Cerrar
                        </button>
                    )}

                </div>
            )}
        </AppLayout>
    );
}