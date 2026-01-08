'use client'

import sectionImage from '../assets/beautiful-group-fish-underwater.jpg'
import FeedbackList from '../components/FeedbackList'

export default function Hero() {

  return (
    <div className="font-sans text-white">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${sectionImage})` }}
        ></div>

        {/* Dark + Sky Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-sky-900 to-transparent"></div>


        {/* BUBBLES */}
       <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <span
              key={i}
              className="absolute bottom-0 w-4 h-4 bg-sky-200 rounded-full opacity-40 animate-bubble"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            ></span>
          ))}
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-5xl px-8 lg:px-40">
          <h1 className="text-2xl md:text-5xl lg:text-6xl text-center lg:text-left md:text-left font-extrabold leading-tight">
            Bring the Ocean
            <span className="block text-sky-300">
              Into Your Living Space .
            </span>
          </h1>

          <p className="mt-6 text-lg max-w-lg md:text-xl text-center lg:text-left md:text-left lg:text-xl  text-sky-100/90">
            Discover exotic fishes, designer aquariums, and premium accessories
            crafted to turn your home into a peaceful underwater world.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
            <a
              href="/fish"
              className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4
                        rounded-xl text-sm sm:text-md
                        bg-sky-500 text-white font-semibold shadow-xl
                        hover:bg-sky-600 transition"
            >
              Browse Fishes
            </a>

            <a
              href="/access"
              className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4
                        rounded-xl border border-white/30
                        bg-white/10 backdrop-blur-md
                        font-semibold hover:bg-white/20 transition"
            >
              Accessories
            </a>
          </div>


        </div>

        <style>{`
          @keyframes bubble {
            0% { transform: translateY(0) scale(1); opacity: 0.6; }
            100% { transform: translateY(-100vh) scale(1.3); opacity: 0; }
          }
          .animate-bubble {
            animation: bubble linear infinite;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1.2s ease-out;
          }
        `}</style>

       

      </section>
        <section className='py-16 bg-gray-50'>
            <FeedbackList />
      </section>

    </div>

      
      
  )
}
