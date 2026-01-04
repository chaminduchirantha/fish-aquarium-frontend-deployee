import { useEffect, useState } from "react";
import { List, ShoppingCart } from "lucide-react";
import { getAllAccessories, searchAccessories } from "../services/accessories";
import { useCartAccessories } from "../context/cartContextAccessories";
import CartDrawerAccessories from "../components/CartViewerAccessories";
import { Link } from "react-router-dom";

interface Accessories {
  _id: string;
  itemname: string;
  price: string;
  description: string;
  imageUrl: string;
}

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


  const [accessoriesList, setAccessoriesList] = useState<Accessories[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {cart, addToCart } = useCartAccessories();
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  
  const limit = 6;

  const loadData = async () => {

    if (search) {
      const res = await searchAccessories(page, limit, "", search); 
      setAccessoriesList(res.data || []);
      setTotalPages(res.totalPages || 1);
    }else{
      const res = await getAllAccessories(page, limit);
      setAccessoriesList(res.data);
      setTotalPages(res.totalPages);
    }
  };

  useEffect(() => {
     loadData();
  }, [page , search]);
  

  return (
    <section className="py-12 lg:px-20 px-6 bg-gray-50 mt-8">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-5xl font-bold text-sky-800 text-center mb-3">
          Fish Categories
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-center">
          Discover our smart aquarium solutions from intelligent fish care
          systems to automated tank management tools that make your aquarium
          experience easier and more enjoyable.
        </p>
      </div>

       <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search Item..."
            value={search}
              onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset to first page when searching
            }}
            className="w-full md:w-1/2 px-4 py-2 rounded-full border border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

         <Link
            to="/my-orders-access" 
            
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



      <div className="mt-10">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {accessoriesList.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative"
          >
            <div className="h-60 w-full overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.itemname}
                className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
              />
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-xl font-semibold text-sky-800">
                  {item.itemname}
                </h3>
              </div>

              <h4 className="text-md text- font-semibold mb-3 text-sky-800">
                  {item.price}
              </h4>
              <p className="text-gray-600 font-semibold text-sm leading-relaxed mb-6">
                {item.description}
              </p>
              <button  onClick={() =>
                addToCart({
                    _id: item._id,
                    itemname: item.itemname,
                    price: item.price,
                    imageUrl: item.imageUrl,
                    qty: 1,
                  })
                } className="flex items-center justify-center gap-2 mt-3 cursor-pointer bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-full w-full transition-all duration-300">
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <Link
                to="/ordersAcceessories"
                state={{
                  itemname: item.itemname,
                  description : item.description,
                  price: parsePrice(item.price),
                  qty: 1,
                  image: item.imageUrl
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

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-12">
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
    </div>
    <CartDrawerAccessories open={cartOpen} onClose={() => setCartOpen(false)} />
  </section>
  );
}
