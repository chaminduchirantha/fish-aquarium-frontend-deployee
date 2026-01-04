import chefImage from "../assets/beautiful-color-mandarin-fish-colorfull-mandarin-fish-mandarin-fish-closeup.jpg";
import foodImage from "../assets/beautiful-group-fish-underwater.jpg";
import diningImage from "../assets/top-view-colorful-koi-fishes.jpg";
import interiorImage from "../assets/closeup-shot-yellow-cichlidae-cichlid-home-aquarium.jpg";

const About = () => {
  return (
    <section className="bg-white py-30 px-6 md:px-20" id="about">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* LEFT SIDE - Image Grid */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={chefImage}
                alt="Our Chef"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={diningImage}
                alt="Dining Area"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="space-y-4 mt-8">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={foodImage}
                alt="Delicious Food"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={interiorImage}
                alt="Restaurant Interior"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Text Content */}
        <div className="md:w-1/2 text-left md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-sky-500">Aqua World</span>
          </h2>
          <p className="text-gray-700 text-xl leading-relaxed mb-6">
            Welcome to{" "}
            <span className="font-semibold text-sky-500">
              Aqua World Fish Aquarium
            </span>{" "}
             where tradition meets flavor. For years, we’ve been serving
            exquisite dishes crafted with love, passion, and the freshest local
            ingredients. Our mission is to create memorable dining experiences
            that bring families and friends together.
          </p>
          <p className="text-gray-700 text-xl leading-relaxed mb-6">
            From signature dishes to cozy interiors, we ensure every visit feels
            like home. Join us and enjoy a perfect blend of taste, comfort, and
            hospitality that defines who we are.
          </p>
          <button className="bg-sky-500 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium shadow-md transition duration-300">
            Discover More
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
