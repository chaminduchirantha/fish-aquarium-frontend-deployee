import { useEffect, useState} from "react";
import { getAllFishOrder, updateFishOrderStatus } from "../services/fishOrder";

interface OrderFishList {
  _id: string;
  email :string
  firstname : string 
  lastname : string
  address : string
  paymentmethod : string
  amount : string
  orderType :string
  orderDate : string
  fishname : string
  price : string
  qty : number
  status: string;

}

export default function FishOrders(){
  const [orderFishList, setOrderFishList] = useState<OrderFishList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;

  const loadData = async () => {
    try {
      const res = await getAllFishOrder(page, limit);
      setOrderFishList(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };


  useEffect(() => {
    loadData();
  }, [page]);

   const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateFishOrderStatus(id, newStatus);
      alert("Order status updated successfully!");
      loadData(); // refresh list
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="mt-5">

      <div>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Fish Orders Management</h2>
          <p className="text-gray-600 mt-2">Track and manage all customer orders</p>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orderFishList.map((ordersFish) => (
          <div
            key={ordersFish._id}
            className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{ordersFish.firstname} {ordersFish.lastname}</h3>
            <p className="text-gray-600 mt-1"><strong>Customer Email</strong> : {ordersFish.email}</p>
            <p className="text-gray-600 mt-1"><strong>Address</strong> : {ordersFish.address}</p>
            <p className="text-gray-600 mt-1"><strong>Payment Method</strong> : {ordersFish.paymentmethod}</p>
            <p className="text-gray-600 mt-1"><strong>Order Date</strong> : {ordersFish.orderDate}</p>
            <p className="text-gray-600 mt-1"><strong>Order Type</strong> : {ordersFish.orderType}</p>
            <div className="mt-3 pt-3 border-t">
              <p className="text-gray-600 mt-1 font-bold">Fish Name : {ordersFish.fishname}</p>
              <p className="text-gray-600 mt-1"><strong>Price Rs</strong> : {ordersFish.price}.00/=</p>
              <p className="text-gray-600 mt-1"><strong>Qty of fish</strong> : {ordersFish.qty}</p>
              <p className="text-xl font-bold text-green-700 mt-2">Amount Rs : {ordersFish.amount}.00/=</p>
            </div>
            <p className="mt-3">
              <span
                className={`px-3 py-1 text-white rounded-full text-sm ${
                  ordersFish.status === "pending"
                    ? "bg-yellow-500"
                    : ordersFish.status === "success"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {ordersFish.status.toUpperCase()}
              </span>
            </p>

            {/* STATUS UPDATE */}
            <div className="mt-4">
              <select
                defaultValue={ordersFish.status}
                onChange={(e) => handleStatusUpdate(ordersFish._id, e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="pending">Pending</option>
                <option value="success">Success</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

          </div>
        ))}
      </div>

          
      <div className="mt-6">
        <button
            onClick={() => window.open("http://localhost:5000/api/v1/report/pdf", "_blank")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow cursor-pointer hover:bg-blue-700"
          >
          Download Orders Report
        </button>
      </div>
      


      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <span className="font-medium text-lg">{page} / {totalPages}</span>
        <button
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
