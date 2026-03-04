import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { getAllFish , deleteFish } from "../services/Fish";
import { Edit2, Trash2 } from "lucide-react";
import { showErrorAlert, showSuccessAlert } from "../util/alerts";

interface Fish {
  _id: string;
  fishName: string;
  price: string;
  description: string;
  fishCategory: string;
  imageUrl: string;
}

interface FishCardGridProps {
  onEditClick?: (fish: Fish) => void;
  onDeleteSuccess?: () => void;
}

export interface FishCardGridHandle {
  refreshData: () => void;
}

const FishCardGrid = forwardRef<FishCardGridHandle, FishCardGridProps>(({ onEditClick,onDeleteSuccess}, ref) => {
  const [fishList, setFishList] = useState<Fish[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;

  const loadData = async () => {
    const res = await getAllFish(page, limit);
    setFishList(res.data);
    setTotalPages(res.totalPages);
  };

   const handleDelete = async (id: string) => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this fish?"
      );
      if (!confirmDelete) return;

      try {
        await deleteFish(id);
        showSuccessAlert("Fish deleted successfully!");
        loadData();
        onDeleteSuccess?.();
      } catch (err) {
        showErrorAlert("Failed to delete fish.");
      }
    };

  useImperativeHandle(ref, () => ({
    refreshData: () => {
      loadData();
    }
  }));

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <div className="mt-12 space-y-12 animate-in fade-in duration-700">
      {/* FISH CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fishList.map((fish) => (
          <div
            key={fish._id}
            className="group bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative flex flex-col h-full"
          >
            {/* IMAGE CONTAINER WITH ZOOM EFFECT */}
            <div className="relative h-52 w-full overflow-hidden rounded-xl shadow-inner bg-slate-100">
              <img
                src={fish.imageUrl}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={fish.fishName}
              />
              
              {/* QUICK ACTION OVERLAY (APPEARS ON HOVER) */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => onEditClick?.(fish)}
                  className="bg-white/90 backdrop-blur-md text-blue-600 p-2.5 rounded-xl shadow-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
                  title="Edit Fish"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(fish._id)}
                  className="bg-white/90 backdrop-blur-md text-red-600 p-2.5 rounded-xl shadow-lg hover:bg-red-600 hover:text-white transition-all transform hover:scale-110"
                  title="Delete Fish"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* PRICE BADGE ON IMAGE */}
              <div className="absolute bottom-3 left-3">
                <span className="bg-slate-900/80 backdrop-blur-md text-white px-4 py-1.5 rounded-xl text-sm font-black shadow-lg">
                    Rs. {fish.price}
                </span>
              </div>
            </div>

            {/* FISH CONTENT */}
            <div className="flex flex-col flex-1 mt-5 px-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-lg border border-sky-100">
                  {fish.fishCategory}
                </span>
              </div>
              
              <h3 className="text-xl font-black text-slate-800 tracking-tight line-clamp-1 mb-2">
                {fish.fishName}
              </h3>
              
              <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed flex-1">
                {fish.description}
              </p>

              <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center text-emerald-500 text-xs font-bold">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
                  In Stock
                </div>
                <i className="bx bx-right-arrow-alt text-2xl text-slate-300 group-hover:text-sky-500 transition-colors"></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PREMIUM PAGINATION BAR (Matching User Grid) */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-md mt-12">
        <button
          disabled={page === 1}
          className="flex items-center space-x-2 px-8 py-3 bg-slate-50 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-900 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
          onClick={() => setPage((p) => p - 1)}
        >
          <i className="bx bx-chevron-left text-xl"></i>
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-4 my-4 sm:my-0">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Inventory Page</span>
          <div className="w-12 h-12 bg-sky-50 text-sky-700 flex items-center justify-center rounded-2xl font-black text-lg shadow-inner">
            {page}
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">of {totalPages}</span>
        </div>

        <button
          disabled={page === totalPages}
          className="flex items-center space-x-2 px-8 py-3 bg-slate-50 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-900 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
          onClick={() => setPage((p) => p + 1)}
        >
          <span>Next</span>
          <i className="bx bx-chevron-right text-xl"></i>
        </button>
      </div>
    </div>
  );
});

FishCardGrid.displayName = "FishCardGrid";

export default FishCardGrid;
