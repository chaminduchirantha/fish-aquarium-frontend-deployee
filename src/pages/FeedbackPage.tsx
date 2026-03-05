import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { feedabckSave } from "../services/feedback";

const FeedbackForm: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [customername , setCustomerName] = useState("")
  const [email , setEmail] = useState("")
  const [loading, setLoading] = useState<boolean>(false);


  const handleSubmit = async()=>{
    if (!customername || !email || !rating || !feedback) {
      alert("Please fill all fields and select a rating.");
      return;
    }

    setLoading(true);

    const feedbackData = {
      customername,
      email,
      ratings: rating,
      feedback,
    };

     try {
      await feedabckSave(feedbackData);
      alert("Feedback Submitted Successfully!");

      // Clear Form
      setCustomerName("");
      setEmail("");
      setRating(0);
      setFeedback("");

    } catch (error) {
      console.error(error);
      alert("Error submitting feedback.");
    } finally {
      setLoading(false);
    }

  }


  return (
    <section className="py-20 bg-slate-50 min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-sm border border-slate-200 p-8 md:p-14 rounded-[2.5rem] shadow-2xl shadow-slate-200/50">
        
        {/* Title Section */}
        <header className="text-center mb-12">
          <span className="text-sky-600 font-bold tracking-widest uppercase text-xs">Feedback</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-3">
            Share Your <span className="text-sky-600">Experience</span>
          </h1>
          <p className="text-slate-500 mt-4 max-w-lg mx-auto leading-relaxed">
            Your insights help us refine our smart aquarium technology. 
            Tell us how we’re doing!
          </p>
        </header>

        {/* Form Container */}
        <div className="space-y-8">
          
          {/* Name + Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group">
              <label className="text-slate-700 font-semibold block mb-2 ml-1 text-sm">Full Name</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={customername}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-sky-100 focus:border-sky-500 outline-none transition-all duration-300 placeholder:text-slate-400"
              />
            </div>

            <div className="group">
              <label className="text-slate-700 font-semibold block mb-2 ml-1 text-sm">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-sky-100 focus:border-sky-500 outline-none transition-all duration-300 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Star Rating Section */}
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center">
            <label className="text-slate-700 font-bold block mb-4">How would you rate us?</label>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-4xl cursor-pointer transition-all duration-300 transform ${
                    star <= (hover || rating) ? "text-yellow-400 scale-125 drop-shadow-md" : "text-slate-300 scale-100"
                  } hover:scale-110`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
            </div>
            {rating > 0 && (
              <p className="mt-3 text-sky-600 font-medium animate-pulse text-sm">
                {rating === 5 ? "Loved it! 😍" : rating >= 3 ? "Good! 🙂" : "We'll improve! 👍"}
              </p>
            )}
          </div>

          {/* Feedback Textarea */}
          <div>
            <label className="text-slate-700 font-semibold block mb-2 ml-1 text-sm">Your Message</label>
            <textarea
              placeholder="Describe your experience with our smart systems..."
              maxLength={500}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl h-40 focus:ring-4 focus:ring-sky-100 focus:border-sky-500 outline-none transition-all duration-300 resize-none placeholder:text-slate-400"
            ></textarea>
            <div className="flex justify-end mt-2">
              <span className={`text-xs font-medium ${feedback.length > 450 ? 'text-red-500' : 'text-slate-400'}`}>
                {feedback.length} / 500 characters
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleSubmit} 
            disabled={loading} 
            className="group relative w-full overflow-hidden bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-sky-600 transition-all duration-500 shadow-xl shadow-slate-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Send Feedback"
              )}
            </span>
          </button>

        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;
