import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black text-[#7A341F] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#7A341F] text-[#7A341F] rounded-xl font-semibold hover:bg-[#7A341F]/5 transition-all"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 bg-[#7A341F] text-white rounded-xl font-semibold hover:bg-[#5C2415] transition-all"
          >
            <Home size={20} />
            Home
          </button>
        </div>
      </div>
    </div>
  );
}