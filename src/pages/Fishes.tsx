import { useEffect, useState } from "react";
import { getAllFish, searchFish } from "../services/Fish";
import {ChevronLeft, List, Search, ShoppingCart } from "lucide-react";
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
    <section className="relative py-16 lg:px-20 px-4 bg-slate-50/50 overflow-hidden mt-10">
    {/* Decorative Background Elements */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
    
    <div className="max-w-7xl mx-auto relative">
      {/* Header Section */}
      <div className="text-center mb-12">
        <span className="text-sky-500 font-bold tracking-[0.2em] uppercase text-xs">Premium Collection</span>
        <h2 className="font-black text-slate-900 text-4xl lg:text-6xl mt-2 mb-4 tracking-tight">
          Fish <span className="text-sky-600 font-outline-2">Categories</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
          Discover our smart aquarium solutions from intelligent fish care systems to automated tank management tools.
        </p>
      </div>

      {/* Floating Controls (Cart & Orders) */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <Link
          to="/my-orders" 
          className="bg-white/80 backdrop-blur-md text-slate-800 p-4 rounded-2xl shadow-2xl border border-white hover:bg-sky-600 hover:text-white transition-all duration-300 group"
        >
          <List size={24} />
          <span className="absolute right-full mr-4 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">My Orders</span>
        </Link>

        <button
          onClick={() => setCartOpen(true)}
          className="bg-sky-600 text-white p-4 rounded-2xl shadow-2xl shadow-sky-200 hover:bg-sky-700 transition-all duration-300 relative group"
        >
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black h-6 w-6 flex items-center justify-center rounded-full border-2 border-white shadow-lg">
            {cart.length}
          </span>
        </button>
      </div>

      {/* Search & Filter Section */}
      <div className="space-y-8 mb-16">
        <div className="flex justify-center">
          <div className="relative w-full max-w-xl group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search our aquatic collection..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-white pl-12 pr-6 py-4 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all text-slate-700"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelected(cat.value);
                setPage(1); 
              }}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                selected === cat.value
                  ? "bg-sky-600 text-white shadow-xl shadow-sky-200 scale-105"
                  : "bg-white text-slate-600 border border-slate-100 hover:border-sky-200 hover:bg-sky-50 shadow-sm"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">Scanning the ocean...</p>
        </div>
      )}

      {/* Product Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {fishList.map((fish) => (
            <div
              key={fish._id}
              className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-sky-100 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={fish.imageUrl}
                  alt={fish.fishName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-md text-sky-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                    {fish.fishCategory}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-sky-600 transition-colors">
                    {fish.fishName}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xs font-bold text-slate-400 uppercase">Pair:</span>
                    <span className="text-lg font-black text-sky-700">Rs. {fish.price}</span>
                  </div>
                </div>

                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-6">
                  {fish.description}
                </p>

                {/* Action Buttons */}
                <div className="mt-auto grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => addToCart({ ...fish, qty: 1 })} 
                    className="flex items-center justify-center p-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-sky-100 hover:text-sky-700 transition-all group/btn"
                  >
                    <ShoppingCart size={18} className="group-hover/btn:scale-110 transition-transform" />
                  </button>
                  
                  <Link
                    to="/ordersFish"
                    state={{
                      fishName: fish.fishName,
                      price: parsePrice(fish.price),
                      qty: 1,
                      image: fish.imageUrl
                    }}
                    className="flex items-center justify-center gap-2 bg-slate-900 text-white p-3 rounded-xl font-bold text-xs hover:bg-sky-600 transition-all"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && fishList.length > 0 && (
        <div className="flex justify-center items-center gap-6 mt-16">
          <button
            disabled={page === 1}
            className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-sky-50 disabled:opacity-30 disabled:hover:bg-white transition-all shadow-sm"
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-800 px-4 py-2 bg-sky-50 rounded-lg border border-sky-100">
              {page} <span className="text-slate-400 mx-1">/</span> {totalPages}
            </span>
          </div>

          <button
            disabled={page === totalPages}
            className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-sky-50 disabled:opacity-30 disabled:hover:bg-white transition-all shadow-sm"
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
      )}
    </div>

    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
  </section>
  );
}
