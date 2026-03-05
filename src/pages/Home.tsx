'use client'

import sectionImage from '../assets/beautiful-group-fish-underwater.jpg'
import FeedbackList from '../components/FeedbackList'
import PopuationList from '../components/PopuationList'

export default function Hero() {

  return (
    <div className="font-sans text-white bg-slate-950">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
        
        {/* BACKGROUND IMAGE WITH SLOW ZOOM ANIMATION */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 animate-slow-zoom"
          style={{ backgroundImage: `url(${sectionImage})` }}
        ></div>

        {/* MULTI-LAYERED GRADIENT OVERLAYS (For that deep ocean feel) */}
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/80 to-transparent z-1"></div>
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950/20 z-1"></div>

        {/* ENHANCED ORGANIC BUBBLES */}
        <div className="absolute inset-0 overflow-hidden z-2 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="absolute -bottom-20px bg-white/20 rounded-full backdrop-blur-[1px] animate-bubble"
              style={{
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
                opacity: Math.random() * 0.5,
              }}
            ></span>
          ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-20 w-full mt-20">
          <div className="max-w-3xl animate-fadeIn">
            
            {/* PREMIUM BADGE */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span className="text-[10px] uppercase tracking-[4px] font-black text-sky-200">
                Premium Aquarium Lifestyle
              </span>
            </div>

            {/* TITANIC HEADING */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
              Bring the <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-slate-400">Ocean</span>
              <span className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-emerald-400 italic font-serif">
                Into Your Living Space.
              </span>
            </h1>

            {/* ELEGANT DESCRIPTION */}
            <p className="mt-8 text-lg md:text-xl text-slate-300/90 max-w-xl leading-relaxed font-medium">
              Discover exotic species, designer aquascapes, and high-performance equipment 
              meticulously curated for the modern aquarist.
            </p>

            {/* CALL TO ACTION BUTTONS */}
            <div className="mt-12 flex flex-wrap gap-5">
              <a
                href="/fish"
                className="group relative px-10 py-5 bg-sky-500 text-white font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(14,165,233,0.3)]"
              >
                <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center gap-2">
                  Browse Collections <i className="bx bx-right-arrow-alt text-2xl"></i>
                </span>
              </a>

              <a
                href="/access"
                className="group px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-xl text-white font-black rounded-2xl transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
              >
                Explore Accessories
              </a>
            </div> 
          </div>
        </div>


        {/* CUSTOM STYLES */}
        <style>{`
          @keyframes slow-zoom {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          .animate-slow-zoom {
            animation: slow-zoom 20s ease-in-out infinite;
          }
          @keyframes bubble {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            20% { opacity: 0.4; }
            100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
          }
          .animate-bubble {
            animation: bubble linear infinite;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1.5s cubic-bezier(0.22, 1, 0.36, 1);
          }
        `}</style>
      </section>

      <section className="relative z-10 py-4 bg-white ">
        <div className="max-w-7xl mx-auto px-8">
          <PopuationList />
        </div>
      </section>
      

      {/* FEEDBACK SECTION */}
      <section className="relative z-10 py-4 bg-white ">
        <div className="max-w-7xl mx-auto px-8">
          <FeedbackList />
        </div>
      </section>
    </div>
  )
}
