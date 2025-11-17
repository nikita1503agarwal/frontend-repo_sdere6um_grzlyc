import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Carousel({ title, items = [], anchor }){
  const scroller = useRef(null)
  const scrollBy = (dx) => {
    scroller.current?.scrollBy({ left: dx, behavior: 'smooth' })
  }
  return (
    <section id={anchor} className="relative py-6">
      <div className="flex items-end justify-between mb-3 px-2">
        <h2 className="text-xl sm:text-2xl font-bold text-white/90">{title}</h2>
        <div className="flex gap-2">
          <button onClick={()=>scrollBy(-500)} className="p-2 rounded bg-white/10 hover:bg-white/20 text-white"><ChevronLeft size={18}/></button>
          <button onClick={()=>scrollBy(500)} className="p-2 rounded bg-white/10 hover:bg-white/20 text-white"><ChevronRight size={18}/></button>
        </div>
      </div>
      <div ref={scroller} className="overflow-x-auto hide-scrollbar">
        <div className="grid grid-flow-col auto-cols-[48%] sm:auto-cols-[24%] md:auto-cols-[18%] lg:auto-cols-[15%] gap-3 px-2">
          {items.map((it)=> (
            <a key={`${it.media_type}-${it.id}`} href={`/title/${it.media_type}/${it.id}`} className="group relative rounded-lg overflow-hidden bg-white/5 border border-white/10">
              {it.poster ? (
                <img src={it.poster} alt={it.title} className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <div className="w-full h-[220px] flex items-center justify-center text-gray-400">No Image</div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <p className="text-xs text-white/90 line-clamp-2">{it.title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
