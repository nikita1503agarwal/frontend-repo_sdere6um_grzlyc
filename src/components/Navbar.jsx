import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, Film, Bookmark, User, Clapperboard } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit = (e) => {
    e.preventDefault()
    if (!q.trim()) return
    navigate(`/search?q=${encodeURIComponent(q.trim())}`)
    setQ('')
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="fixed top-0 inset-x-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-black tracking-wide text-xl">
            <Clapperboard className="text-red-500" size={24} />
            <span>CineScope</span>
          </Link>

          <form onSubmit={onSubmit} className="hidden md:flex items-center gap-2 w-full max-w-lg">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 w-full border border-white/10">
              <Search size={18} className="text-gray-300" />
              <input
                value={q}
                onChange={(e)=>setQ(e.target.value)}
                placeholder="Search movies, shows..."
                className="bg-transparent outline-none text-sm placeholder:text-gray-400 w-full"
              />
            </div>
            <button className="bg-red-600 hover:bg-red-500 transition-colors px-4 py-2 rounded-full text-sm font-semibold">Search</button>
          </form>

          <nav className="flex items-center gap-4">
            <Link to="/watchlist" className={`flex items-center gap-1 text-sm hover:text-red-400 transition ${isActive('/watchlist')?'text-red-400':''}`}>
              <Bookmark size={18} /> <span className="hidden sm:inline">Watchlist</span>
            </Link>
            <Link to="/profile" className={`flex items-center gap-1 text-sm hover:text-red-400 transition ${isActive('/profile')?'text-red-400':''}`}>
              <User size={18} /> <span className="hidden sm:inline">Profile</span>
            </Link>
          </nav>
        </div>

        <form onSubmit={onSubmit} className="md:hidden pb-3">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 w-full border border-white/10">
            <Search size={18} className="text-gray-300" />
            <input
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              placeholder="Search movies, shows..."
              className="bg-transparent outline-none text-sm placeholder:text-gray-400 w-full"
            />
            <button className="text-sm text-red-400 font-semibold">Go</button>
          </div>
        </form>
      </div>
    </header>
  )
}
