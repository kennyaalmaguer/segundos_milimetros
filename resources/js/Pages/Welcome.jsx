import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Scan, TrendingUp, Shield, History, ArrowRight, Zap, Camera } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';

export default function Welcome({ auth }) {
    return (
        <AppLayout auth={auth} title="Bienvenido - Segundos y Milímetros">
            
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-[#0a1128] overflow-hidden px-4 border-b-8 border-red-700 text-center py-24">
                
                <div 
                    className="absolute inset-0 opacity-[0.12] pointer-events-none z-0"
                    style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '24px 24px' }}
                />

                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center filter blur-xs opacity-50 scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128]/70 via-[#0a1128]/50 to-[#0a1128]/85" />
                </div>

                <motion.div 
                    animate={{ opacity: [0, 1, 0, 0, 0.8, 0], scale: [0.8, 1.5, 0.8] }}
                    transition={{ repeat: Infinity, duration: 1.8, times: [0, 0.05, 0.1, 0.6, 0.65, 1], delay: 0.2 }}
                    className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full filter blur-3xl pointer-events-none z-0"
                />
                <motion.div 
                    animate={{ opacity: [0, 0, 0.9, 0, 1, 0], scale: [1, 1.6, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, times: [0, 0.3, 0.35, 0.7, 0.75, 1], delay: 0.8 }}
                    className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl pointer-events-none z-0"
                />
                <motion.div 
                    animate={{ opacity: [0.7, 0, 0, 1, 0, 0.5], scale: [1.2, 0.9, 1.4] }}
                    transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.15, 0.2, 0.5, 0.55, 1], delay: 0.5 }}
                    className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-red-500 rounded-full filter blur-3xl pointer-events-none z-0"
                />
                
                <div className="relative z-10 space-y-8 max-w-5xl mx-auto flex flex-col items-center">
                    
                    <motion.div 
                        initial={{ x: 200, opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        transition={{ type: "spring", stiffness: 70, damping: 14 }}
                        className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center my-2"
                    >
                        <motion.div 
                            animate={{ opacity: [0.1, 1, 0.1, 0.9, 0.2, 1, 0.1], scale: [1, 1.25, 1, 1.15, 1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                            className="absolute inset-0 bg-white/40 rounded-full filter blur-2xl pointer-events-none"
                        />
                        <motion.div
                            animate={{ opacity: [0, 0.8, 0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, times: [0, 0.1, 0.2, 0.4, 1] }}
                            className="absolute -inset-6 bg-red-600/50 rounded-full filter blur-3xl pointer-events-none"
                        />

                        <img 
                            src="/images/logo2.png" 
                            alt="Segundos y Milímetros Logo" 
                            className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.95)] relative z-10"
                        />
                    </motion.div>

                    <motion.div 
                        initial={{ y: 30, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="space-y-4"
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter drop-shadow-2xl">
                            SEGUNDOS Y <span className="text-red-600 drop-shadow-[0_0_35px_rgba(220,38,38,0.9)]">MILÍMETROS</span>
                        </h1>
                        <p className="text-gray-200 font-bold text-lg md:text-2xl max-w-2xl mx-auto tracking-wide pt-2 drop-shadow-md">
                            Donde cada jugada, cada lanzamiento y cada out se define en la máxima exigencia del diamante.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="pt-4"
                    >
                        <Link 
                            href={auth?.user ? '/inicio' : '/login'} 
                            className="inline-flex items-center gap-3 bg-red-700 text-white font-black italic tracking-widest uppercase px-12 py-5 rounded-sm hover:bg-red-600 transition-all transform hover:scale-105 shadow-[0_0_35px_rgba(220,38,38,0.8)]"
                        >
                            <Zap size={22} className="animate-bounce" />
                            {auth?.user ? 'Ir a mi Panel' : 'Ingresar a la Plataforma'}
                        </Link>
                    </motion.div>

                </div>
            </section>

            <div className="w-full flex flex-col">
                
                <section className="relative w-full min-h-[55vh] flex items-center bg-[#0a1128] text-white overflow-hidden border-b-4 border-red-700">
                    <div 
                        className="absolute inset-0 opacity-[0.08] pointer-events-none z-0"
                        style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '24px 24px' }}
                    />
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1592656093955-57c434937b42?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center filter blur-xs opacity-20 scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1128] via-[#0a1128]/90 to-transparent" />
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 bg-blue-900/50 text-blue-400 px-4 py-1.5 rounded-sm font-black text-xs uppercase tracking-widest border border-blue-800">
                                <TrendingUp size={16} /> Rendimiento en Vivo
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
                                Standings y <span className="text-red-500">Estadísticas</span>
                            </h2>
                            <p className="text-gray-300 font-medium text-base md:text-lg leading-relaxed">
                                Consulta el standing general de la Zona Norte, porcentaje de victorias, juegos de ventaja y el seguimiento detallado de cada jornada como un verdadero experto.
                            </p>
                            <div>
                                <Link href={auth?.user ? '/estadisticas' : '/login'} className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white font-black italic uppercase px-8 py-4 rounded-sm shadow-lg transition">
                                    Ver Estadísticas <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative w-full min-h-[50vh] flex items-center bg-white text-[#0a1128] overflow-hidden border-b-4 border-gray-200 py-20 px-6">
                    <div 
                        className="absolute inset-0 opacity-[0.06] pointer-events-none z-0"
                        style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '24px 24px' }}
                    />
                    <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 bg-red-700/10 text-red-700 px-4 py-1.5 rounded-sm font-black text-xs uppercase tracking-widest border border-red-200">
                                <Shield size={16} /> Zona Norte
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-[#0a1128]">
                                Franquicias y <span className="text-red-600">Rosters</span>
                            </h2>
                            <p className="text-gray-600 font-medium text-base md:text-lg leading-relaxed">
                                Explora la historia, estadios emblemáticos y la plantilla de jugadores de los equipos más imponentes que dominan la pelota profesional de la liga.
                            </p>
                            <div>
                                <Link href={auth?.user ? '/equipos' : '/login'} className="inline-flex items-center gap-2 bg-[#0a1128] hover:bg-blue-950 text-white font-black italic uppercase px-8 py-4 rounded-sm shadow-lg transition">
                                    Conocer Equipos <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative w-full min-h-[55vh] flex items-center bg-[#0a1128] text-white overflow-hidden border-b-4 border-red-700">
                    <div 
                        className="absolute inset-0 opacity-[0.08] pointer-events-none z-0"
                        style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '24px 24px' }}
                    />
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519766304817-4f37bda74a29?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center filter blur-xs opacity-20 scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1128] via-[#0a1128]/90 to-transparent" />
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-500 px-4 py-1.5 rounded-sm font-black text-xs uppercase tracking-widest border border-red-800">
                                <Camera size={16} /> Realidad Aumentada
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
                                Salón de las <span className="text-red-500">Colecciones</span>
                            </h2>
                            <p className="text-gray-300 font-medium text-base md:text-lg leading-relaxed">
                                Activa el escáner de la cámara para capturar escudos oficiales en boletos y mercancía, completando los huecos vacíos de tu álbum digital de tarjetas.
                            </p>
                            <div>
                                <Link href={auth?.user ? '/colecciones' : '/login'} className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white font-black italic uppercase px-8 py-4 rounded-sm shadow-lg transition">
                                    Abrir Escáner <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative w-full min-h-[50vh] flex items-center bg-white text-[#0a1128] overflow-hidden border-b-8 border-blue-900 py-20 px-6">
                    <div 
                        className="absolute inset-0 opacity-[0.06] pointer-events-none z-0"
                        style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '24px 24px' }}
                    />
                    <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 bg-blue-900/10 text-blue-900 px-4 py-1.5 rounded-sm font-black text-xs uppercase tracking-widest border border-blue-200">
                                <History size={16} /> Legado y Tradición
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-[#0a1128]">
                                Historia del <span className="text-red-600">Béisbol</span>
                            </h2>
                            <p className="text-gray-600 font-medium text-base md:text-lg leading-relaxed">
                                Viaja a través del tiempo con una línea interactiva que repasa los momentos cumbre, campeonatos históricos y leyendas del diamante.
                            </p>
                            <div>
                                <Link href={auth?.user ? '/inicio' : '/login'} className="inline-flex items-center gap-2 bg-[#0a1128] hover:bg-blue-950 text-white font-black italic uppercase px-8 py-4 rounded-sm shadow-lg transition">
                                    Ver Línea del Tiempo <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            <section className="bg-[#0a1128] py-24 px-6 text-center text-white relative overflow-hidden border-t-8 border-red-700 shadow-2xl">
                <div 
                    className="absolute inset-0 opacity-[0.08] pointer-events-none z-0"
                    style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '24px 24px' }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-red-600/25 via-transparent to-transparent pointer-events-none" />
                
                <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-wider">
                        Vive la Pasión del <span className="text-red-500">Béisbol</span>
                    </h2>
                    <p className="text-gray-300 font-medium text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                        Accede à tu cuenta de aficionado o regístrate en segundos para desbloquear todas las funciones interactivas del prototipo.
                    </p>
                    <div className="pt-4">
                        <Link 
                            href={auth?.user ? '/inicio' : '/login'} 
                            className="inline-block bg-red-700 text-white font-black italic tracking-widest uppercase px-12 py-5 rounded-sm hover:bg-red-600 transition-all shadow-[0_0_30px_rgba(220,38,38,0.8)] transform hover:scale-105"
                        >
                            {auth?.user ? 'Ir a mi Panel' : 'Iniciar Sesión / Registro'}
                        </Link>
                    </div>
                </div>
            </section>

        </AppLayout>
    );
}