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
  ChevronDown
} from "lucide-react";

function Navbar() {
 
  const [open, setOpen] = useState(false);

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

        document.addEventListener(
          "mousedown",
          handleClickOutside
        );

        return () => {
          document.removeEventListener(
            "mousedown",
            handleClickOutside
          );
        };
      }, []);


  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <HeartPulse
            className="text-[#8c3b24]"
            size={30}
          />

          <span
            className="
              text-2xl
              font-bold
              text-[#8c3b24]
            "
          >
            Sehat Setu
          </span>
        </Link>

        {/* CENTER */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-8
            text-gray-700
            font-medium
          "
        >
          <Link
            to="/patient/doctors"
            className="
              hover:text-[#8c3b24]
              transition
            "
          >
            Find Doctors
          </Link>

          <Link
            to="/patient/appointments"
            className="
              hover:text-[#8c3b24]
              transition
            "
          >
            Video Consult
          </Link>

          <Link
            to="/pharmacy-locator"
            className="
              hover:text-[#8c3b24]
              transition
            "
          >
            Pharmacy Locator
          </Link>

          {/* <Link
            to="/admin/dashboard"
            className="
              hover:text-[#8c3b24]
              transition
            "
          >
            Admin
          </Link> */}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="
                  text-[#8c3b24]
                  font-medium
                  hover:text-[#73301d]
                  transition
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  bg-[#8c3b24]
                  text-white
                  px-5
                  py-2
                  rounded-xl
                  font-medium
                  hover:bg-[#73301d]
                  transition
                "
              >
                Register
              </Link>
            </>
          ) : (
            <div
              className="relative"
              ref={dropdownRef}
            >
              <button
                onClick={() => setOpen(!open)}
                className="
                  flex items-center
                  gap-2
                  bg-[#8c3b24]
                  text-white
                  px-4
                  py-2
                  rounded-xl
                  hover:bg-[#73301d]
                  transition
                "
              >
                {user?.name || user?.fullName || "Profile"}

                <ChevronDown size={18} />
              </button>

              {open && (
                <div
                  className="
                    absolute
                    right-0
                    mt-2
                    w-56
                    bg-white
                    rounded-2xl
                    shadow-xl
                    border
                    border-gray-100
                    overflow-hidden
                    z-50
                  "
                >

                  {/* Dashboard */}

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
                    className="
                      w-full
                      text-left
                      px-5
                      py-3
                      hover:bg-[#f7f4ef]
                    "
                  >
                    Dashboard
                  </button>

                  {/* Profile */}

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
                      className="
                        w-full
                        text-left
                        px-5
                        py-3
                        hover:bg-[#f7f4ef]
                      "
                    >
                      Profile
                    </button>
                  )}

                  {/* Doctor Availability */}

                  {user?.role === "doctor" && (
                    <button
                      onClick={() => {
                        navigate("/doctor/availability");
                        setOpen(false);
                      }}
                      className="
                        w-full
                        text-left
                        px-5
                        py-3
                        hover:bg-[#f7f4ef]
                      "
                    >
                      Availability
                    </button>
                  )}

                  {/* Admin Pending Doctors */}

                  {user?.role === "admin" && (
                    <button
                      onClick={() => {
                        navigate("/admin/pending-doctors");
                        setOpen(false);
                      }}
                      className="
                        w-full
                        text-left
                        px-5
                        py-3
                        hover:bg-[#f7f4ef]
                      "
                    >
                      Pending Doctors
                    </button>
                  )}

                  <div className="border-t" />

                  {/* Logout */}

                  <button
                    onClick={handleLogout}
                    className="
                      w-full
                      text-left
                      px-5
                      py-3
                      text-red-600
                      hover:bg-red-50
                    "
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;