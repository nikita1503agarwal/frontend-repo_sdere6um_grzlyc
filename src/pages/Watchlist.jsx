import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
const USER_ID = 'demo' // replace with real auth later

const tabs = [
  { key: 'later', label: 'Watch Later' },
  { key: 'watching', label: 'Currently Watching' },
  { key: 'watched', label: 'Watched' },
]

export default function Watchlist(){
  const [active, setActive] = useState('later')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async (status) => {
    setLoading(true)
    try{
      const res = await fetch(`${API}/api/watchlist?user_id=${USER_ID}&status=${status}`)
      const json = await res.json()
      setItems(json.results || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ load(active) }, [active])

  const markStatus = async (id, status) => {
    await fetch(`${API}/api/watchlist/${id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ status }) })
    load(active)
  }

  const toggleLike = async (id, liked) => {
    await fetch(`${API}/api/watchlist/${id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ liked: !liked }) })
    load(active)
  }

  const remove = async (id) => {
    await fetch(`${API}/api/watchlist/${id}`, { method:'DELETE' })
    load(active)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold mb-4">Your Watchlist</h1>

        <div className="flex gap-2 mb-6">
          {tabs.map(t => (
            <button key={t.key} onClick={()=>setActive(t.key)} className={`px-4 py-2 rounded-full border ${active===t.key? 'bg-red-600 border-red-600' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>{t.label}</button>
          ))}
        </div>

        {loading ? (
          <p className="text-white/70">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {items.map(it => (
              <div key={it._id} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                {it.poster ? <img src={it.poster} alt={it.title} className="w-full h-64 object-cover" /> : <div className="w-full h-64 flex items-center justify-center text-white/50">No Image</div>}
                <div className="p-3 space-y-1">
                  <p className="font-semibold text-sm line-clamp-2">{it.title}</p>
                  {it.year && <p className="text-xs text-white/70">{it.year}</p>}
                  <div className="flex gap-2 mt-2">
                    <button onClick={()=>markStatus(it._id, 'watched')} className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20">Mark Watched</button>
                    <button onClick={()=>toggleLike(it._id, it.liked)} className={`text-xs px-2 py-1 rounded ${it.liked? 'bg-red-600 hover:bg-red-500' : 'bg-white/10 hover:bg-white/20'}`}>{it.liked? 'Liked' : 'Like'}</button>
                  </div>
                  <button onClick={()=>remove(it._id)} className="mt-2 w-full text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
