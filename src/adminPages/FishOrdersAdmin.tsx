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


  const downloadReport = async () => {
    try {
      const response = await fetch( 
        "https://fish-aquarium-backend-deployee.vercel.app/api/v1/report/pdf"
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "orders-report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-2 animate-in fade-in duration-700">
  
      {/* HEADER SECTION */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Fish Orders Management</h1>
          <p className="text-slate-500 font-medium mt-1">Monitor, track, and manage all incoming aquatic livestock orders.</p>
        </div>

        {/* DOWNLOAD REPORT BUTTON */}
        <button
          onClick={downloadReport}
          className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-sm active:scale-95"
        >
          <i className="bx bxs-file-pdf text-xl text-rose-500"></i>
          <span>Download Orders Report</span>
        </button>
      </div>

      {/* ORDER CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orderFishList.map((ordersFish) => (
          <div
            key={ordersFish._id}
            className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative flex flex-col"
          >
            {/* CUSTOMER HEADER */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl font-black">
                  {ordersFish.firstname.charAt(0)}{ordersFish.lastname.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 leading-tight">
                    {ordersFish.firstname} {ordersFish.lastname}
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</p>
                </div>
              </div>
              
              <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                ordersFish.status === "pending" ? "bg-amber-50 text-amber-600 border-amber-100" :
                ordersFish.status === "success" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                "bg-rose-50 text-rose-600 border-rose-100"
              }`}>
                {ordersFish.status}
              </div>
            </div>

            {/* ORDER LOGISTICS */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-slate-500 font-medium">
                <i className="bx bx-envelope mr-3 text-lg text-slate-300"></i>
                <span className="truncate">{ordersFish.email}</span>
              </div>
              <div className="flex items-center text-sm text-slate-500 font-medium">
                <i className="bx bx-map mr-3 text-lg text-slate-300"></i>
                <span className="truncate">{ordersFish.address}</span>
              </div>
              <div className="flex items-center text-sm text-slate-500 font-medium">
                <i className="bx bx-calendar mr-3 text-lg text-slate-300"></i>
                <span>{ordersFish.orderDate}</span>
              </div>
            </div>

            {/* PRODUCT HIGHLIGHT CARD */}
            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Details</span>
                <span className="text-[10px] font-black bg-white px-2 py-1 rounded-lg text-slate-600 border border-slate-100">{ordersFish.orderType}</span>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="text-slate-800 font-black tracking-tight">{ordersFish.fishname}</h4>
                  <p className="text-xs text-slate-500 font-bold mt-1">Qty: {ordersFish.qty} × Rs. {ordersFish.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Total Amount</p>
                  <p className="text-lg font-black text-emerald-600 tracking-tight">Rs. {ordersFish.amount}.00</p>
                </div>
              </div>
            </div>

            {/* STATUS UPDATE ACTION */}
            <div className="mt-auto pt-6 border-t border-slate-50">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">Update Order Status</label>
              <div className="relative">
                <select
                  defaultValue={ordersFish.status}
                  onChange={(e) => handleStatusUpdate(ordersFish._id, e.target.value)}
                  className="w-full bg-slate-100 border-none rounded-2xl px-5 py-3 text-sm text-slate-700 font-bold focus:ring-2 focus:ring-sky-500/20 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <i className="bx bx-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xl"></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PREMIUM PAGINATION BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-md mt-16">
        <button
          disabled={page === 1}
          className="flex items-center space-x-2 px-8 py-3 bg-slate-50 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-900 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
          onClick={() => setPage((p) => p - 1)}
        >
          <i className="bx bx-chevron-left text-xl"></i>
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-4 my-4 sm:my-0">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Page</span>
          <div className="w-12 h-12 bg-sky-50 text-sky-700 flex items-center justify-center rounded-2xl font-black text-lg shadow-inner">
            {page}
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">of {totalPages}</span>
        </div>

        <button
          disabled={page === totalPages}
          className="flex items-center space-x-2 px-8 py-3 bg-slate-50 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-900 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
          onClick={() => setPage((p) => p + 1)}
        >
          <span>Next</span>
          <i className="bx bx-chevron-right text-xl"></i>
        </button>
      </div>
    </div>
  );
}
