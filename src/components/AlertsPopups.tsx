import { UserRoundX } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


export default function AlertPopups() {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop with strong blur */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-10 w-full max-w-sm overflow-hidden animate-pop">
        
        {/* Top Decorative Graphic */}
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-sky-400 via-blue-500 to-sky-600"></div>
        
        <div className="flex flex-col items-center text-center">
          {/* Icon Circle */}
          <div className="mb-6 relative">
            <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center text-sky-600 animate-pulse">
              <UserRoundX size={40} strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-400 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-1 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Text Content */}
          <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-3">
            Oops! <span className="text-sky-600">Hold on...</span>
          </h2>
          
          <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
            You need to be part of the <span className="text-slate-800 font-bold">AquaWorld</span> family to access this feature. Please sign in first.
          </p>

          {/* Buttons Stack */}
          <div className="w-full space-y-3">
            <Link
              to="/login"
              className="group relative flex items-center justify-center w-full bg-slate-900 text-white py-4 rounded-2xl font-bold tracking-wide overflow-hidden transition-all hover:bg-sky-600 active:scale-95 shadow-lg shadow-slate-200"
            >
              <span className="relative z-10">Sign In to Account</span>
            </Link>

            <Link
              to="/register"
              className="flex items-center justify-center w-full bg-white text-slate-600 py-4 rounded-2xl font-bold border-2 border-slate-100 hover:border-sky-200 hover:bg-sky-50 transition-all active:scale-95"
            >
              Create New Account
            </Link>
          </div>

          {/* Footer link */}
          <button 
            onClick={() => navigate(-1)}
            className="mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-sky-500 transition-colors cursor-pointer"
          >
            Maybe Later
          </button>
        </div>

        {/* Style Tag for animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pop {
            0% { transform: scale(0.9) translateY(20px); opacity: 0; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
          .animate-pop {
            animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
        `}} />
      </div>
    </div>

    
  );
}
