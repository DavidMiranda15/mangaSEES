import sbrLogo from '../assets/SEES.png'
import ridersImg from '../assets/MOON.png'

const About = () => {
    const rickRollUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${rickRollUrl}`;

    return (
        <div className="w-full max-w-5xl mx-auto p-4 animate-fadeIn">
            <div 
                className="relative text-slate-900 rounded-lg shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border-4 border-black overflow-hidden font-mono min-h-[600px]"
                style={{ backgroundColor: '#AEE6ED' }}
            >
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img 
                        src={ridersImg} 
                        alt="Moon Background" 
                        className="w-full h-full object-cover opacity-70 grayscale mix-blend-multiply" 
                    />
                </div>
                <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="relative z-10 flex flex-col md:flex-row bg-transparent">

                    <div className="p-8 md:w-2/5 border-b-4 md:border-b-0 md:border-r-4 border-black bg-white/40 backdrop-blur-sm">
                        <div className="mb-10 pb-6 border-b-2 border-black">
                            <p className="text-xs font-black text-slate-700 tracking-widest"> Take your heart</p>
                            <h2 className="text-5xl font-black tracking-tighter text-black leading-none mt-2">
                                Escanea<br/>El<br/>QR
                            </h2>
                            <div className="mt-4 bg-black text-white px-3 py-1 inline-block text-[10px] font-bold uppercase">
                            </div>
                        </div>

                        <div className="bg-white p-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center group">
                            <p className="text-[10px] font-black uppercase mb-2 italic tracking-tighter"></p>
                            <div className="relative inline-block p-1 bg-white border border-slate-200">
                                <img src={qrCode} alt="QR Code" className="w-36 h-36 grayscale group-hover:grayscale-0 transition-all" />
                                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                                    <p className="text-cyan-400 font-black text-sm italic text-center"><br/></p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="p-8 flex-1 flex flex-col justify-between bg-transparent">
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-4xl font-black text-black tracking-tighter uppercase leading-none">
                                        SEES<br/>Tu pagina de mangas de confianza
                                    </h1>
                                    <p className="text-sm font-bold text-cyan-900 mt-2 italic underline decoration-2"></p>
                                </div>
                                <div className="bg-white p-1 border-2 border-black rounded-full overflow-hidden w-20 h-20 flex items-center justify-center shadow-lg">
                                    <img src={sbrLogo} alt="Logo SEES" className="w-full h-full object-contain" />
                                </div>
                            </div>

                            <section className="mb-8 bg-white/80 p-5 border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] backdrop-blur-sm">
                                <h3 className="font-black text-xs text-white bg-black px-2 py-0.5 inline-block mb-3 italic">
                                    Sinopsis de la pagina:
                                </h3>
                                <p className="text-[13px] leading-relaxed text-slate-900 text-justify font-bold">
                                    "A la medianoche, cuando el mundo se detiene en la Dark Hour, solo el registro prevalece. MangaSEES no es una simple lista; es el revólver cargado que dicta el destino de cada tomo en este inventario. ¿Acaso creías que el orden era una casualidad? Este sistema es la Rotación Perfecta necesaria para invocar una biblioteca que no conoce el error. Si no tienes la voluntad de apretar el gatillo y tomar el control de tu colección, mejor retírate. Aquí, la única respuesta es la eficiencia absoluta... o el olvido."
                                </p>
                            </section>

                            <div className="grid grid-cols-2 gap-4 border-t-2 border-black/20 pt-4 bg-white/20 p-2 rounded">
                                <div className="text-[11px] font-black">
                                    <p className="text-slate-700 uppercase text-[9px] mb-1 tracking-widest"></p>
                                </div>
                                <div className="text-[11px] font-black">
                                    <p className="text-slate-700 uppercase text-[9px] mb-1 tracking-widest"></p>
                                </div>
                            </div>
                        </div>

        
                        <div className="mt-8 flex justify-between items-end border-t-2 border-black pt-4">
                            <div className="text-[8px] font-black text-slate-700 leading-tight uppercase">
                                © 2026 DAVID MIRANDA <br/>
                                ALL RIGHTS RESERVED
                            </div>
                            
                            <div className="text-3xl font-black italic text-black/20 uppercase tracking-tighter">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;