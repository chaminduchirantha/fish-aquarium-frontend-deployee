import { useEffect, useState } from "react";
import { getAllAccessoriesOrder, updateAccessoriesOrderStatus } from "../services/accessoriesOrders";

interface OrdersAccessories {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  address: string;
  paymentmethod: string;
  amount: string;
  orderType: string;
  orderDate: string;
  itemname: string;
  description: string;
  price: string;
  qty: number;
  status: string;
}

export default function AccessoriesOrders() {
  const [orders, setOrders] = useState<OrdersAccessories[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;

  const loadData = async () => {
    try {
      const res = await getAllAccessoriesOrder(page, limit);
      setOrders(res.data);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Failed to load accessories orders:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateAccessoriesOrderStatus(id, newStatus);
      alert("Order status updated successfully!");
      loadData(); // refresh list
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="mt-5">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Accessories Orders Management</h2>
        <p className="text-gray-600 mt-2">Track and manage all accessories customer orders</p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              {order.firstname} {order.lastname}
            </h3>

            <p className="text-gray-600"><strong>Email:</strong> {order.email}</p>
            <p className="text-gray-600 mt-1"><strong>Address:</strong> {order.address}</p>
            <p className="text-gray-600 mt-1"><strong>Payment Method:</strong> {order.paymentmethod}</p>
            <p className="text-gray-600 mt-1"><strong>Order Date:</strong> {order.orderDate}</p>
            <p className="text-gray-600 mt-1"><strong>Order Type:</strong> {order.orderType}</p>

            <div className="mt-3 pt-3 border-t">
              <p className="font-bold text-gray-800">Item: {order.itemname}</p>
              <p className="text-gray-600">Price: Rs {order.price}.00</p>
              <p className="text-gray-600">Qty: {order.qty}</p>
              <p className="text-xl font-bold text-green-700 mt-2">
                Total: Rs {order.amount}.00/=
              </p>
              <p className="mt-3">
              <span
                className={`px-5 py-2 text-white rounded-full text-sm ${
                  order.status === "pending"
                    ? "bg-yellow-500"
                    : order.status === "success"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {order.status.toUpperCase()}
              </span>
            </p>

              <div className="mt-4">
                <select
                  defaultValue={order.status}
                  onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  className="w-full border p-2 rounded-xl cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
            onClick={() => window.open("http://localhost:5000/api/v1/report/acce/pdf", "_blank")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow cursor-pointer hover:bg-blue-700"
          >
          Download Orders Report
        </button>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-lg font-medium">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  );
}
