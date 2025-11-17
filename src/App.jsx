import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Carousel from './components/Carousel'
import Footer from './components/Footer'
import SearchPage from './pages/Search'
import TitlePage from './pages/Title'
import Watchlist from './pages/Watchlist'
import Profile from './pages/Profile'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Home(){
  const [trending, setTrending] = useState([])
  const [topRated, setTopRated] = useState([])
  const [popularTv, setPopularTv] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const load = async () => {
      try {
        const [a,b,c,d] = await Promise.all([
          fetch(`${API}/api/trending`).then(r=>r.json()),
          fetch(`${API}/api/top-rated`).then(r=>r.json()),
          fetch(`${API}/api/popular-tv`).then(r=>r.json()),
          fetch(`${API}/api/upcoming`).then(r=>r.json()),
        ])
        setTrending(a.results || [])
        setTopRated(b.results || [])
        setPopularTv(c.results || [])
        setUpcoming(d.results || [])
      } catch(err){
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <main className="pt-16">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        {loading ? (
          <div className="py-20 text-center text-white/70">Loading latest cinema...</div>
        ) : (
          <>
            <Carousel anchor="trending" title="Trending Now" items={trending} />
            <Carousel title="Top Rated Movies" items={topRated} />
            <Carousel title="Popular TV Shows" items={popularTv} />
            <Carousel anchor="upcoming" title="Upcoming Releases" items={upcoming} />
          </>
        )}
      </div>
    </main>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/title/:media/:id" element={<TitlePage />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
