import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { getAllFeedback } from "../services/feedback";

type FeedbackType = {
  _id: string;
  customername: string;
  email: string;
  ratings: number;
  feedback: string;
  createdAt: string;
};

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
   const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 6; // Cards per page

  useEffect(() => {
    loadFeedback();
  }, [page]);

  const loadFeedback = async () => {
    try {
      const res = await getAllFeedback(page, limit);

      setFeedbacks(res.data);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error(error);
    }
  };


  return (
      <div className="max-w-6xl mx-auto px-5">
        {/* Section Header */}
        <h2 className="text-4xl font-bold text-black mb-3">
          Manage Feedaback
        </h2>
        <p className=" text-gray-600  mx-auto mb-12">
          Hear from customers who enjoyed our smart aquarium experience.
        </p>

        {/* Feedback Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition"
            >
              {/* Rating Stars */}
              <div className="flex mb-3">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-xl ${
                      index < fb.ratings ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Feedback Message */}
              <p className="text-gray-700 italic leading-relaxed">
                "{fb.feedback.length > 160
                  ? fb.feedback.slice(0, 160) + "..."
                  : fb.feedback}"
              </p>

              <hr className="my-4" />

              {/* User Section */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sky-700 text-white flex items-center justify-center text-xl font-semibold">
                  {fb.customername.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">{fb.customername}</h4>
                  <p className="text-gray-500 text-sm">
                    {new Date(fb.createdAt).toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
          <div className="flex justify-center gap-4 mt-8">
            <button
                disabled={page === 1}
                className="px-4 py-2 bg-sky-200 text-black rounded"
                onClick={() => setPage((p) => p - 1)}
                >
                Previous
            </button>

            <span className="font-medium text-black text-lg">{page} / {totalPages}</span>

            <button
                disabled={page === totalPages}
                className="px-4 py-2 bg-sky-200 text-black rounded disabled:opacity-50"
                onClick={() => setPage((p) => p + 1)}
                >
                Next
            </button>
        </div>
        
      </div>
  );
}
