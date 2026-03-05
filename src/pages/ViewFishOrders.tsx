import { useEffect, useState } from "react";
import { getUserOrders } from "../services/fishOrder";
import { useAuth } from "../context/authContext";
import AlertPopups from "../components/AlertsPopups";
import { Link } from "react-router-dom";
import { Calendar, CheckCircle, Package, ShoppingBag } from "lucide-react";

interface OrderFish {
  _id: string;
  fishname: string;
  qty: number;
  price: string;
  amount: string;
  orderDate: string;
  status: string;
}

export default function UserOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderFish[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;
      try {
        const res = await getUserOrders(user.email);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) {
    
  }

  if (!user) {
  
    if (!showPopup) setShowPopup(true);
      return (
        <>
          {showPopup && <AlertPopups />}
        </>
    );
  }
  if (orders.length === 0) return <p className="text-center mt-20 text-gray-500">No orders found.</p>;

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 md:px-8 mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Purchase <span className="text-sky-600">History</span>
          </h1>
          <p className="text-slate-500 font-medium">Track and manage your aquatic orders in one place</p>
        </div>
        
        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="group bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 hover:shadow-2xl hover:shadow-sky-100/50 transition-all duration-500 relative overflow-hidden"
            >
              {/* Status Badge (Top Right) */}
              <div className="absolute top-6 right-6">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                  order.status === "pending"
                    ? "bg-amber-50 text-amber-600 border-amber-100"
                    : order.status === "success"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                    : "bg-rose-50 text-rose-600 border-rose-100"
                }`}>
                  {order.status}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                  <Package size={28} />
                </div>
                <div>
                  <h3 className="font-black text-xl text-slate-800 tracking-tight leading-none group-hover:text-sky-600 transition-colors">
                    {order.fishname}
                  </h3>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-tighter">
                    Ref: #{order._id.slice(-6).toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Details Table */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Quantity</span>
                  <span className="text-sm font-black text-slate-700">{order.qty} Pairs</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Unit Price</span>
                  <span className="text-sm font-black text-slate-700">Rs. {order.price}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Amount</span>
                  <span className="text-lg font-black text-sky-700">Rs. {order.amount}</span>
                </div>
              </div>

              {/* Footer Info */}
              <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar size={14} className="text-sky-500" />
                  <span className="text-[12px] font-bold">
                    {new Date(order.orderDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                {order.status === "success" && (
                    <div className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle size={14} />
                        <span className="text-[10px] font-black uppercase">Delivered</span>
                    </div>
                )}
              </div>

              {/* Hover Effect Bar */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Empty State (Optional) */}
        {orders.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <ShoppingBag size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No orders yet</h3>
            <p className="text-slate-400 mb-6">Looks like you haven't started your aquatic journey yet.</p>
            <Link to="/fish-categories" className="bg-sky-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-sky-700 transition-all">
              Browse Fish
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
