import { useCart } from "../context/cartContextFish";
import { X } from "lucide-react";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, removeFromCart, clearCart, total } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-100 bg-white shadow-xl transition-transform duration-300 p-5 z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">Your Cart ({cart.length})</h2>
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      {/* Empty state */}
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
      ) : (
        <>
          {/* Cart items */}
          <div className="overflow-y-auto max-h-[60vh]">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center gap-3 mb-4 border-b pb-2">
                {/* Image */}
                <img src={item.imageUrl} alt={item.fishName} className="w-16 h-16 rounded-lg object-cover" />
                
                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-sky-800">{item.fishName}</h3>
                  <p className="text-gray-600 text-sm">Price: Rs. {item.price}</p>
                  <p className="text-gray-600 text-sm">Qty: {item.qty}</p>
                </div>

                {/* Remove button */}
                <button
                  className="text-red-500 font-bold"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-4 flex justify-between items-center font-bold text-lg">
            <span>Total:</span>
            <span>Rs. {total.toFixed(2)}</span>
          </div>

          {/* Clear Cart button */}
          <button
            className="mt-5 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
