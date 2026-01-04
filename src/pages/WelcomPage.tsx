'use client'

import sectionImage from '../assets/beautiful-group-fish-underwater.jpg'

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
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-sky-900/100 to-transparent"></div>


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

          <span className="inline-block mb-6 px-4 py-2 text-sm rounded-full bg-sky-400/20 text-sky-200 font-medium">
            Premium Aquarium Lifestyle
          </span>

          <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Bring the Ocean
            <span className="block text-sky-300">
              Into Your Living Space .
            </span>
          </h1>

          <p className="mt-6 text-md md:text-xl lg:text-xl max-w-lg  text-sky-100/90">
            Discover exotic fishes, designer aquariums, and premium accessories
            crafted to turn your home into a peaceful underwater world.
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <a
              href="/fish"
              className="lg:px-4 lg:py-4 md:px-20 md:py-4 text-center px-18 py-2 rounded-xl bg-sky-500 text-white font-semibold shadow-xl hover:bg-sky-600 transition"
            >
              Browse Fishes
            </a>

            <a
              href="/access"
              className="lg:px-8 lg:py-4 md:px-20 md:py-4  px-14 py-4 rounded-xl border border-white/30 bg-sky-500 backdrop-blur-md font-semibold hover:bg-sky-600 transition"
            >
              Accessories
            </a>
            <a
              href="/customized"
              className="lg:px-10 lg:py-4 md:px-20 md:py-4 px-14 py-4 rounded-xl border border-white/30  bg-sky-500  backdrop-blur-md font-semibold hover:bg-sky-600 transition"
            >
              Aquarium
            </a>

            <a
              href="/feedbacak"
              className="lg:px-10 lg:py-4 md:px-20 md:py-4 px-14 py-4 rounded-xl border border-white/30  bg-sky-500 backdrop-blur-md font-semibold  hover:bg-sky-600 transition"
            >
              Feedback
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

    </div>

      
      
  )
}
