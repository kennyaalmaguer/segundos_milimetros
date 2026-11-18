import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { MapPin, Calendar, Users, Shield } from 'lucide-react';

export default function Equipos({ equipos }) {
    return (
        <AppLayout title="Equipos Zona Norte - Liga MX Norte">
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
                
                <div className="bg-[#0a1128] border-l-[12px] border-red-700 p-6 shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-wider">
                        Franquicias Zona Norte
                    </h2>
                    <p className="text-gray-400 font-medium text-sm mt-1">
                        Conoce a los protagonistas que dominan el diamante en la región norteña.
                    </p>
                </div>

                <div className="space-y-4">
                    {equipos.map((equipo) => (
                        <div 
                            key={equipo.id} 
                            className="group relative bg-[#0a1128] text-white shadow-2xl overflow-hidden border-r-8 border-red-700 transition-transform duration-300 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${equipo.imagen})` }} />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1128] via-[#0a1128]/90 to-transparent" />

                            <div className="relative z-10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-700/80 rounded-sm">
                                            <Shield size={24} className="text-white" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-wide">
                                            {equipo.nombre}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 pt-2 text-sm text-gray-300 font-medium">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-red-500 shrink-0" />
                                            <span>Fundado: <strong className="text-white">{equipo.fundacion}</strong></span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-red-500 shrink-0" />
                                            <span>Estadio: <strong className="text-white">{equipo.estadio}</strong></span>
                                        </div>

                                        <div className="col-span-full flex items-center gap-2 pt-1">
                                            <Users size={16} className="text-blue-400 shrink-0" />
                                            <span>Roster Key: <strong className="text-blue-200">{equipo.rosterKey}</strong></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="self-start md:self-center">
                                    <button className="bg-red-700 hover:bg-red-600 text-white px-5 py-3 rounded-sm font-black italic tracking-wider text-sm transition-colors shadow-lg uppercase">
                                        + Info
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-[#0a1128] text-white p-4 text-center font-black italic tracking-widest uppercase border-t-4 border-red-700 shadow-xl">
                    Total Equipos Zona Norte | {equipos.length}
                </div>

            </div>
        </AppLayout>
    );
}