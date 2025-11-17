import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react'
import Navbar from '../components/Navbar'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function SearchPage(){
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [year, setYear] = useState(params.get('year') || '')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e?.preventDefault()
    const q = query.trim()
    if(!q) return
    const next = new URLSearchParams({ q })
    if (year) next.set('year', year)
    setParams(next)
    setLoading(true)
    try{
      const res = await fetch(`${API}/api/search?`+next.toString())
      const data = await res.json()
      setResults(data.results || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(params.get('q')){
      setQuery(params.get('q'))
      setYear(params.get('year') || '')
      submit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <form onSubmit={submit} className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 w-full border border-white/10">
            <SearchIcon size={18} className="text-gray-300" />
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search titles..." className="bg-transparent outline-none text-sm placeholder:text-gray-400 w-full" />
          </div>
          <input value={year} onChange={(e)=>setYear(e.target.value)} placeholder="Year" className="w-24 bg-white/10 rounded-full px-3 py-2 border border-white/10 outline-none" />
          <button className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 transition">Search</button>
        </form>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {loading && <p className="col-span-full text-center text-white/70">Searching...</p>}
          {!loading && results.map(r => (
            <Link key={`${r.media_type}-${r.id}`} to={`/title/${r.media_type}/${r.id}`} className="group block rounded-lg overflow-hidden bg-white/5 border border-white/10">
              {r.poster ? (
                <img src={r.poster} alt={r.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <div className="w-full h-64 flex items-center justify-center text-gray-400">No Image</div>
              )}
              <div className="p-2">
                <p className="text-sm text-white/90 line-clamp-2">{r.title}</p>
                {r.year && <p className="text-xs text-white/60">{r.year}</p>}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
