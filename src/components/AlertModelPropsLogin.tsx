
interface AlertModalProps {
  title: string;
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function AlertModal({ title, message, show}: AlertModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white text-gray-900 p-6 rounded-2xl w-full max-w-sm shadow-xl animate-fadeIn">
        {/* Title */}
        <h2 className="text-4xl text-center font-bold mb-2">{title} !</h2>

        {/* Message */}
        <p className="text-sm text-center text-gray-700 mb-5">{message}</p>

        {/* Buttons */}
        <div className="flex justify-between gap-3 mb-3">
          <a
            href="/login"
            className="w-full bg-sky-600 text-white py-2 rounded-lg text-center hover:bg-sky-700 transition"
          >
            Login
          </a>

          <a
            href="/register"
            className="w-full bg-gray-200 py-2 rounded-lg text-center hover:bg-gray-300 transition"
          >
            Register
          </a>
        </div>

        {/* Close Button
        <button
          onClick={onClose}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Close
        </button> */}
      </div>
       <style>{`
        @keyframes pop {
        0% { transform: scale(0.8); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
        }

        .animate-pop {
        animation: pop 0.15s ease-out forwards;
        }

      `}</style>
    </div>
  );
}
