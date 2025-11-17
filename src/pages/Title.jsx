import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Heart, Plus, Star } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function TitlePage(){
  const { media, id } = useParams()
  const [data, setData] = useState(null)

  useEffect(()=>{
    const load = async()=>{
      const res = await fetch(`${API}/api/title/${media}/${id}`)
      const json = await res.json()
      setData(json)
    }
    load()
  }, [media, id])

  if(!data) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-16">
        <section className="relative">
          {data.backdrop && (
            <img src={data.backdrop} alt="backdrop" className="w-full h-[50vh] object-cover opacity-60" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-8">
            <div className="flex gap-6">
              {data.poster && (
                <img src={data.poster} alt="poster" className="w-40 sm:w-52 rounded-lg shadow-2xl border border-white/10" />
              )}
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold">{data.title}</h1>
                <p className="text-white/70 mt-1">{data.release_date} • {data.runtime ? `${data.runtime} min` : ''} • {data.genres?.join(', ')}</p>
                <div className="flex items-center gap-4 mt-3">
                  <button className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 flex items-center gap-2"><Heart size={18}/> Like</button>
                  <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 flex items-center gap-2"><Plus size={18}/> Watch Later</button>
                  <button className="px-4 py-2 rounded-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 flex items-center gap-2"><Star size={18}/> Rate</button>
                </div>
                {data.tagline && <p className="mt-4 italic text-white/80">“{data.tagline}”</p>}
                {data.overview && <p className="mt-3 text-white/80 max-w-2xl">{data.overview}</p>}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {data.trailer_key && (
            <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${data.trailer_key}`}
                title="YouTube trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {data.cast?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-3">Cast</h2>
              <div className="grid grid-flow-col auto-cols-[45%] sm:auto-cols-[20%] md:auto-cols-[15%] gap-3 overflow-x-auto hide-scrollbar">
                {data.cast.map(c => (
                  <div key={c.id} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                    {c.profile ? <img src={c.profile} className="w-full h-40 object-cover" /> : <div className="w-full h-40 flex items-center justify-center text-white/50">No Photo</div>}
                    <div className="p-2">
                      <p className="text-sm font-semibold">{c.name}</p>
                      <p className="text-xs text-white/70">{c.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
