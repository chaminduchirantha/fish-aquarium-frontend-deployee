import carfd2 from '../assets/create an image with.png'
import card3 from '../assets/Delivery & Relocatio.png'
import card4 from '../assets/fish Aquarium Design.png'
import card5 from '../assets/Aquarium Equipment S.png'
import card6 from '../assets/Aquarium Plants Deco.png'
import card7 from '../assets/Aquarium Setup & Ins.png'

function Service() {
  const services = [
    {
      id: "01",
      title: "Aquarium Setup & Installation",
      desc: "Professional aquarium setup and installation service ensuring perfect balance of design, filtration, and lighting. We create healthy, beautiful aquatic environments customized to your space.",
      img: card7,
      color: "from-sky-500 to-blue-600"
    },
    {
      id: "02",
      title: "Maintenance Services",
      desc: "Reliable aquarium maintenance services including water cleaning, filter replacement, health checks, and algae removal. Keep your fish tank crystal clear and balanced with our expertise.",
      img: carfd2,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "03",
      title: "Delivery & Relocation",
      desc: "Safe and secure transport of your aquatic life and equipment. We handle the complex logistics of moving tanks, ensuring your fish remain stress-free and your setup stays intact.",
      img: card3,
      color: "from-indigo-500 to-purple-600"
    },
    {
      id: "04",
      title: "Aquarium Design",
      desc: "Creative design service combining beauty and functionality. We design custom aquascapes with perfect lighting and plants to create stunning underwater environments that relax the mind.",
      img: card4,
      color: "from-rose-500 to-orange-600"
    },
    {
      id: "05",
      title: "Equipment Sales",
      desc: "High-quality aquarium equipment including filters, air pumps, heaters, and lighting systems. We provide reliable, energy-efficient products to ensure your tank stays healthy and clean.",
      img: card5,
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "06",
      title: "Plants & Decoration",
      desc: "Beautiful aquarium plant decoration services featuring natural and artificial plants. We design vibrant, eco-friendly aquascapes that enhance your tank’s beauty and fish health.",
      img: card6,
      color: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-sky-50 border border-sky-100">
            <span className="text-[10px] font-black uppercase tracking-[3px] text-sky-600">Our Expertise</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">
            Premium Aquatic Services
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
            From professional installation to long-term maintenance, we provide 
            comprehensive solutions for a thriving underwater ecosystem.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
            >
              {/* IMAGE AREA WITH OVERLAY */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* FLOATING NUMBER BADGE */}
                <div className={`absolute top-6 right-6 w-12 h-12 rounded-2xl bg-linear-to-br ${service.color} text-white flex items-center justify-center font-black text-lg shadow-lg`}>
                  {service.id}
                </div>
              </div>

              {/* CONTENT AREA */}
              <div className="p-8 flex flex-col grow">
                <h4 className="text-2xl font-black text-slate-800 tracking-tight mb-4 group-hover:text-sky-600 transition-colors">
                  {service.title}
                </h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Service;