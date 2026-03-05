// import React from "react";
import { Link } from "react-router-dom";
import video1 from "../assets/stock-footage-colorful-fancy-carps-or-koi-fishes-swimming-in-a-pond-beautiful-color-japanese-koi-fish-koi-carp.webm";
import image1 from '../assets/21434.jpg'
import image3 from '../assets/image.png'
import image4 from '../assets/closeup-shot-yellow-cichlidae-cichlid-home-aquarium.jpg'

const CardSection: React.FC = () => {
  return (
    <section className="bg-slate-50 w-full min-h-screen flex flex-col items-center py-20 px-6" id="collections">
    <header className="text-center mb-16">
      <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mt-4 tracking-tight">
        Explore Our <span className="text-sky-600">Collections</span>
      </h1>
      <p className="text-slate-500 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
        Elevate your aquatic lifestyle with our intelligent care systems and 
        automated management tools—precision engineered for the modern hobbyist.
      </p>
    </header>

    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      {/* Left Side: Featured Video Card */}
      <div className="lg:col-span-5 flex justify-center sticky top-10">
        <div className="relative group w-full rounded-4xl overflow-hidden shadow-2xl bg-white p-3 border border-slate-200">
          <div className="relative h-[500px] md:h-[650px] rounded-3xl overflow-hidden">
            <video
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
              src={video1}
              autoPlay
              loop
              muted
              playsInline
            ></video>
            {/* Overlay for a high-end feel */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <p className="text-white text-xl font-medium">Smart Technology</p>
              <p className="text-white/80 text-sm">Experience the future of aquatics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Collection Cards */}
      <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Fishes */}
        <div className="group bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-sky-100 transition-all duration-500 p-2">
          <div className="overflow-hidden rounded-2xl h-52">
            <img className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" src={image4} alt="Fishes" />
          </div>
          <div className="p-6">
            <h2 className="font-bold text-2xl mb-3 text-slate-800">Elite Species</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Hand-selected, vibrant aquarium fish curated for health and elegance.
            </p>
            <Link to="fishes" className="inline-flex items-center text-sky-600 font-semibold hover:text-sky-700 group/btn">
              View Collection 
              <span className="ml-2 transform group-hover/btn:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Card 2: Accessories */}
        <div className="group bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-sky-100 transition-all duration-500 p-2">
          <div className="overflow-hidden rounded-2xl h-52">
            <img className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" src={image1} alt="Accessories" />
          </div>
          <div className="p-6">
            <h2 className="font-bold text-2xl mb-3 text-slate-800">Pro Accessories</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Precision tools and artistic decorations for the ultimate tank setup.
            </p>
            <Link to="accessories" className="inline-flex items-center text-sky-600 font-semibold hover:text-sky-700 group/btn">
              View Collection 
              <span className="ml-2 transform group-hover/btn:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Card 3: Maintenance (Spans across or stays grid) */}
        <div className="group bg-white rounded-3xl shadow-xl transition-all duration-500 p-2 md:col-span-2">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 overflow-hidden rounded-2xl h-60 md:h-full min-h-60">
              <img className="h-full w-full object-cover  group-hover:opacity-100 transition-opacity" src={image3} alt="Maintenance" />
            </div>
            <div className="p-8 md:w-1/2">
              <h2 className="font-bold text-2xl mb-3 text-black">Smart Maintenance</h2>
              <p className="text-black text-sm leading-relaxed mb-6">
                Full automation at your fingertips. Keep your ecosystem pristine with our custom-engineered smart solutions.
              </p>
              <a href="/customized" className="inline-block bg-sky-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-sky-500 transition-colors shadow-lg shadow-sky-900/20">
                Explore Solutions
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
  );
};

export default CardSection;
