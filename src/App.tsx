import { useState } from "react"
import Formulario from "./components/Formulario"
import ListadoMangas from "./components/ListadoMangas"
import { Toaster } from 'react-hot-toast';
import About from "./components/About";
import { useMangaStore } from "./types/store";


function App() {
  const [activeTab, setActiveTab] = useState<'registro' | 'consulta' | 'about'>('registro')

  return (

    <div className="min-h-screen bg-transparent">
      <Toaster position="top-right" />

      <div className="container mx-auto pt-16 pb-20 bg-transparent">
        <header className="mb-12 text-center">
          <h1 className="font-black text-6xl text-white tracking-tighter drop-shadow-2xl">
            Manga<span className="text-cyan-500">SEES</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium uppercase tracking-widest text-sm">
            Tu página de mangas de confianza
          </p>
        </header>

        <div className="flex justify-center mb-10">
          <div className="bg-slate-800 p-1 rounded-xl flex gap-1 border border-slate-700">

            <button
              onClick={() => {
                useMangaStore.getState().clearMangaSeleccionado();
                setActiveTab('registro');
              }}
              className={`px-8 py-2.5 rounded-lg font-bold text-sm uppercase transition-all ${activeTab === 'registro' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
            >
              Registro
            </button>

            <button
              onClick={() => setActiveTab('consulta')}
              className={`px-8 py-2.5 rounded-lg font-bold text-sm uppercase transition-all ${activeTab === 'consulta' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
            >
              Consulta
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`px-8 py-2.5 rounded-lg font-bold text-sm uppercase transition-all ${activeTab === 'about' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
            >
              About
            </button>
          </div>
        </div>

        <main className="flex justify-center transition-opacity duration-300">
          {activeTab === 'registro' && <Formulario />}

          {activeTab === 'consulta' && <ListadoMangas setVista={setActiveTab} />}

          {activeTab === 'about' && <About />}
        </main>
      </div>
    </div>
  )
}

export default App