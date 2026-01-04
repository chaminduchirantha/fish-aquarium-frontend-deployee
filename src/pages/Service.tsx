import carfd2 from '../assets/create an image with.png'
import card3 from '../assets/Delivery & Relocatio.png'
import card4 from '../assets/fish Aquarium Design.png'
import card5 from '../assets/Aquarium Equipment S.png'
import card6 from '../assets/Aquarium Plants Deco.png'
import card7 from '../assets/Aquarium Setup & Ins.png'

function Service() {
  return (
    <section id="accessories" className="py-16 bg-white mt-5">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-sky-800 text-center mb-5">
           Our Services
          </h1>

          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Discover our smart aquarium solutions from intelligent fish care
            systems to automated tank management tools that make your aquarium
            experience easier and more enjoyable.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {/* Accessory Card 1 */}
            <div className="bg-gray-50 border-b border-blue-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <img src={card7} alt="Fish Tank" className="h-70 w-full object-cover" />
              <div className="p-4 text-center">
                <h4 className="text-xl font-semibold text-sky-800 text-center">Aquarium Setup & Installation</h4>
                <p className="text-gray-600 mt-2 text-center">Professional aquarium setup and installation service ensuring perfect balance of design, filtration, and lighting. We create healthy, beautiful aquatic environments customized to your space with expert care and precision.</p>
              </div>
            </div>


            <div className="bg-gray-50 border-b border-blue-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <img src={carfd2} alt="Fish Tank" className="h-70 w-full object-cover" />
              <div className="p-4 text-center">
                <h4 className="text-xl font-semibold text-sky-800 text-center">Aquarium Maintenance Services</h4>
                <p className="text-gray-600 mt-2 text-center">Reliable aquarium maintenance services including water cleaning, filter replacement, health checks, and algae removal. Keep your fish tank crystal clear, balanced, and beautiful with our professional care and expertise.</p>
              </div>
            </div>


            <div className="bg-gray-50 border-b border-blue-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <img src={card3} alt="Fish Tank" className="h-70 w-full object-cover" />
              <div className="p-4 text-center">
                <h4 className="text-xl font-semibold text-sky-800 text-center">Delivery & Relocation Services</h4>
                <p className="text-gray-600 mt-2 text-center">Reliable aquarium maintenance services including water cleaning, filter replacement, health checks, and algae removal. Keep your fish tank crystal clear, balanced, and beautiful with our professional care and expertise.</p>
              </div>
            </div>

            <div className="bg-gray-50 border-b border-blue-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <img src={card4} alt="Fish Tank" className="h-70 w-full object-cover" />
              <div className="p-4 text-center">
                <h4 className="text-xl font-semibold text-sky-800 text-center">Aquarium Design </h4>
                <p className="text-gray-600 mt-2 text-center">Creative aquarium design service combining beauty and functionality. We design custom aquascapes with perfect lighting, plants create stunning underwater environments that enhance your space and relax the mind.</p>
              </div>
            </div>

            <div className="bg-gray-50 border-b border-blue-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <img src={card5} alt="Fish Tank" className="h-70 w-full object-cover" />
              <div className="p-4 text-center">
                <h4 className="text-xl font-semibold text-sky-800 text-center">Aquarium Equipment Sales</h4>
                <p className="text-gray-600 mt-2 text-center">High-quality aquarium equipment sales including filters, air pumps, heaters, and lighting systems. We provide reliable, energy-efficient products to ensure your fish tank stays healthy, clean, and visually appealing.</p>
              </div>
            </div>

            <div className="bg-gray-50 border-b border-blue-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <img src={card6} alt="Fish Tank" className="h-70 w-full object-cover" />
              <div className="p-4 text-center">
                <h4 className="text-xl font-semibold text-sky-800 text-center">Aquarium Plants  Decoration</h4>
                <p className="text-gray-600 mt-2 text-center">Beautiful aquarium plant decoration services featuring natural and artificial plants. We design vibrant, eco-friendly aquascapes that enhance your tank’s beauty while creating a healthy, balanced environment for your fish.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Service