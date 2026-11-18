import { Head } from '@inertiajs/react';
import { Trophy, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';

// Datos estáticos temporales (Standing de Béisbol)
const standings = [
    { rank: 1, equipo: 'Sultanes de Monterrey', g: 45, p: 25, pct: '.643', jv: '-', racha: '3G' },
    { rank: 2, equipo: 'Toros de Tijuana', g: 42, p: 28, pct: '.600', jv: '3.0', racha: '1P' },
    { rank: 3, equipo: 'Acereros de Monclova', g: 39, p: 31, pct: '.557', jv: '6.0', racha: '2G' },
    { rank: 4, equipo: 'Algodoneros de U. Laguna', g: 36, p: 34, pct: '.514', jv: '9.0', racha: '4P' },
    { rank: 5, equipo: 'Saraperos de Saltillo', g: 33, p: 37, pct: '.471', jv: '12.0', racha: '1G' },
    { rank: 6, equipo: 'Tecos de los Dos Laredos', g: 30, p: 40, pct: '.429', jv: '15.0', racha: '2P' },
];

export default function Estadisticas() {
    return (
        <AppLayout title="Estadísticas - Liga MX Norte">
            <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
                
                {/* Encabezado */}
                <div className="bg-[#0a1128] border-l-12 border-red-700 p-6 shadow-2xl mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 opacity-10 scale-150 -translate-y-4">
                        <TrendingUp size={120} className="text-white" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black italic text-white uppercase tracking-wider flex items-center gap-3">
                            <Trophy className="text-red-500" size={32} />
                            Standing Zona Norte
                        </h2>
                        <p className="text-gray-400 font-medium text-sm mt-1 leading-tight">
                            Posiciones actualizadas de la temporada regular. G: Ganados, P: Perdidos, PCT: Porcentaje, JV: Juegos de Ventaja.
                        </p>
                    </div>
                </div>

                {/* Contenedor de la Tabla con Scroll Horizontal para móviles */}
                <div className="bg-white shadow-2xl rounded-sm overflow-hidden border-t-8 border-blue-900">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            
                            {/* Cabecera de la tabla */}
                            <thead>
                                <tr className="bg-[#131c36] text-white border-b-4 border-red-700">
                                    <th className="p-4 font-black italic tracking-wider text-center w-16">#</th>
                                    <th className="p-4 font-black italic tracking-wider">Equipo</th>
                                    <th className="p-4 font-bold text-center text-gray-300">G</th>
                                    <th className="p-4 font-bold text-center text-gray-300">P</th>
                                    <th className="p-4 font-black italic text-center text-red-500">PCT</th>
                                    <th className="p-4 font-bold text-center text-gray-300">JV</th>
                                    <th className="p-4 font-bold text-center text-gray-300">Racha</th>
                                </tr>
                            </thead>
                            
                            {/* Cuerpo de la tabla */}
                            <tbody>
                                {standings.map((equipo, index) => (
                                    <motion.tr 
                                        key={equipo.rank}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.3 }}
                                        className="border-b border-gray-200 hover:bg-red-50 transition-colors even:bg-gray-50 group"
                                    >
                                        <td className="p-4 text-center font-black text-xl text-gray-400 group-hover:text-red-600 transition-colors">
                                            {equipo.rank}
                                        </td>
                                        <td className="p-4 font-bold text-[#0a1128] text-lg uppercase flex items-center gap-2">
                                            {equipo.equipo}
                                            {equipo.rank <= 4 && (
                                                <span className="bg-blue-900 text-white text-[10px] px-2 py-0.5 rounded-full font-bold ml-2">
                                                    PLAYOFFS
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-center font-bold text-gray-700">{equipo.g}</td>
                                        <td className="p-4 text-center font-bold text-gray-700">{equipo.p}</td>
                                        <td className="p-4 text-center font-black text-red-700 text-lg">{equipo.pct}</td>
                                        <td className="p-4 text-center font-bold text-gray-500">{equipo.jv}</td>
                                        <td className="p-4 text-center">
                                            <span className={`inline-block px-2 py-1 text-xs font-black rounded-sm ${equipo.racha.includes('G') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {equipo.racha}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>

                {/* Nota inferior para guiar al usuario en móviles */}
                <div className="mt-4 flex items-center justify-end text-sm text-gray-500 font-bold md:hidden">
                    Desliza la tabla <ChevronRight size={16} className="animate-pulse ml-1 text-red-500" />
                </div>
                
            </div>
        </AppLayout>
    );
}