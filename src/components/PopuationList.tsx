import { ArrowRight, Fish, Waves, ShieldCheck } from 'lucide-react';

function PopuationList() {
  const populations = [
    {
      title: "Fresh Water Fishes",
      description: "Discover a vibrant world of species from rivers and lakes. Includes Carps, Catfish, Guppies, Platies, and more for your home aquarium.",
      image: "https://res.cloudinary.com/dq74n1mhb/image/upload/v1768137917/54ff3d8f-eba6-4a1a-bb54-864063ccc690.png",
      link: "/fish",
      icon: <Fish className="text-sky-500" size={20} />
    },
    {
      title: "Predatory Fishes",
      description: "Experience the majesty of apex aquatic hunters. From Oscars to Arowanas, these species bring a powerful presence to your tank.",
      image: "https://res.cloudinary.com/dq74n1mhb/image/upload/v1768138115/36cffa39-941d-47e0-8f8a-cb0c67eed607.png",
      link: "/fish",
      icon: <ShieldCheck className="text-sky-500" size={20} />
    },
    {
      title: "Premium Accessories",
      description: "Enhance your aquatic ecosystem with top-tier filtration, lighting, and decorative systems designed for a healthy environment.",
      image: "https://res.cloudinary.com/dq74n1mhb/image/upload/v1764240391/post/p7xl5csv15ly2vp68xnr.webp",
      link: "/access",
      icon: <Waves className="text-sky-500" size={20} />
    }
  ];

  return (
    <section className='py-24 bg-linear-to-b from-slate-50 to-white overflow-hidden'>
      <div className='max-w-7xl mx-auto px-6'>
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className='text-4xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight'>
            Explore Our <span className='text-sky-600 font-outline-2'>Populations</span>
          </h2>
          <div className="w-24 h-1.5 bg-sky-500 mx-auto rounded-full mb-6"></div>
          <p className='text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium'>
            From majestic freshwater species to intelligent automated systems, 
            everything you need for a professional aquarium experience.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {populations.map((item, index) => (
            <div 
              key={index}
              className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500 flex flex-col overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating Icon Badge */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl">
                   {item.icon}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                  {item.description}
                </p>

                {/* Button */}
                <a href={item.link} className="block">
                  <button className='w-full bg-slate-50 hover:bg-sky-600 text-slate-700 hover:text-white py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-inner border border-slate-100'>
                    View Collection
                    <ArrowRight size={18} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopuationList;