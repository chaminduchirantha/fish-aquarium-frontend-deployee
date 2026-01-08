import { useEffect, useState } from "react";
import { getAllFish, searchFish } from "../services/Fish";
import {List, ShoppingCart } from "lucide-react";
import { useCart } from "../context/cartContextFish";
import CartDrawer from "../components/CartViewer";
import { Link } from "react-router-dom";

interface Fish {
  _id: string;
  fishName: string;
  price: string;
  description: string;
  fishCategory: string;
  imageUrl: string;
}

// Helper function to parse price string to number
const parsePrice = (price: any): number => {
  try {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const cleanPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
      return isNaN(cleanPrice) ? 0 : cleanPrice;
    }
    return 0;
  } catch {
    return 0;
  }
};

export default function FishCategorySection() {
  const categories = [
    { label: "All", value: "all" },
    { label: "Carps", value: "Carps" },
    { label: "Barbs", value: "Barbs" },
    { label: "Gouramies", value: "Gouramies" },
    { label: "Tetras", value: "Tetras" },
    { label: "Predatory Fish", value: "Predatory" },
    { label: "Others", value: "Others" },

  ];

  const [selected, setSelected] = useState("all");
  const [fishList, setFishList] = useState<Fish[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, addToCart } = useCart();

  const limit = 12;

  const loadData = async () => {
    try {
      setLoading(true);

      if (search) {
        const res = await searchFish(page, limit, "", search); 
        setFishList(res.data || []);
        setTotalPages(res.totalPages || 1);
      } else if (selected !== "all") {
        const res = await searchFish(page, limit, selected, "");
        setFishList(res.data || []);
        setTotalPages(res.totalPages || 1);
      } else {
        const res = await getAllFish(page, limit);
        setFishList(res.data || []);
        setTotalPages(res.totalPages || 1);
      }
    } catch (error) {
      console.error("Failed to load fish:", error);
      setFishList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadData();
  }, [selected, search]);

  useEffect(() => {
    loadData();
  }, [page]);
 
  return (
    <section className="py-12 lg:px-20 px-6 bg-gray-50 mt-8">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className=" font-bold text-sky-800 text-3xl lg:text-5xl text-center mb-3">
          Fish Categories
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm lg:text-md mb-8 text-center">
          Discover our smart aquarium solutions from intelligent fish care
          systems to automated tank management tools that make your aquarium
          experience easier and more enjoyable.
        </p>


          <div className="flex justify-center mb-10">
            <input
              type="text"
              placeholder="Search fish..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full md:w-1/2 px-4 py-2 rounded-full border border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <Link
            to="/my-orders" 
            className="absolute top-36 right-6 text-black p-3 shadow-md"
          >
            <List size={22} />
            <span className="sr-only">View Orders</span>
          </Link>

          {/* Add to Cart Icon */}
          <button
            onClick={() => setCartOpen(true)}
            className="absolute top-20 right-6 text-black p-3 shadow-md"
          >
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1">
              {cart.length}
            </span>
          </button>

        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelected(cat.value);
                setPage(1); // reset page on category change
              }}
              className={`px-5 py-2 rounded-full font-semibold shadow-sm transition-all ${
                selected === cat.value
                  ? "bg-sky-600 text-white shadow-lg scale-105"
                  : "bg-white text-sky-800 border border-sky-400 cursor-pointer hover:bg-sky-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>


      <div className="mt-10">
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Cards */}
      {!loading && (
        <>
          {/* {fishList.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">No fish found in this category</div>
            </div>
          ) : ( */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {fishList.map((fish) => (
                <div
                  key={fish._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative"
                >
                  <div className="h-70 w-full overflow-hidden">
                    <img
                      src={fish.imageUrl}
                      alt={fish.fishName}
                      className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-md font-semibold text-sky-800">
                        {fish.fishName}
                      </h3>
                      <span className="bg-blue-100 text-blue-700 px-3 font-bold py-2 rounded-2xl text-sm whitespace-nowrap">
                        {fish.fishCategory}
                      </span>
                    </div>

                    <h4 className="text-md text- font-semibold mb-3 text-sky-800">
                        Pair of Fish : {fish.price}
                    </h4>
                    <p className="text-gray-600 font-semibold text-sm leading-relaxed">
                      {fish.description}
                    </p>

                  
                    <button  onClick={() =>
                        addToCart({
                          _id: fish._id,
                          fishName: fish.fishName,
                          price: fish.price,
                          imageUrl: fish.imageUrl,
                          qty: 1,
                        })
                      } className="flex items-center justify-center gap-2 mt-3 cursor-pointer bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-full w-full transition-all duration-300">
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <Link
                      to="/ordersFish"
                      state={{
                        fishName: fish.fishName,
                        price: parsePrice(fish.price),
                        qty: 1,
                        image: fish.imageUrl
                      }}
                      className="flex items-center justify-center gap-2 mt-3 cursor-pointer bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-full w-full transition-all duration-300"
                    >
                      <List size={18} />
                      Order Now Fish
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          {/* )} */}
        </>
      )}

      {/* Pagination */}
      {!loading && fishList.length > 0 && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>

          <span className="font-medium text-lg">{page} / {totalPages}</span>

          <button
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>

  <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
  </section>
  );
}
