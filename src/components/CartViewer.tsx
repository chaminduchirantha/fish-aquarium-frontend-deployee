import { useCart } from "../context/cartContextFish";
import { RotateCcw, ShoppingBag, Trash2, X } from "lucide-react";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, removeFromCart, clearCart, total } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out z-100 flex flex-col ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Your Cart</h2>
          <p className="text-sky-600 text-xs font-bold uppercase tracking-widest">{cart.length} Items Selected</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all text-slate-400 hover:text-rose-500"
        >
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
              <ShoppingBag size={48} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Your cart is empty</h3>
              <p className="text-slate-400 text-sm max-w-[200px] mx-auto">Looks like you haven't added any fish to your tank yet.</p>
            </div>
            <button 
              onClick={onClose}
              className="text-sky-600 font-bold text-sm hover:underline underline-offset-4"
            >
              Start Shopping →
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div 
                key={item._id} 
                className="group flex gap-4 p-4 rounded-2xl border border-slate-50 bg-white hover:border-sky-100 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative shrink-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.fishName} 
                    className="w-20 h-20 rounded-xl object-cover border border-slate-100" 
                  />
                </div>
                
                {/* Info */}
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-sky-600 transition-colors leading-tight">
                      {item.fishName}
                    </h3>
                    <p className="text-sky-600 font-black text-sm mt-1">
                      Rs. {parseFloat(item.price).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-tighter">Qty: {item.qty}</span>
                    </div>
                    
                    <button
                      className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Subtotal</span>
              <span>Rs. {total.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-black text-slate-800 tracking-tight">Total Amount</span>
              <span className="text-2xl font-black text-sky-600 tracking-tight">
                Rs. {total.toLocaleString(undefined, {minimumFractionDigits: 2})}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            <button
              className="col-span-1 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-100 rounded-2xl transition-all group"
              onClick={clearCart}
              title="Clear all items"
            >
              <RotateCcw size={20} className="group-hover:-rotate-45 transition-transform" />
            </button>
            
            <button
              className="col-span-4 bg-slate-900 text-white py-4 rounded-2xl font-bold tracking-wide hover:bg-sky-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
              onClick={() => {
                // Navigate to checkout logic here
                onClose();
              }}
            >
              Proceed to Checkout
            </button>
          </div>
          
          <p className="text-[10px] text-center text-slate-400 font-medium uppercase tracking-widest">
            Shipping & taxes calculated at checkout
          </p>
        </div>
      )}
    </div>
  );
}
