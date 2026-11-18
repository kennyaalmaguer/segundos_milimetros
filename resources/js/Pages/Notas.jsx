import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import { ChevronDown, Globe, MapPin, ArrowRight } from 'lucide-react';

const historiaMundial = [
    {
        year: '1845',
        title: 'Reglas de Knickerbocker',
        desc: 'Alexander Cartwright establece las bases del béisbol moderno, definiendo el diamante de 90 pies y los 3 strikes.'
    },
    {
        year: '1869',
        title: 'Profesionalismo Puro',
        desc: 'Nacen los Cincinnati Red Stockings, el primer equipo en la historia donde todos sus jugadores cobraban un salario.'
    },
    {
        year: '1903',
        title: 'La Primera Serie Mundial',
        desc: 'Boston Americans y Pittsburgh Pirates se enfrentan en la primera serie de campeonato unificada del béisbol.'
    },
    {
        year: '1947',
        title: 'Rompiendo Barreras',
        desc: 'Jackie Robinson debuta con los Brooklyn Dodgers, derribando la barrera de color en las Grandes Ligas.'
    },
    {
        year: '1973',
        title: 'El Bateador Designado',
        desc: 'La Liga Americana introduce la figura del bateador designado, cambiando para siempre la estrategia ofensiva.'
    },
    {
        year: '2006',
        title: 'Clásico Mundial',
        desc: 'Se celebra la primera edición del World Baseball Classic, globalizando el deporte al máximo nivel competitivo.'
    },
    {
        year: '2023',
        title: 'Evolución del Juego',
        desc: 'Se implementa el reloj de pitcheo y nuevas bases, acelerando el ritmo y exigiendo a los atletas al milímetro.'
    }
];

const historiaMexico = [
    {
        year: '1877',
        title: 'El Primer Pitchazo',
        desc: 'El béisbol ingresa a México por los puertos y fronteras, con registros de los primeros juegos en Guaymas y Nuevo Laredo.'
    },
    {
        year: '1925',
        title: 'Nace la LMB',
        desc: 'Alejandro Aguilar Reyes "Fray Nano" funda la Liga Mexicana de Béisbol, estructurando el deporte profesional en el país.'
    },
    {
        year: '1939',
        title: 'El Imperio del Norte',
        desc: 'Se fundan los Sultanes de Monterrey, la franquicia de mayor tradición y el inicio del dominio norteño.'
    },
    {
        year: '1946',
        title: 'La Época de Oro',
        desc: 'Los hermanos Pasquel atraen a estrellas de Ligas Mayores y Ligas Negras a México, elevando el nivel de la liga a calibre mundial.'
    },
    {
        year: '1955',
        title: 'La Guerra Civil',
        desc: 'Inicia la legendaria rivalidad entre Diablos Rojos del México y Tigres Capitalinos, el clásico que definió una era.'
    },
    {
        year: '1981',
        title: 'Valenzuelamanía',
        desc: 'El fenómeno de Fernando Valenzuela explota a nivel mundial, inspirando a generaciones enteras de peloteros mexicanos.'
    },
    {
        year: '2026',
        title: 'La Nueva Era',
        desc: 'La Liga MX Norte redefine el estándar, fusionando tradición y tecnología en un espectáculo de máxima exigencia.'
    }
];

export default function Notas() {
    return (
        <AppLayout title="Historia - Segundos y Milímetros">
            
            <div className="bg-[#0a1128] min-h-screen relative overflow-hidden pb-24">
                
                <div 
                    className="absolute inset-0 opacity-[0.10] pointer-events-none z-0"
                    style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '24px 24px' }}
                />

                <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                    <img 
                        src="/images/logo1.png" 
                        alt="Fondo" 
                        className="w-[85vw] max-w-4xl object-contain opacity-5 filter grayscale contrast-200"
                    />
                </div>

                <section className="relative h-[45vh] bg-transparent flex flex-col items-center justify-center overflow-hidden border-b-8 border-red-700 shadow-2xl z-10">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-25 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a1128] via-[#0a1128]/60 to-transparent" />
                    
                    <div className="relative z-10 text-center px-4 space-y-4">
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="w-20 h-20 md:w-24 md:h-24 mx-auto flex items-center justify-center"
                        >
                            <img 
                                src="/images/logo2.png" 
                                alt="Logo 2" 
                                className="w-full h-full object-contain filter drop-shadow-[0_5px_15px_rgba(220,38,38,0.6)]"
                            />
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white drop-shadow-2xl"
                        >
                            El Origen del <span className="text-red-600">Juego</span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-gray-300 font-bold tracking-widest uppercase text-xs md:text-sm flex items-center justify-center gap-2"
                        >
                            Desliza para explorar la historia <ChevronDown className="animate-bounce text-red-500" />
                        </motion.p>
                    </div>
                </section>

                <main className="relative z-10 space-y-24 pt-16">
                    
                    <section className="w-full">
                        <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12">
                            <div className="inline-flex items-center gap-2 bg-blue-900/50 text-blue-400 px-4 py-1.5 rounded-sm font-black text-xs uppercase tracking-widest border border-blue-800 mb-4">
                                <Globe size={16} /> Béisbol Mundial
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white tracking-tighter">
                                Historia del <span className="text-red-500">Diamante</span>
                            </h2>
                            <p className="text-gray-400 font-bold mt-4 max-w-2xl leading-relaxed text-sm md:text-base">
                                Desde las primeras reglas escritas hasta la globalización del deporte. Un recorrido por los momentos que forjaron la disciplina, la estrategia y el espíritu competitivo que hoy conocemos.
                            </p>
                        </div>

                        <div className="relative w-full overflow-hidden">
                            <div className="absolute top-1/2 left-0 right-0 h-1 md:h-2 bg-red-700 -translate-y-1/2 shadow-[0_0_15px_rgba(220,38,38,0.5)] z-0" />
                            
                            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 py-12 scrollbar-none relative z-10 [&::-webkit-scrollbar]:hidden">
                                {historiaMundial.map((item, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="snap-center shrink-0 w-[85vw] md:w-100 bg-[#131c36] p-6 shadow-2xl relative group border-t-4 border-blue-900 flex flex-col"
                                    >
                                        <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-red-600" />
                                        
                                        <div className="absolute -top-4 -right-4 text-[#0a1128] opacity-30 font-black text-8xl italic select-none pointer-events-none">
                                            {item.year.slice(-2)}
                                        </div>

                                        <div className="relative z-10 flex-1">
                                            <span className="text-red-500 font-black text-5xl italic tracking-tighter drop-shadow-md block mb-2">
                                                {item.year}
                                            </span>
                                            <h3 className="text-white text-xl font-black uppercase mb-3">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-300 font-bold text-sm leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>

                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-[repeating-linear-gradient(45deg,#fff_0,#fff_2px,transparent_2px,transparent_8px)] pointer-events-none" />
                                    </motion.div>
                                ))}
                                <div className="snap-center shrink-0 w-12 md:w-24 flex items-center justify-center">
                                    <ArrowRight className="text-red-500 animate-pulse" size={32} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="w-full">
                        <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12">
                            <div className="inline-flex items-center gap-2 bg-red-900/50 text-red-400 px-4 py-1.5 rounded-sm font-black text-xs uppercase tracking-widest border border-red-800 mb-4">
                                <MapPin size={16} /> Béisbol Mexicano
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white tracking-tighter">
                                Pelota <span className="text-red-500">Nacional</span>
                            </h2>
                            <p className="text-gray-400 font-bold mt-4 max-w-2xl leading-relaxed text-sm md:text-base">
                                La pasión inquebrantable de México por el rey de los deportes. Historias de rivalidades históricas, ídolos inmortales y la evolución de una liga que paraliza estadios de norte a sur.
                            </p>
                        </div>

                        <div className="relative w-full overflow-hidden">
                            <div className="absolute top-1/2 left-0 right-0 h-1 md:h-2 bg-blue-800 -translate-y-1/2 shadow-[0_0_15px_rgba(30,58,138,0.5)] z-0" />
                            
                            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 py-12 scrollbar-none relative z-10 [&::-webkit-scrollbar]:hidden">
                                {historiaMexico.map((item, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="snap-center shrink-0 w-[85vw] md:w-100 bg-white p-6 shadow-2xl relative group border-t-4 border-red-700 flex flex-col"
                                    >
                                        <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-blue-900" />
                                        
                                        <div className="absolute -top-4 -right-4 text-gray-200 opacity-50 font-black text-8xl italic select-none pointer-events-none">
                                            {item.year.slice(-2)}
                                        </div>

                                        <div className="relative z-10 flex-1">
                                            <span className="text-blue-900 font-black text-5xl italic tracking-tighter drop-shadow-sm block mb-2">
                                                {item.year}
                                            </span>
                                            <h3 className="text-[#0a1128] text-xl font-black uppercase mb-3">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 font-bold text-sm leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>

                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-[repeating-linear-gradient(45deg,#000_0,#000_2px,transparent_2px,transparent_8px)] pointer-events-none" />
                                    </motion.div>
                                ))}
                                <div className="snap-center shrink-0 w-12 md:w-24 flex items-center justify-center">
                                    <ArrowRight className="text-blue-900 animate-pulse" size={32} />
                                </div>
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </AppLayout>
    );
}