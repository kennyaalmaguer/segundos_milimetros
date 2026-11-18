import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Trash2, ArrowLeft, Check, RotateCcw, Trophy, VideoOff, HardHat } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';

// IMPORTACIONES NATIVAS (Aisladas, sin A-Frame, requieren haber ejecutado: npm install mind-ar three)
import * as THREE from 'three';
import { MindARThree } from 'mind-ar/dist/mindar-face-three.prod.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const FILTROS_INSTAGRAM = [
    { id: 'normal', nombre: 'Normal' },
    { id: 'copa', nombre: 'Copa AR' },
    { id: 'mejillas', nombre: 'Trofeos en mejillas' },
    { id: 'casco', nombre: 'Casco' }
];
const TROPHY_SCALE = 0.12;
const TROPHY_MODEL_MAX_SIZE = 2.062963;

export default function Recuerdos({ recuerdos = [] }) {
    // Al usar NPM, los scripts ya están en el bundle, así que siempre están cargados
    const [scriptsLoaded] = useState(true); 
    
    const [modalAbierto, setModalAbierto] = useState(false);
    const [camaraIniciando, setCamaraIniciando] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [errorGuardar, setErrorGuardar] = useState('');
    const [fotoCapturadaDataUrl, setFotoCapturadaDataUrl] = useState(null);
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(FILTROS_INSTAGRAM[0]);
    const [errorCamara, setErrorCamara] = useState('');

    const containerRef = useRef(null);
    const mindarThreeRef = useRef(null);
    const trophyRef = useRef(null);
    const cheekTrophiesRef = useRef([]);
    const helmetsRef = useRef([]);
    const filtroSeleccionadoRef = useRef('normal');

    const { data, setData, reset } = useForm({
        titulo: '',
        descripcion: '',
        filtro: 'Normal',
        imagen: null,
    });

    const iniciarAR = async () => {
        if (!containerRef.current) return;
        setCamaraIniciando(true);
        setErrorCamara('');

        try {
            // Inicialización nativa de MindAR con Three.js
            const mindarThree = new MindARThree({
                container: containerRef.current,
            });
            mindarThreeRef.current = mindarThree;

            const { renderer, scene, camera } = mindarThree;

            const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
            scene.add(light);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(0, 5, 2);
            scene.add(directionalLight);

            // Anclaje a la frente superior
            const anchor = mindarThree.addAnchor(10);
            const helmetAnchors = [mindarThree.addAnchor(159), mindarThree.addAnchor(386)];
            const cheekAnchors = [mindarThree.addAnchor(50), mindarThree.addAnchor(280)];

            const textureLoader = new THREE.TextureLoader();
            const texture = textureLoader.load('/modelos3d/Baseball_Trophy_diffuse.png');

            const objLoader = new OBJLoader();
            objLoader.load('/modelos3d/Baseball_Trophy.obj', (object) => {
                object.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshBasicMaterial({ map: texture });
                    }
                });
                
                object.scale.set(0.009, 0.009, 0.009);
                object.position.set(0, 0, 0); 
                object.rotation.x = -Math.PI / 2;
                
                const trophyPivot = new THREE.Group();
                trophyPivot.visible = filtroSeleccionadoRef.current === 'copa';
                trophyPivot.add(object);
                trophyRef.current = trophyPivot;
                anchor.group.add(trophyPivot);
            });

            objLoader.load('/modelos3d/Trophy.obj', (object) => {
                const material = new THREE.MeshStandardMaterial({
                    color: 0xd4af37,
                    metalness: 0.55,
                    roughness: 0.3,
                });
                object.traverse((child) => {
                    if (child.isMesh) {
                        child.material = material;
                    }
                });

                const center = new THREE.Box3()
                    .setFromObject(object)
                    .getCenter(new THREE.Vector3());
                const scale = TROPHY_SCALE;
                object.scale.setScalar(scale);
                object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

                cheekTrophiesRef.current = cheekAnchors.map((cheekAnchor) => {
                    const trophy = object.clone(true);
                    trophy.visible = filtroSeleccionadoRef.current === 'mejillas';
                    cheekAnchor.group.add(trophy);
                    return trophy;
                });
            });

            const helmetTexture = textureLoader.load(
                '/modelos3d/helmet_helmet%20exterior_BaseColor.png',
            );
            objLoader.load('/modelos3d/helmet_obj.obj', (object) => {
                const material = new THREE.MeshStandardMaterial({
                    map: helmetTexture,
                    metalness: 0.1,
                    roughness: 0.75,
                });
                const interiorMeshes = [];
                object.traverse((child) => {
                    if (child.isMesh) {
                        if (child.name.toLowerCase().includes('interior')) {
                            interiorMeshes.push(child);
                        } else {
                            child.material = material;
                        }
                    }
                });
                interiorMeshes.forEach((mesh) => mesh.removeFromParent());

                object.rotation.y = -Math.PI / 2;

                const bounds = new THREE.Box3().setFromObject(object);
                const center = bounds.getCenter(new THREE.Vector3());
                const size = bounds.getSize(new THREE.Vector3());
                const trophyDisplaySize = TROPHY_MODEL_MAX_SIZE * TROPHY_SCALE;
                const scale = trophyDisplaySize / Math.max(size.x, size.y, size.z);
                helmetsRef.current = helmetAnchors.map((helmetAnchor) => {
                    const helmet = object.clone(true);
                    helmet.scale.setScalar(scale);
                    helmet.position.set(
                        -center.x * scale,
                        -center.y * scale,
                        -center.z * scale,
                    );
                    helmet.visible = filtroSeleccionadoRef.current === 'casco';
                    helmetAnchor.group.add(helmet);
                    return helmet;
                });
            });

            await mindarThree.start();
            mindarThree.video.style.maxWidth = 'none';
            mindarThree.video.style.maxHeight = 'none';
            mindarThree.video.style.zIndex = '0';
            renderer.domElement.style.zIndex = '1';
            mindarThree.cssRenderer.domElement.style.zIndex = '2';
            setCamaraIniciando(false);

            renderer.setAnimationLoop(() => {
                renderer.render(scene, camera);
                // Rotación suave continua si el trofeo está visible
                if (trophyRef.current && anchor.group.visible) {
                    trophyRef.current.rotation.y += 0.015;
                }
            });

        } catch (error) {
            console.error("Error iniciando cámara AR:", error);
            setErrorCamara('Error de IA o cámara bloqueada.');
            setCamaraIniciando(false);
        }
    };

    const detenerAR = () => {
        if (mindarThreeRef.current) {
            mindarThreeRef.current.stop();
            if (mindarThreeRef.current.renderer) {
                mindarThreeRef.current.renderer.setAnimationLoop(null);
            }
            mindarThreeRef.current = null;
        }
        if (containerRef.current) {
            containerRef.current.innerHTML = '';
        }
    };

    useEffect(() => {
        if (modalAbierto && !fotoCapturadaDataUrl) {
            setTimeout(iniciarAR, 100);
        } else if (!modalAbierto || fotoCapturadaDataUrl) {
            detenerAR();
        }
        return () => detenerAR();
    }, [modalAbierto, fotoCapturadaDataUrl]);

    const abrirModal = () => {
        reset();
        setErrorGuardar('');
        setGuardando(false);
        setFotoCapturadaDataUrl(null);
        filtroSeleccionadoRef.current = 'normal';
        setFiltroSeleccionado(FILTROS_INSTAGRAM[0]);
        setModalAbierto(true);
    };

    const seleccionarFiltro = (filtro) => {
        filtroSeleccionadoRef.current = filtro.id;
        setFiltroSeleccionado(filtro);
        if (trophyRef.current) {
            trophyRef.current.visible = filtro.id === 'copa';
        }
        cheekTrophiesRef.current.forEach((trophy) => {
            trophy.visible = filtro.id === 'mejillas';
        });
        helmetsRef.current.forEach((helmet) => {
            helmet.visible = filtro.id === 'casco';
        });
    };

    const cerrarModal = () => {
        detenerAR();
        setModalAbierto(false);
        setFotoCapturadaDataUrl(null);
    };

    const capturarDesdeVideo = () => {
        const mindar = mindarThreeRef.current;
        if (!mindar || !mindar.video || !mindar.renderer.domElement) return;

        const video = mindar.video;
        const canvasWebGL = mindar.renderer.domElement;

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 1080;
        canvas.height = video.videoHeight || 1080;
        const ctx = canvas.getContext('2d');

        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        if (filtroSeleccionado.id !== 'normal') {
            mindar.renderer.render(mindar.scene, mindar.camera);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.drawImage(canvasWebGL, 0, 0, canvas.width, canvas.height);
        }

        setFotoCapturadaDataUrl(canvas.toDataURL('image/jpeg', 0.92));
        detenerAR();
    };

    const handleGuardarRecuerdo = async (e) => {
        e.preventDefault();
        if (!fotoCapturadaDataUrl || guardando) return;

        setGuardando(true);
        setErrorGuardar('');

        try {
            const image = await new Promise((resolve, reject) => {
                const loadedImage = new Image();
                loadedImage.onload = () => resolve(loadedImage);
                loadedImage.onerror = () => reject(new Error('No se pudo preparar la foto. Intenta tomarla de nuevo.'));
                loadedImage.src = fotoCapturadaDataUrl;
            });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const uploadLimit = 400 * 1024;
            let maxDimension = 1280;
            let quality = 0.72;
            let blob;

            while (true) {
                const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
                canvas.width = Math.round(image.width * scale);
                canvas.height = Math.round(image.height * scale);
                context.drawImage(image, 0, 0, canvas.width, canvas.height);

                blob = await new Promise((resolve, reject) => {
                    canvas.toBlob(
                        (result) => result
                            ? resolve(result)
                            : reject(new Error('No se pudo comprimir la foto. Intenta de nuevo.')),
                        'image/jpeg',
                        quality,
                    );
                });

                if (blob.size <= uploadLimit) break;
                if (quality > 0.5) {
                    quality = Math.max(0.5, quality - 0.08);
                } else if (maxDimension > 640) {
                    maxDimension = Math.max(640, Math.round(maxDimension * 0.8));
                    quality = 0.72;
                } else {
                    throw new Error('La foto sigue superando el límite de carga del servidor. Intenta tomarla de nuevo.');
                }
            }

            const imageBase64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    if (typeof reader.result !== 'string') {
                        reject(new Error('No se pudo preparar la foto. Intenta de nuevo.'));
                        return;
                    }

                    resolve(reader.result.split(',')[1]);
                };
                reader.onerror = () => reject(new Error('No se pudo leer la foto. Intenta de nuevo.'));
                reader.readAsDataURL(blob);
            });

            router.post('/recuerdos', {
                titulo: data.titulo.trim() || 'Momento Estelar',
                descripcion: data.descripcion.trim(),
                filtro: filtroSeleccionado.nombre,
                imagen_base64: imageBase64,
            }, {
                onSuccess: cerrarModal,
                onError: (errors) => {
                    const message = Object.values(errors).flat().find(Boolean);
                    setErrorGuardar(message || 'No se pudo guardar el recuerdo. Intenta de nuevo.');
                },
                onFinish: () => setGuardando(false),
            });
        } catch (error) {
            console.error('Error preparando el recuerdo:', error);
            setErrorGuardar(error.message || 'No se pudo preparar la foto. Intenta tomarla de nuevo.');
            setGuardando(false);
        }
    };

    return (
        <AppLayout title="Mi Álbum Personal de Recuerdos">
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
                
                <div className="bg-white p-6 border-l-8 border-blue-900 shadow-xl rounded-sm flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black uppercase text-[#0a1128]">Álbum <span className="italic text-red-600">Personal</span></h2>
                        <p className="text-gray-500 font-bold text-sm mt-1">Tus fotos AR en la frente.</p>
                    </div>
                    <a href="/inicio" className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-[#0a1128] font-bold text-xs px-4 py-2.5 rounded-sm transition">
                        <ArrowLeft size={16} /> Volver al Inicio
                    </a>
                </div>

                <div className="bg-white rounded-sm shadow-xl p-6 md:p-8 border-t-8 border-red-700 space-y-6">
                    <div className="flex justify-between items-center border-b pb-4">
                        <h3 className="text-xl font-black italic uppercase text-[#0a1128] flex items-center gap-2">
                            <Camera className="text-red-600" size={22} /> Todos los Momentos ({recuerdos.length})
                        </h3>
                        <button 
                            onClick={abrirModal}
                            disabled={!scriptsLoaded}
                            className="inline-flex items-center gap-2 bg-[#0a1128] hover:bg-blue-950 text-white font-black italic uppercase text-xs px-5 py-2.5 rounded-sm transition shadow-md cursor-pointer disabled:opacity-50"
                        >
                            <Camera size={16} className="text-amber-400" /> Abrir Cámara Facial
                        </button>
                    </div>

                    {recuerdos.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-sm p-12 text-center space-y-3 bg-gray-50">
                            <Camera size={48} className="mx-auto text-gray-400" />
                            <p className="font-black italic uppercase text-[#0a1128] text-lg">Tu álbum está vacío</p>
                            <button onClick={abrirModal} disabled={!scriptsLoaded} className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white font-black italic uppercase text-xs px-5 py-2.5 rounded-sm transition cursor-pointer mt-2 disabled:opacity-50">
                                <Camera size={15} /> Tomar mi primera foto
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {recuerdos.map((foto) => (
                                <motion.div key={foto.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#e4e5e8] p-3 rounded-sm shadow-md border-2 border-gray-300 relative group flex flex-col justify-between">
                                    <div className="relative h-56 overflow-hidden rounded-sm bg-black mb-3">
                                        <img src={foto.imagen_url} alt={foto.titulo} className="w-full h-full object-cover" />
                                        <button onClick={() => router.delete(`/recuerdos/${foto.id}`, { preserveScroll: true })} className="absolute top-2 right-2 bg-red-700/90 hover:bg-red-700 text-white p-2 rounded-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="px-1 pb-1 space-y-1">
                                        <p className="font-black italic uppercase text-[#0a1128] text-sm truncate">{foto.titulo}</p>
                                        <div className="pt-1 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest border-t border-gray-300">
                                            <span>{foto.fecha}</span>
                                            <span className="text-red-700">{foto.filtro}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {scriptsLoaded ? createPortal(
                    <AnimatePresence>
                        {modalAbierto && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-[999999] bg-black flex flex-col h-[100dvh] w-screen overflow-hidden">
                                <div className="flex flex-col h-full w-full max-w-md mx-auto relative bg-black">
                                    
                                    <div className="flex justify-between items-center px-4 py-3 shrink-0 bg-black z-30">
                                        <button type="button" onClick={cerrarModal} className="text-white font-bold text-sm tracking-wider hover:opacity-70 transition cursor-pointer">✕</button>
                                        <div className="w-6" />
                                    </div>

                                    <form onSubmit={handleGuardarRecuerdo} className="flex flex-col flex-1 overflow-hidden relative">
                                        
                                        <div className="relative flex-1 w-full bg-black overflow-hidden flex items-center justify-center">
                                            {!fotoCapturadaDataUrl ? (
                                                <>
                                                    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden isolate"></div>
                                                    
                                                    {camaraIniciando && (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 space-y-3 bg-neutral-900 z-20 pointer-events-none">
                                                            <Camera size={48} className="text-white/30 animate-pulse" />
                                                            <p className="text-xs text-gray-300 font-medium tracking-widest uppercase">
                                                                {errorCamara || 'Encendiendo Cámara...'}
                                                            </p>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <img src={fotoCapturadaDataUrl} alt="Vista previa" className="w-full h-full object-cover z-20" />
                                            )}
                                        </div>

                                        {!fotoCapturadaDataUrl && (
                                            <div className="bg-black py-4 shrink-0 z-30">
                                                <div className="flex items-center justify-center gap-6 overflow-x-auto px-4 scrollbar-none">
                                                    {FILTROS_INSTAGRAM.map((f) => (
                                                        <div key={f.id} onClick={() => seleccionarFiltro(f)} className="flex flex-col items-center gap-1 cursor-pointer">
                                                            <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-lg p-1 transition ${filtroSeleccionado.id === f.id ? 'border-white bg-neutral-800 scale-105' : 'border-neutral-700 bg-neutral-900 opacity-60'}`}>
                                                                <div className={`w-full h-full rounded-full flex items-center justify-center ${f.id === 'normal' ? 'bg-neutral-800' : 'bg-amber-500/20'}`}>
                                                                    {f.id === 'normal'
                                                                        ? <VideoOff size={20} className="text-gray-300" />
                                                                        : f.id === 'casco'
                                                                            ? <HardHat size={20} className="text-amber-400" />
                                                                            : <Trophy size={20} className="text-amber-400" />}
                                                                </div>
                                                            </div>
                                                            <span className={`text-[10px] font-bold ${filtroSeleccionado.id === f.id ? 'text-white' : 'text-gray-400'}`}>{f.nombre}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {!fotoCapturadaDataUrl ? (
                                            <div className="shrink-0 flex items-center justify-center px-8 py-6 bg-black z-30">
                                                <button type="button" onClick={capturarDesdeVideo} disabled={camaraIniciando} className="w-18 h-18 rounded-full border-4 border-white flex items-center justify-center p-1 cursor-pointer disabled:opacity-40 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                                                    <div className="w-full h-full bg-white rounded-full" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="shrink-0 bg-black px-6 py-6 space-y-4 border-t border-neutral-900 z-30">
                                                <input type="text" maxLength={60} value={data.titulo} onChange={(e) => setData('titulo', e.target.value)} placeholder="Título (opcional)..." className="w-full p-3 bg-neutral-900 border-neutral-800 rounded-lg text-white text-sm" />
                                                {errorGuardar && <p role="alert" className="text-sm text-red-400">{errorGuardar}</p>}
                                                <div className="flex gap-3 pt-2">
                                                    <button type="button" onClick={() => { setErrorGuardar(''); setFotoCapturadaDataUrl(null); }} disabled={guardando} className="flex-1 py-3.5 bg-neutral-900 text-white font-bold text-xs uppercase rounded-lg">Repetir</button>
                                                    <button type="submit" disabled={guardando} className="flex-1 py-3.5 bg-white text-black font-black text-xs uppercase rounded-lg">{guardando ? 'Guardando...' : 'Guardar recuerdo'}</button>
                                                </div>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                ) : null}

            </div>
        </AppLayout>
    );
}