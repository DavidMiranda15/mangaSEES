export interface Manga {
    id: string;
    nombre: string;
    cliente: string;
    fechaInicio: string;
    fechaFin: string;
    descripcion: string;
}

export type DraftManga = Omit<Manga, 'id'>;