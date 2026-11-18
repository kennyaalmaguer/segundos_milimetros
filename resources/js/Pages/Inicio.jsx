import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Star,
    ShieldAlert,
    Zap,
    Camera
} from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';

export default function Inicio({ recuerdos = [], stickers = [] }) {
    const { auth } = usePage().props;
    const usuario = auth?.user?.name || 'Aficionado';

    const totalDesbloqueados = Array.isArray(stickers) 
        ? stickers.filter(s => s && s.unlocked !== false).length 
        : Object.keys(stickers || {}).length;
        
    const porcentajeProgreso = Math.round((totalDesbloqueados / 12) * 100);

    return (
        <AppLayout title="Resumen de Hoy - Segundos y Milímetros">
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
                
                {/* SALUDO */}
                <div className="bg-white p-6 border-l-8 border-red-700 shadow-xl rounded-sm">
                    <h2 className="text-2xl md:text-3xl font-black uppercase text-[#0a1128]">
                        ¡Qué onda, <span className="italic text-red-600">{usuario}</span>!
                    </h2>
                    <p className="text-gray-500 font-bold text-sm mt-1">Este es tu resumen diario de la Liga MX Norte.</p>
                </div>

                {/* WIDGETS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#0a1128] rounded-sm shadow-xl p-6 relative overflow-hidden border-t-4 border-blue-900">
                        <div className="absolute top-0 right-0 opacity-10">
                            <Zap size={100} className="text-white -translate-y-4 translate-x-4" />
                        </div>
                        <h3 className="text-red-500 font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                            <ShieldAlert size={16} /> Juego Destacado de Hoy
                        </h3>
                        <div className="flex justify-between items-center bg-[#131c36] p-4 rounded-sm border border-blue-900/50">
                            <div className="text-center">
                                <span className="block text-2xl font-black text-white italic">SUL</span>
                                <span className="text-xs text-gray-400 font-bold uppercase">Mty</span>
                            </div>
                            <div className="text-center px-4">
                                <span className="block text-red-500 font-black">VS</span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase">19:30 HRS</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-2xl font-black text-white italic">TOR</span>
                                <span className="text-xs text-gray-400 font-bold uppercase">Tij</span>
                            </div>
                        </div>
                        <Link href="/estadisticas" className="block text-center w-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm py-3 mt-4 rounded-sm transition">
                            Ver Predicciones
                        </Link>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-sm shadow-xl p-6 border-t-4 border-red-700">
                        <h3 className="text-blue-900 font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                            <Star size={16} /> Tu Álbum Digital
                        </h3>
                        <div className="flex items-end gap-4 mb-2">
                            <span className="text-5xl font-black italic text-[#0a1128] leading-none">{totalDesbloqueados}</span>
                            <span className="text-gray-400 font-bold text-xl leading-snug">/ 12</span>
                        </div>
                        <p className="text-gray-500 text-sm font-bold mb-6">
                            {totalDesbloqueados === 0 ? 'Tarjetas descubiertas. ¡Aún te faltan muchas por escanear!' : `¡Excelente! Tienes ${totalDesbloqueados} tarjetas registradas.`}
                        </p>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
                            <div className="bg-red-600 h-2 rounded-full transition-all duration-500" style={{ width: `${Math.max(porcentajeProgreso, 5)}%` }} />
                        </div>

                        <Link href="/colecciones" className="block text-center w-full bg-red-700 hover:bg-red-600 text-white font-black italic uppercase text-sm py-3 rounded-sm transition shadow-md">
                            Ir al Escáner
                        </Link>
                    </motion.div>
                </div>

                {/* VISTA RÁPIDA DE RECUERDOS (SOLO PREVIEW Y ENLACE AL APARTADO COMPLETO) */}
                <div className="bg-white rounded-sm shadow-xl p-6 md:p-8 border-t-8 border-blue-900 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4">
                        <div>
                            <h3 className="text-2xl font-black italic uppercase text-[#0a1128] flex items-center gap-2">
                                <Camera className="text-red-600" size={24} /> Últimos Recuerdos
                            </h3>
                            <p className="text-gray-500 font-bold text-xs md:text-sm">
                                Tus momentos más recientes guardados en el estadio.
                            </p>
                        </div>
                        <Link 
                            href="/recuerdos"
                            className="inline-flex items-center gap-2 bg-[#0a1128] hover:bg-blue-950 text-white font-black italic uppercase text-xs px-6 py-3 rounded-sm transition shadow-md cursor-pointer"
                        >
                            Ver Álbum Completo →
                        </Link>
                    </div>

                    {recuerdos.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-sm p-8 text-center space-y-2 bg-gray-50">
                            <Camera size={36} className="mx-auto text-gray-400" />
                            <p className="font-black italic uppercase text-[#0a1128] text-sm">Aún no tienes recuerdos guardados</p>
                            <p className="text-gray-500 text-xs font-medium">
                                Visita el apartado completo de recuerdos para tomar tus fotos con la copa AR.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {recuerdos.slice(0, 2).map((foto) => (
                                <div key={foto.id} className="bg-[#e4e5e8] p-3 rounded-sm shadow-md border-2 border-gray-300 flex flex-col justify-between">
                                    <div className="relative h-48 overflow-hidden rounded-sm bg-black mb-3">
                                        <img
                                            src={foto.imagen_url}
                                            alt={foto.titulo}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="px-1 pb-1 space-y-1">
                                        <p className="font-black italic uppercase text-[#0a1128] text-sm truncate">
                                            {foto.titulo}
                                        </p>
                                        {foto.descripcion && (
                                            <p className="text-xs text-gray-700 font-medium line-clamp-1">
                                                {foto.descripcion}
                                            </p>
                                        )}
                                        <div className="pt-1 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest border-t border-gray-300">
                                            <span>{foto.fecha}</span>
                                            <span className="text-red-700">{foto.filtro}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </AppLayout>
    );
}