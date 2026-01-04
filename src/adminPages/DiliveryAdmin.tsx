import { useEffect, useState} from "react";
import { getAllDelivery } from "../services/delivery";

interface Delivery {
  _id: string;
  customername : string
  phonenumber : string
  email : string
  address : string
  city : string
  deliveryDate : string
  deliveryTime : string
  postelCode : string
}

export default function DeliveryAdmin(){
  const [deliveryList, setDeliveryList] = useState<Delivery[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;

  const loadData = async () => {
    try {
      const res = await getAllDelivery(page, limit);
      setDeliveryList(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };


  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <div className="mt-5">

      <div>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Dilivery Management</h2>
          <p className="text-gray-600 mt-2">Track and manage all customer Deliveries</p>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliveryList.map((delivery) => (
          <div
            key={delivery._id}
            className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition"
          >
            <p className="text-gray-600 mt-1"><strong>Customer Name</strong> : {delivery.customername}</p>
            <p className="text-gray-600 mt-1"><strong>Customer Email</strong> : {delivery.email}</p>
            <p className="text-gray-600 mt-1"><strong>Phone number</strong> : {delivery.phonenumber}</p>
            <p className="text-gray-600 mt-1"><strong>Address</strong> : {delivery.address}</p>
            <p className="text-gray-600 mt-1"><strong>City</strong> : {delivery.city}</p>
            <p className="text-gray-600 mt-1"><strong>Postel coded</strong> : {delivery.postelCode}</p>
            <p className="text-gray-600 mt-1"><strong>Delivery Date</strong> : {delivery.deliveryDate}</p>
            <p className="text-gray-600 mt-1"><strong>Delivery Time</strong> : {delivery.deliveryTime}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
    </div>
  );
}
