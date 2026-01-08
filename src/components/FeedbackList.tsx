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
  const [index, setIndex] = useState(0);

  const VISIBLE_CARDS = 4; // show 4 cards at a time
  const SLIDE_INTERVAL = 3000; // 4 seconds

  useEffect(() => {
    loadFeedback();
  }, []);

  useEffect(() => {
    if (feedbacks.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) =>
        prev + VISIBLE_CARDS >= feedbacks.length ? 0 : prev + VISIBLE_CARDS
      );
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [feedbacks]);

  const loadFeedback = async () => {
    try {
      const res = await getAllFeedback(1, 100); // load all
      setFeedbacks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const visibleFeedbacks = feedbacks.slice(
    index,
    index + VISIBLE_CARDS
  );

  return (
    <section className="py-12 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-5xl font-bold text-sky-800 text-center mb-6">
          What Our Visitors Say
        </h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Discover our smart aquarium solutions from intelligent fish care
          systems to automated tank management tools.
        </p>

        {/* Infinite Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {visibleFeedbacks.map((fb) => (
              <motion.div
                key={fb._id}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition"
              >
                {/* Stars */}
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xl ${
                        i < fb.ratings
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
      </div>
    </section>
  );
}
