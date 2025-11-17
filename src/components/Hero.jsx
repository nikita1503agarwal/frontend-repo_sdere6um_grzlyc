import Spline from '@splinetool/react-spline'

export default function Hero(){
  return (
    <section className="relative h-[68vh] min-h-[420px] w-full bg-black overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/WCoEDSwacOpKBjaC/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-end px-4 sm:px-6 lg:px-8 pb-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">Discover, Save, and Experience Movies Like Never Before.</h1>
          <p className="mt-4 text-gray-200">Trending now, top rated picks, and fresh releases curated for you. Build your watchlist and dive into cinematic worlds.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#trending" className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 transition">Explore Trending</a>
            <a href="#upcoming" className="px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 transition">Upcoming</a>
          </div>
        </div>
      </div>
    </section>
  )
}
