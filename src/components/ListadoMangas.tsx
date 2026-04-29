import { useMangaStore } from "../types/store"
import { DownloadPDF } from "./MangaPDF";
import { generateMangaDocx } from "../utils/generateDocx";
import { toast } from 'react-hot-toast';

interface ListadoMangasProps {
    setVista: (vista: 'registro' | 'consulta') => void
}

const ListadoMangas = ({ setVista }: ListadoMangasProps) => {
    const { mangas, deleteManga, getMangaById } = useMangaStore()

    const formatearFecha = (fecha: string) => {
        if (!fecha) return "-";
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(nuevaFecha);
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-5">
            {mangas.length ? (
                <div className="bg-slate-800 shadow-2xl rounded-xl overflow-hidden border border-slate-700">
                    <table className="w-full text-left border-collapse table-fixed">
                        <thead className="bg-slate-900 border-b border-slate-700">
                            <tr>
                                <th className="p-4 text-cyan-500 uppercase font-black text-xs w-1/4">Información Renta</th>
                                <th className="p-4 text-cyan-500 uppercase font-black text-xs w-1/3">Notas / Descripción</th>
                                <th className="p-4 text-cyan-500 uppercase font-black text-xs w-1/6 text-center">Salida</th>
                                <th className="p-4 text-cyan-500 uppercase font-black text-xs w-1/6 text-center">Entrega</th>
                                <th className="p-4 w-40 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {mangas.map((manga) => (
                                <tr key={manga.id} className="hover:bg-slate-700/30 transition-colors">

                                    <td className="p-4">
                                        <div className="text-white font-bold text-lg leading-tight truncate">
                                            {manga.nombre}
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                                                Cliente
                                            </span>
                                            <span className="text-sm text-slate-400 truncate">
                                                {manga.cliente}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <p className="text-xs text-slate-400 italic leading-relaxed break-words line-clamp-3">
                                            {manga.descripcion || "Sin observaciones"}
                                        </p>
                                    </td>

                                    <td className="p-4 text-center">
                                        <span className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 text-sm text-slate-200 font-medium">
                                            {formatearFecha(manga.fechaInicio)}
                                        </span>
                                    </td>

                                    <td className="p-4 text-center">
                                        <span className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 text-sm text-cyan-400 font-bold">
                                            {formatearFecha(manga.fechaFin)}
                                        </span>
                                    </td>

                                    <td className="p-4 text-right">
                                        <div className="flex justify-end items-center gap-2">

                                            <div className="flex gap-1 bg-slate-900/50 p-1 rounded-lg border border-slate-700">
                                                <div className="bg-red-500/10 text-red-500 px-2 py-1 rounded hover:bg-red-500/20 text-[10px] font-black cursor-pointer transition-colors">
                                                    <DownloadPDF manga={manga} />
                                                </div>
                                                <button
                                                    onClick={() => generateMangaDocx(manga)}
                                                    className="bg-blue-500/10 text-blue-500 px-2 py-1 rounded hover:bg-blue-500/20 text-[10px] font-black transition-colors"
                                                >
                                                    DOCX
                                                </button>
                                            </div>

                                            <div className="flex gap-0.5">
                                                <button
                                                    onClick={() => {
                                                        getMangaById(manga.id)
                                                        setVista('registro')
                                                    }}
                                                    className="text-cyan-400 hover:text-cyan-500 p-2 rounded-lg hover:bg-cyan-500/10 transition-all"
                                                    title="Editar"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        if (confirm('¿Deseas eliminar esta renta?'))
                                                            deleteManga(manga.id);
                                                        toast.error('Registro eliminado', { icon: '🗑️' });
                                                    }}
                                                    className="text-red-400/50 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition-all"
                                                    title="Eliminar"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-800 rounded-xl border border-dashed border-slate-700">
                    <p className="text-slate-400 text-xl font-light">No hay registros de rentas actualmente</p>
                </div>
            )}
        </div>
    )
}

export default ListadoMangas