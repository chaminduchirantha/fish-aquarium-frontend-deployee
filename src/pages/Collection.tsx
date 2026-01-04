// import React from "react";
import { Link } from "react-router-dom";
import video1 from "../assets/stock-footage-colorful-fancy-carps-or-koi-fishes-swimming-in-a-pond-beautiful-color-japanese-koi-fish-koi-carp.webm";
import image1 from '../assets/21434.jpg'
import image3 from '../assets/image.png'
import image4 from '../assets/closeup-shot-yellow-cichlidae-cichlid-home-aquarium.jpg'

const CardSection: React.FC = () => {
  return (
    <section className="bg-gray-100 w-full min-h-screen flex flex-col items-center py-10 px-6 " id="collections">
      {/* Header Section */}
      <header className="text-center ">
        <h1 className="text-5xl font-bold  text-sky-800  mt-9">
          Explore Our Collections
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mt-9">
          Discover our smart aquarium solutions from intelligent fish care
          systems to automated tank management tools that make your aquarium
          experience easier and more enjoyable.
        </p>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch mt-10">
        {/* Video Section */}
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-lg h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-xl">
            <video
              className="w-full h-full object-cover"
              src={video1}
              autoPlay
              loop
              muted
              playsInline
            ></video>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition-all hover:-translate-y-2 duration-300 flex flex-col items-center text-center">
            <img
              className="h-40 w-full object-cover rounded-t-xl"
              src={image4}
              alt="Smart Monitoring"
            />
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2  text-black">
                Explore Our Fishes
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Browse our beautiful collection of healthy, vibrant aquarium fish,
                carefully selected to suit tanks of all sizes.
              </p>
              <Link
                to="fishes"
                className="text-white px-4 py-2 bg-sky-600  rounded-md hover:bg-sky-700 transition"
              >
                View More
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition-all hover:-translate-y-2 duration-300 flex flex-col items-center text-center">
            <img
              className="h-40 w-full object-cover rounded-t-xl"
              src={image1}
              alt="Automated Feeding"
            />
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2 text-black">
                Explore The Accssouries
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Find high-quality aquarium accessories including filters, lights,
                decorations, and tools for perfect tank maintenance.
              </p>
              <Link
                to="accessories"
                className="text-white px-4 py-2 bg-sky-600  rounded-md hover:bg-sky-700  transition"
              >
                View More
              </Link>
            </div>
          </div>

          

          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition-all hover:-translate-y-2 duration-300 flex flex-col items-center text-center">
            <img
              className="h-40 w-full object-cover rounded-t-xl"
              src={image3}
              alt="Smart Water Circulation"
            />
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2 text-black">
                Smart Auarium Maintenance
              </h2>

              <p className="text-gray-600 text-sm mb-6">
                Customize your aquarium with smart maintenance features designed to
                keep your tank clean, healthy, and hassle-free.
              </p>
              <a
                href="/customized"
                className="px-4 py-2 bg-sky-600  rounded-md hover:bg-sky-700 transition text-white"
              >
                View More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSection;
