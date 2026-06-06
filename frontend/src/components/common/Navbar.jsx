// Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

import { Link, useNavigate } from "react-router-dom";
import {
  Video,
  Search,
  Pill,
  Stethoscope,
  Shield,
  HeartPulse,
  MapPin,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-white via-[#faf8f5] to-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-[#8c3b24]/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT - LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-br from-[#8c3b24] to-[#a04e2f] rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
            <HeartPulse className="text-white" size={28} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-[#8c3b24] to-[#a04e2f] bg-clip-text text-transparent">
            Sehat Setu
          </span>
        </Link>

        {/* CENTER - NAVIGATION */}
        <div className="hidden lg:flex items-center gap-10 text-gray-700 font-medium">
          <Link
            to="/patient/doctors"
            className="hover:text-[#8c3b24] transition-all duration-300 relative group"
          >
            Find Doctors
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8c3b24] to-[#a04e2f] group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            to="/patient/appointments"
            className="hover:text-[#8c3b24] transition-all duration-300 relative group"
          >
            Video Consult
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8c3b24] to-[#a04e2f] group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            to="/pharmacy-locator"
            className="hover:text-[#8c3b24] transition-all duration-300 relative group"
          >
            Pharmacy Locator
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8c3b24] to-[#a04e2f] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* RIGHT - AUTH & MENU */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="hidden sm:block text-[#8c3b24] font-semibold hover:text-[#73301d] transition-all duration-300 relative group"
              >
                Login
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8c3b24] group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/register"
                className="bg-gradient-to-r from-[#8c3b24] to-[#a04e2f] text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#8c3b24]/30 transition-all duration-300 transform hover:scale-105"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#8c3b24] to-[#a04e2f] text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#8c3b24]/30 transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                {user?.name || user?.fullName || "Profile"}
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-[#8c3b24]/10 overflow-hidden z-50 backdrop-blur-sm">
                  <button
                    onClick={() => {
                      navigate(
                        user?.role === "patient"
                          ? "/patient/dashboard"
                          : user?.role === "doctor"
                          ? "/doctor/dashboard"
                          : "/admin/dashboard"
                      );
                      setOpen(false);
                    }}
                    className="w-full text-left px-6 py-3.5 hover:bg-gradient-to-r hover:from-[#8c3b24]/10 hover:to-transparent border-b border-[#8c3b24]/5 transition-all duration-300 font-medium text-gray-700"
                  >
                    📊 Dashboard
                  </button>

                  {user?.role !== "admin" && (
                    <button
                      onClick={() => {
                        navigate(
                          user?.role === "patient"
                            ? "/patient/profile"
                            : "/doctor/profile"
                        );
                        setOpen(false);
                      }}
                      className="w-full text-left px-6 py-3.5 hover:bg-gradient-to-r hover:from-[#8c3b24]/10 hover:to-transparent border-b border-[#8c3b24]/5 transition-all duration-300 font-medium text-gray-700"
                    >
                      👤 Profile
                    </button>
                  )}

                  {user?.role === "doctor" && (
                    <button
                      onClick={() => {
                        navigate("/doctor/availability");
                        setOpen(false);
                      }}
                      className="w-full text-left px-6 py-3.5 hover:bg-gradient-to-r hover:from-[#8c3b24]/10 hover:to-transparent border-b border-[#8c3b24]/5 transition-all duration-300 font-medium text-gray-700"
                    >
                      📅 Availability
                    </button>
                  )}

                  {user?.role === "admin" && (
                    <button
                      onClick={() => {
                        navigate("/admin/pending-doctors");
                        setOpen(false);
                      }}
                      className="w-full text-left px-6 py-3.5 hover:bg-gradient-to-r hover:from-[#8c3b24]/10 hover:to-transparent border-b border-[#8c3b24]/5 transition-all duration-300 font-medium text-gray-700"
                    >
                      ⏳ Pending Doctors
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-6 py-3.5 text-red-600 hover:bg-red-50 transition-all duration-300 font-semibold"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#8c3b24]/10 transition-all duration-300"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-[#8c3b24]" />
            ) : (
              <Menu size={24} className="text-[#8c3b24]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-white to-[#faf8f5] border-t border-[#8c3b24]/10 px-6 py-4 space-y-3">
          <Link
            to="/patient/doctors"
            className="block py-3 px-4 rounded-lg hover:bg-[#8c3b24]/10 transition-all duration-300 font-medium text-gray-700"
          >
            Find Doctors
          </Link>
          <Link
            to="/patient/appointments"
            className="block py-3 px-4 rounded-lg hover:bg-[#8c3b24]/10 transition-all duration-300 font-medium text-gray-700"
          >
            Video Consult
          </Link>
          <Link
            to="/pharmacy-locator"
            className="block py-3 px-4 rounded-lg hover:bg-[#8c3b24]/10 transition-all duration-300 font-medium text-gray-700"
          >
            Pharmacy Locator
          </Link>
          {!isAuthenticated && (
            <Link
              to="/login"
              className="block py-3 px-4 rounded-lg hover:bg-[#8c3b24]/10 transition-all duration-300 font-medium text-gray-700"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;