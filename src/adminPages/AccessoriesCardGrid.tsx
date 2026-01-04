import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { deleteAccessories, getAllAccessories } from "../services/accessories";

interface Accessories {
  _id: string;
  itemname: string;
  price: string;
  description: string;
  imageUrl: string;
}

interface AccessoriesCardGridProps {
  onEditClick?: (accessories: Accessories) => void;
  onDeleteSuccess?: () => void;
}

export interface AcccessoriesCardGridHandle {
  refreshData: () => void;
}

const AcccessoriesCardGrid = forwardRef<AcccessoriesCardGridHandle, AccessoriesCardGridProps>(({ onEditClick,onDeleteSuccess}, ref) => {
  const [accessoriesList, setAcceesoriesList] = useState<Accessories[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  const loadData = async () => {
    const res = await getAllAccessories(page, limit);
    setAcceesoriesList(res.data);
    setTotalPages(res.totalPages);
  };

   const handleDelete = async (id: string) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Accessories?"
      );
      if (!confirmDelete) return;

      try {
        await deleteAccessories(id);
        alert("Accessories deleted successfully!");
        loadData();
        onDeleteSuccess?.();
      } catch (err) {
        alert("Failed to delete fish.");
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
    <div className="mt-10">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {accessoriesList.map((accessories) => (
          <div
            key={accessories._id}
            className="bg-white rounded-xl shadow-md p-4 border relative hover:shadow-lg transition"
          >
            {/* Edit and Delete Icons */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => onEditClick?.(accessories)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition shadow-md"
                title="Edit"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(accessories._id)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition shadow-md"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <img
              src={accessories.imageUrl}
              className="w-full h-48 object-cover rounded-md"
              alt={accessories.itemname}
            />

            <h3 className="text-lg font-semibold mt-3">{accessories.itemname}</h3>
            <p className="text-gray-600 text-sm">{accessories.description}</p>

            <div className="mt-3 flex justify-between text-sm">
              <span className="font-semibold text-green-700">{accessories.price}</span>
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
});

AcccessoriesCardGrid.displayName = "AcccessoriesCardGrid";

export default AcccessoriesCardGrid;
