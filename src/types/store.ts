import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Manga, DraftManga } from '../types/index';

interface MangaState {
    mangas: Manga[];
    activeId: Manga['id'];
    addManga: (data: DraftManga) => void;
    deleteManga: (id: Manga['id']) => void;
    getMangaById: (id: Manga['id']) => void;
    updateManga: (data: DraftManga) => void;
    clearMangaSeleccionado: () => void;
}

export const useMangaStore = create<MangaState>()(
    persist(
        (set) => ({
            mangas: [],
            activeId: '',

            addManga: (data) => {
                const newManga = { ...data, id: uuidv4() };
                set((state) => ({
                    mangas: [...state.mangas, newManga]
                }));
            },

            deleteManga: (id) => {
                set((state) => ({
                    mangas: state.mangas.filter(manga => manga.id !== id)
                }));
            },

            getMangaById: (id) => {
                set(() => ({
                    activeId: id
                }));
            },

            updateManga: (data) => {
                set((state) => ({
                    mangas: state.mangas.map(manga =>
                        manga.id === state.activeId ? { ...data, id: state.activeId } : manga
                    ),
                    activeId: ''
                }));
            },

            clearMangaSeleccionado: () => {
                set(() => ({
                    activeId: ''
                }));
            }
        }),
        {
            name: 'manga-storage'
        }
    )
);