export default function Footer(){
  return (
    <footer className="border-t border-white/10 bg-black text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <p>© {new Date().getFullYear()} CineScope • Discover cinema like never before.</p>
        <div className="flex gap-4">
          <a href="/test" className="hover:text-white">System Check</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  )
}
