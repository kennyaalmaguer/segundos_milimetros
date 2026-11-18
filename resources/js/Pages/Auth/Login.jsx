import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import { Home, UserPlus } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <AppLayout title="Iniciar Sesión - Segundos y Milímetros">
            <div className="bg-[#0a1128] min-h-[85vh] relative flex items-center justify-center px-4 py-20 overflow-hidden">
                <div 
                    className="absolute inset-0 opacity-[0.10] pointer-events-none z-0"
                    style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '24px 24px' }}
                />
                
                <div 
                    className="absolute inset-0 opacity-[0.08] pointer-events-none z-0"
                    style={{ backgroundImage: 'url("/images/logo1.png")', backgroundRepeat: 'repeat', backgroundSize: '180px 180px' }}
                />

                <div className="relative z-10 w-full max-w-md pt-16">
                    <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-32 h-32 flex items-center justify-center drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    >
                        <img 
                            src="/images/logo2.png" 
                            alt="Logo Principal" 
                            className="w-full h-full object-contain filter drop-shadow-[0_5px_15px_rgba(220,38,38,0.7)]"
                        />
                    </motion.div>

                    <motion.div 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#131c36] text-white shadow-2xl rounded-sm overflow-hidden border-t-8 border-red-600 border-x border-b border-blue-900 pt-10"
                    >
                        <div className="bg-[#0a1128] px-8 pt-8 pb-6 text-center border-b-4 border-blue-900/50">
                            <h2 className="text-2xl font-black italic text-white uppercase tracking-widest mt-2">
                                Acceso <span className="text-red-500">Aficionados</span>
                            </h2>
                        </div>
                        
                        <form onSubmit={submit} className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-wider">
                                    Correo Electrónico
                                </label>
                                <input 
                                    type="email" 
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full p-4 bg-[#0a1128] border-2 border-blue-900/60 focus:border-red-600 focus:outline-none rounded-sm font-bold text-white placeholder-gray-500 transition-colors text-sm"
                                    placeholder="aficionado@liga.mx"
                                    required
                                />
                                {errors.email && <span className="text-red-500 text-xs font-bold mt-2 block">{errors.email}</span>}
                            </div>
                            
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-wider">
                                    Contraseña
                                </label>
                                <input 
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full p-4 bg-[#0a1128] border-2 border-blue-900/60 focus:border-red-600 focus:outline-none rounded-sm font-bold text-white placeholder-gray-500 transition-colors text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && <span className="text-red-500 text-xs font-bold mt-2 block">{errors.password}</span>}
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full bg-red-700 text-white font-black italic tracking-widest uppercase py-4 rounded-sm hover:bg-red-600 transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] mt-4 cursor-pointer disabled:opacity-50"
                            >
                                Entrar al Estadio
                            </button>

                            <div className="flex flex-col gap-4 pt-6 border-t border-blue-900/50 mt-6 text-center">
                                <div>
                                    <span className="text-gray-400 text-xs font-bold">¿Aún no tienes tu abono digital? </span>
                                    <Link href={route('register')} className="inline-flex items-center text-red-500 hover:text-red-400 text-xs font-black uppercase tracking-wider ml-1">
                                        <UserPlus size={14} className="mr-1" /> Regístrate
                                    </Link>
                                </div>
                                
                                <Link href={route('welcome')} className="inline-flex items-center justify-center text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors">
                                    <Home size={14} className="mr-2" /> Volver al Inicio
                                </Link>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </AppLayout>
    );
}