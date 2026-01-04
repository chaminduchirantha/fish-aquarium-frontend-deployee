import { useEffect, useState} from "react";
import { getAllPayment } from "../services/payment";

interface Payment {
  _id: string;
 email : string
  phonenumber : string
  cardHolderName : string
  paymentDate : string
  amount : string
}

export default function PaymentAdmin(){
  const [paymentList, setPaymentList] = useState<Payment[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;

  const loadData = async () => {
    try {
      const res = await getAllPayment(page, limit);
      setPaymentList(res.data);
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
          <h2 className="text-3xl font-bold text-gray-800">Payment Management</h2>
          <p className="text-gray-600 mt-2">Track and manage all customer Payment</p>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentList.map((payment) => (
          <div
            key={payment._id}
            className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition"
          >
            <p className="text-gray-600 mt-1"><strong>Customer Email</strong> : {payment.email}</p>
            <p className="text-gray-600 mt-1"><strong>Phone number</strong> : {payment.phonenumber}</p>
            <p className="text-gray-600 mt-1"><strong>Card Holder Name</strong> : {payment.cardHolderName}</p>
           
            <div className="mt-3 pt-3 border-t">
              <p className="text-gray-600 mt-1"><strong>Payment Date :</strong> : {payment.paymentDate}</p>
              <p className="text-xl font-bold text-green-700 mt-2">Amount Rs : {payment.amount}.00/=</p>
            </div>
            
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
