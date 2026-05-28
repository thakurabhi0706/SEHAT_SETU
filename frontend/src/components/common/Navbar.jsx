import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LEFT */}
        <Link to="/" className="flex items-center gap-2">
          <HeartPulse className="text-blue-600" size={30} />
          <span className="text-2xl font-bold text-blue-600">
            Sehat Setu
          </span>
        </Link>

        {/* CENTER */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link
            to="/patient/doctors"
            className="hover:text-blue-600 transition"
          >
            Find Doctors
          </Link>

          <Link
            to="/patient/appointments"
            className="hover:text-blue-600 transition"
          >
            Video Consult
          </Link>

          <Link
            to="/pharmacy-locator"
            className="hover:text-blue-600 transition"
          >
            Pharmacy Locator
          </Link>

          <Link
            to="/admin/dashboard"
            className="hover:text-blue-600 transition"
          >
            Admin
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;