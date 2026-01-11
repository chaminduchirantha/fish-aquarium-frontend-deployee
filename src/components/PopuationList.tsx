function PopuationList() {
  return (
    <section className='py-12 bg-slate-50 overflow-hidden'>
        <div className='max-w-6xl mx-auto px-6'>
            <h2 className='text-5xl font-bold text-sky-800 text-center mb-6'>What Our Populations...</h2>
            <p className='text-md text-black text-center max-w-2xl mx-auto'>Discover our smart aquarium solutions from intelligent fish care
                systems to automated tank management tools.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
             
                <div
                  className="bg-white rounded-md shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative"
                >
                  <div className="h-70 w-full overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/dq74n1mhb/image/upload/v1768137917/54ff3d8f-eba6-4a1a-bb54-864063ccc690.png"
                      className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-md font-semibold text-sky-800">Fresh Water Fishes</h3>
                    </div>
                    <p className="text-gray-600 font-semibold text-sm leading-relaxed">Freshwater fishes are fish species that live in rivers, lakes, ponds, streams, and freshwater aquariums. examples are carps , catfish , gappi , platies , blackmollies , gouramies..</p>
                    <a href="/fish"><button className='bg-sky-600 w-full rounded-4xl px-2 py-3 mb-2 mt-5 text-md cursor-pointer' >Get Info</button></a>

                  </div>
                </div>

                <div
                  className="bg-white rounded-md shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative"
                >
                  <div className="h-70 w-full overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/dq74n1mhb/image/upload/v1768138115/36cffa39-941d-47e0-8f8a-cb0c67eed607.png"
                      className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-md font-semibold text-sky-800">Pedotory Fishes</h3>
                    </div>
                    <p className="text-gray-600 font-semibold text-sm leading-relaxed">Predatory fish play a vital role in regulating prey populations, driving an "evolutionary arms race" that shapes the survival traits of other species. Eg - Oscar , arovana , snack heads</p>
                    <a href="/fish"><button className='bg-sky-600 w-full rounded-4xl px-2 py-3 mb-2 mt-5 text-md cursor-pointer' >Get Info</button></a>

                  </div>
                </div>

                 <div
                  className="bg-white rounded-md shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative"
                >
                  <div className="h-70 w-full overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/dq74n1mhb/image/upload/v1764240391/post/p7xl5csv15ly2vp68xnr.webp"
                      className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-md font-semibold text-sky-800">Accessoris in the aquarium</h3>
                    </div>
                    <p className="text-gray-600 font-semibold text-sm leading-relaxed">Predatory fish play a vital role in regulating prey populations, driving an "evolutionary arms race" that shapes the survival traits of other species. Eg - Oscar , arovana , snack heads</p>
                    <a href="/access"><button className='bg-sky-600 w-full rounded-4xl px-2 py-3 mb-2 mt-5 text-md cursor-pointer' >Get Info</button></a>

                  </div>
                </div>

                
            </div>

            
        </div>
    </section>
)}

export default PopuationList