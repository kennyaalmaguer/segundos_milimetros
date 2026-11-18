import { Head, Link, router, usePage } from '@inertiajs/react';
import { Menu, Shield, FileText, BarChart3, Trophy, HelpCircle, Gamepad2, LogOut, TrendingUp } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function AppLayout({ title, children }) {
    const { auth } = usePage().props;
    const usuario = auth?.user ? auth.user.name : null;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-[#e4e5e8] font-sans relative flex flex-col">
            <Head title={title} />

            <div 
                className="fixed inset-0 opacity-[0.08] pointer-events-none z-0"
                style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '16px 16px' }}
            />

            <header className="bg-[#0a1128] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 border-b-[6px] border-red-700 shadow-2xl">
                <Sheet>
                    <SheetTrigger className="p-2 border border-red-600 bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-sm cursor-pointer inline-flex items-center justify-center">
                        <Menu size={28} className="text-white" />
                    </SheetTrigger>
                    
                    <SheetContent side="left" className="bg-[#0a1128] border-r-[6px] border-red-700 text-white w-[90%] sm:w-96 overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle className="text-white text-left font-black italic tracking-widest text-2xl border-b-2 border-red-700/50 pb-4">
                                LIGA MX NORTE
                            </SheetTitle>
                        </SheetHeader>
                        
                        <div className="mt-6 space-y-6">
                            {!usuario ? (
                                <div className="space-y-6 flex flex-col h-full">
                                    <div className="bg-[#131c36] p-4 rounded-sm border border-blue-900/50">
                                        <p className="text-sm text-gray-300 font-bold mb-4 leading-relaxed">
                                            Únete a la afición más grande. Desbloquea el Salón de Colecciones, vota por tus jugadores favoritos y accede a estadísticas en tiempo real.
                                        </p>
                                    </div>
                                    <Link 
                                        href="/login"
                                        className="w-full block text-center bg-red-700 hover:bg-red-600 py-4 rounded-sm font-black italic tracking-wider transition-colors shadow-lg text-sm uppercase"
                                    >
                                        INICIAR SESIÓN / REGISTRO
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-6 animate-in fade-in duration-500">
                                    <div className="bg-[#131c36] p-3 rounded-sm border border-blue-900/50 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase">Bienvenido</p>
                                            <p className="text-sm font-black text-white italic">{usuario}</p>
                                        </div>
                                        <button onClick={handleLogout} className="p-2 text-red-400 hover:text-red-500 hover:bg-white/5 rounded-sm transition-colors cursor-pointer" title="Cerrar Sesión">
                                            <LogOut size={20} />
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-xs font-black uppercase tracking-wider text-red-500 mb-2">Secciones Exclusivas</p>
                                        
                                        <Link href="/inicio" className="flex items-center gap-3 p-3 rounded-sm hover:bg-white/10 transition-colors text-white font-bold group">
                                            <TrendingUp size={20} className="text-red-500 group-hover:scale-110 transition-transform" />
                                            <span>Resumen de Hoy</span>
                                        </Link>

                                        <Link href="/equipos" className="flex items-center gap-3 p-3 rounded-sm hover:bg-white/10 transition-colors text-white font-bold group">
                                            <Shield size={20} className="text-red-500 group-hover:scale-110 transition-transform" />
                                            <span>Equipos</span>
                                        </Link>

                                        <Link href="/notas" className="flex items-center gap-3 p-3 rounded-sm hover:bg-white/10 transition-colors text-white font-bold group">
                                            <FileText size={20} className="text-red-500 group-hover:scale-110 transition-transform" />
                                            <span>Notas</span>
                                        </Link>

                                        <Link href="/estadisticas" className="flex items-center gap-3 p-3 rounded-sm hover:bg-white/10 transition-colors text-white font-bold group">
                                            <BarChart3 size={20} className="text-red-500 group-hover:scale-110 transition-transform" />
                                            <span>Estadísticas</span>
                                        </Link>

                                        <Link href="/colecciones" className="flex items-center gap-3 p-3 rounded-sm hover:bg-white/10 transition-colors text-white font-bold group">
                                            <Trophy size={20} className="text-red-500 group-hover:scale-110 transition-transform" />
                                            <span>Salón de las Colecciones</span>
                                        </Link>

                                        <Link href="#" className="flex items-center gap-3 p-3 rounded-sm hover:bg-white/10 transition-colors text-white font-bold group">
                                            <HelpCircle size={20} className="text-red-500 group-hover:scale-110 transition-transform" />
                                            <span>Quiz</span>
                                        </Link>

                                        <Link href="/juego" className="flex items-center gap-3 p-3 rounded-sm hover:bg-white/10 transition-colors text-white font-bold group">
                                            <Gamepad2 size={20} className="text-red-500 group-hover:scale-110 transition-transform" />
                                            <span>Juegos</span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
                
                <h1 className="text-xl font-black italic tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
                    LIGA MX NORTE
                </h1>

                <div className="w-11"></div>
            </header>

            <main className="relative z-10 grow">
                {children}
            </main>

            <footer className="bg-[#0a1128] text-white border-t-8 border-red-700 relative z-20 mt-12">
                <div className="max-w-6xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-black italic tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
                                LIGA MX NORTE
                            </h2>
                            <p className="text-gray-400 text-sm font-medium pr-4">
                                La máxima autoridad del béisbol en el norte. Forjando el futuro en cada inning, donde todo se define en milímetros y segundos.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-red-500 uppercase tracking-widest border-l-4 border-red-600 pl-3">
                                Navegación
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-300 font-medium">
                                <li><Link href="/equipos" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Equipos</Link></li>
                                <li><Link href="/notas" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Notas y Artículos</Link></li>
                                <li><Link href="/estadisticas" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Estadísticas</Link></li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-red-500 uppercase tracking-widest border-l-4 border-red-600 pl-3">
                                Experiencia
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-300 font-medium">
                                <li><Link href="/colecciones" className="hover:text-white transition-colors">Salón de las Colecciones</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Quiz & Trivia</Link></li>
                                <li><Link href="/juego" className="hover:text-white transition-colors">Zona de Juegos</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-blue-900/50 mt-10 pt-6 text-center text-xs text-gray-500 font-medium tracking-wide">
                        &copy; {new Date().getFullYear()} LIGA MX NORTE. TODOS LOS DERECHOS RESERVADOS.
                    </div>
                </div>
            </footer>
        </div>
    );
}