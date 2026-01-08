import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
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
  const [direction, setDirection] = useState(0);

  const limit = 4;

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

  // Slide animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-5xl font-bold text-sky-800 text-center mb-6">
          What Our Visitors Say
        </h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Discover our smart aquarium solutions from intelligent fish care
          systems to automated tank management tools.
        </p>

        {/* Animated Feedback Grid */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {feedbacks.map((fb) => (
              <motion.div
                key={fb._id}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition"
              >
                {/* Stars */}
                <div className="flex mb-3">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`text-xl ${
                        index < fb.ratings
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-gray-700 italic leading-relaxed">
                  "{fb.feedback.length > 160
                    ? fb.feedback.slice(0, 160) + "..."
                    : fb.feedback}"
                </p>

                <hr className="my-4" />

                {/* User */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-sky-700 text-white flex items-center justify-center text-xl font-semibold">
                    {fb.customername.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900">
                      {fb.customername}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {new Date(fb.createdAt).toLocaleString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            disabled={page === 1}
            onClick={() => {
              setDirection(-1);
              setPage((p) => p - 1);
            }}
            className="px-5 py-2 rounded bg-sky-200 text-black disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-lg font-semibold">
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => {
              setDirection(1);
              setPage((p) => p + 1);
            }}
            className="px-5 py-2 rounded bg-sky-200 text-black disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
