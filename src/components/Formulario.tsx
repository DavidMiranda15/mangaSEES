import { useState, useEffect } from "react"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { es } from 'date-fns/locale/es'
import { useMangaStore } from "../types/store"
import type { DraftManga } from "../types"
import { toast } from 'react-hot-toast';

registerLocale('es', es)

const Formulario = () => {

    const { addManga, activeId, mangas, updateManga, getMangaById, clearMangaSeleccionado } = useMangaStore()

    const initialState: DraftManga = {
        nombre: '',
        cliente: '',
        fechaInicio: '',
        fechaFin: '',
        descripcion: ''
    }

    const [manga, setManga] = useState<DraftManga>(initialState)

    useEffect(() => {
        if (activeId) {
            const mangaEdit = mangas.find(m => m.id === activeId)
            if (mangaEdit) {
                setManga({
                    nombre: mangaEdit.nombre,
                    cliente: mangaEdit.cliente,
                    fechaInicio: mangaEdit.fechaInicio,
                    fechaFin: mangaEdit.fechaFin,
                    descripcion: mangaEdit.descripcion
                })
            }
        }
    }, [activeId, mangas])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setManga({
            ...manga,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const fechaSalida = new Date(manga.fechaInicio);
        const fechaEntrega = new Date(manga.fechaFin);

        if (fechaSalida > fechaEntrega) {
            toast.error("La fecha de salida no puede ser posterior a la entrega");
            return;
        }

        if (activeId) {
            updateManga(manga);
            toast.success("Renta actualizada correctamente");
        } else {
            addManga(manga);
            toast.success("Manga registrado con éxito");
        }

        clearMangaSeleccionado();
    };

    return (
        <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">
                {activeId ? 'Editar Registro' : 'Nueva Renta'}
            </h2>
            <p className="text-slate-400 mb-8 text-sm">
                {activeId ? 'Modifica los datos de la renta seleccionada' : 'Ingresa los detalles del contrato de manga'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-black text-cyan-500 ml-1">Manga</label>
                        <input
                            id="nombre" type="text" value={manga.nombre} onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                            placeholder="Ej. Chainsaw Man"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-black text-cyan-500 ml-1">Cliente</label>
                        <input
                            id="cliente" type="text" value={manga.cliente} onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                            placeholder="Nombre del usuario"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs uppercase font-black text-cyan-500 ml-1">Periodo de Préstamo</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DatePicker
                            selected={manga.fechaInicio ? new Date(manga.fechaInicio) : null}
                            onChange={(date: Date | null) => setManga({ ...manga, fechaInicio: date ? date.toISOString() : '' })}
                            placeholderText="Fecha de salida"
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none"
                            locale="es" dateFormat="dd/MM/yyyy"
                        />
                        <DatePicker
                            selected={manga.fechaFin ? new Date(manga.fechaFin) : null}
                            onChange={(date: Date | null) => setManga({ ...manga, fechaFin: date ? date.toISOString() : '' })}
                            minDate={manga.fechaInicio ? new Date(manga.fechaInicio) : undefined}
                            placeholderText="Fecha de retorno"
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none"
                            locale="es" dateFormat="dd/MM/yyyy"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs uppercase font-black text-cyan-500 ml-1">Notas Adicionales</label>
                    <textarea
                        id="descripcion" value={manga.descripcion} onChange={handleChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white h-24 resize-none outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg ${activeId
                        ? 'bg-orange-600 hover:bg-orange-500 shadow-orange-900/20'
                        : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/20'
                        }`}
                >
                    {activeId ? 'Guardar Cambios' : 'Confirmar y Registrar'}
                </button>
            </form>
        </div>
    )
}

export default Formulario