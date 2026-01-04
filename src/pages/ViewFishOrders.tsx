import { useEffect, useState } from "react";
import { getUserOrders } from "../services/fishOrder";
import { useAuth } from "../context/authContext";
import AlertPopups from "../components/AlertsPopups";

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
    <div className="p-6 mt-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-sky-800 text-center">My Orders</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {orders.map((order) => (
          <div 
            key={order._id} 
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 relative border border-gray-100"
          >
            {/* Status Badge */}
            <span
              className={ `bottom-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                order.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {order.status.toUpperCase()}
            </span>

            {/* Fish Name */}
            <h3 className="font-bold text-xl text-sky-800 mb-2">{order.fishname}</h3>

            {/* Order Details */}
            <div className="text-gray-600 space-y-1">
              <p><span className="font-semibold">Qty:</span> {order.qty}</p>
              <p><span className="font-semibold">Price:</span> Rs {order.price}</p>
              <p><span className="font-semibold">Amount:</span> Rs {order.amount}</p>
              <p><span className="font-semibold">Order Date:</span> {new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
