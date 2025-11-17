const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export const addToWatchlist = async ({ user_id = 'demo', tmdb_id, media_type, title, poster, backdrop, year }) => {
  const res = await fetch(`${API}/api/watchlist`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ user_id, tmdb_id, media_type, title, poster, backdrop, year }) })
  return res.json()
}
