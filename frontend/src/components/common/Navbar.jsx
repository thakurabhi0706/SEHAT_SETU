import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  ChevronDown,
  Menu,
  X,
  LogOut,
  User,
  LayoutDashboard,
  Calendar
} from "lucide-react";

const PRIMARY_COLOR = "#7A341F";

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

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 }
    })
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  return (
    <nav className="bg-gradient-to-r from-white via-[#faf8f5] to-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-[#7A341F]/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT - LOGO */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="p-2 bg-gradient-to-br from-[#7A341F] to-orange-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
            >
              <HeartPulse className="text-white" size={28} />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#7A341F] to-orange-500 bg-clip-text text-transparent">
              Sehat Setu
            </span>
          </Link>
        </motion.div>

        {/* CENTER - NAVIGATION */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="hidden lg:flex items-center gap-10 text-gray-700 font-medium"
        >
          {[
            { to: "/patient/doctors", label: "Find Doctors" },
            { to: "/patient/appointments", label: "Video Consult" },
            { to: "/pharmacy-locator", label: "Pharmacy Locator" }
          ].map((link, i) => (
            <Link
              key={i}
              to={link.to}
              className="hover:text-[#7A341F] transition-all duration-300 relative group"
            >
              {link.label}
              <motion.span
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#7A341F] to-orange-500"
              />
            </Link>
          ))}
        </motion.div>

        {/* RIGHT - AUTH & MENU */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="hidden sm:block text-[#7A341F] font-semibold hover:text-orange-500 transition-all duration-300 relative group"
                >
                  Login
                  <motion.span
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#7A341F] to-orange-500"
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-[#7A341F] to-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#7A341F]/40 transition-all duration-300"
                >
                  Register
                </Link>
              </motion.div>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setOpen(!open)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-[#7A341F] to-orange-500 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#7A341F]/40 transition-all duration-300 font-semibold"
              >
                {user?.name || user?.fullName || "Profile"}
                <motion.div
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#7A341F]/10 overflow-hidden z-50"
                  >
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-[#7A341F]/10 to-orange-100/10 px-6 py-4 border-b border-[#7A341F]/10">
                      <p className="font-bold text-gray-900">
                        {user?.name || user?.fullName}
                      </p>
                      <p className="text-xs text-gray-600 capitalize mt-1">
                        {user?.role}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <motion.button
                        custom={0}
                        variants={menuItemVariants}
                        initial="hidden"
                        animate="visible"
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
                        className="w-full text-left px-6 py-3 hover:bg-gradient-to-r hover:from-[#7A341F]/10 hover:to-orange-100/10 border-b border-[#7A341F]/5 transition-all duration-300 font-medium text-gray-700 flex items-center gap-3 group"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="text-[#7A341F]"
                        >
                          <LayoutDashboard size={18} />
                        </motion.div>
                        Dashboard
                      </motion.button>

                      {user?.role !== "admin" && (
                        <motion.button
                          custom={1}
                          variants={menuItemVariants}
                          initial="hidden"
                          animate="visible"
                          onClick={() => {
                            navigate(
                              user?.role === "patient"
                                ? "/patient/profile"
                                : "/doctor/profile"
                            );
                            setOpen(false);
                          }}
                          className="w-full text-left px-6 py-3 hover:bg-gradient-to-r hover:from-[#7A341F]/10 hover:to-orange-100/10 border-b border-[#7A341F]/5 transition-all duration-300 font-medium text-gray-700 flex items-center gap-3"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className="text-[#7A341F]"
                          >
                            <User size={18} />
                          </motion.div>
                          Profile
                        </motion.button>
                      )}

                      {user?.role === "doctor" && (
                        <motion.button
                          custom={2}
                          variants={menuItemVariants}
                          initial="hidden"
                          animate="visible"
                          onClick={() => {
                            navigate("/doctor/availability");
                            setOpen(false);
                          }}
                          className="w-full text-left px-6 py-3 hover:bg-gradient-to-r hover:from-[#7A341F]/10 hover:to-orange-100/10 border-b border-[#7A341F]/5 transition-all duration-300 font-medium text-gray-700 flex items-center gap-3"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className="text-[#7A341F]"
                          >
                            <Calendar size={18} />
                          </motion.div>
                          Availability
                        </motion.button>
                      )}

                      {user?.role === "admin" && (
                        <motion.button
                          custom={2}
                          variants={menuItemVariants}
                          initial="hidden"
                          animate="visible"
                          onClick={() => {
                            navigate("/admin/pending-doctors");
                            setOpen(false);
                          }}
                          className="w-full text-left px-6 py-3 hover:bg-gradient-to-r hover:from-[#7A341F]/10 hover:to-orange-100/10 border-b border-[#7A341F]/5 transition-all duration-300 font-medium text-gray-700 flex items-center gap-3"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className="text-[#7A341F]"
                          >
                            <Calendar size={18} />
                          </motion.div>
                          Pending Doctors
                        </motion.button>
                      )}

                      <motion.button
                        custom={3}
                        variants={menuItemVariants}
                        initial="hidden"
                        animate="visible"
                        onClick={handleLogout}
                        className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 transition-all duration-300 font-semibold flex items-center gap-3"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                        >
                          <LogOut size={18} />
                        </motion.div>
                        Logout
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 rounded-lg hover:bg-[#7A341F]/10 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} className="text-[#7A341F]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} className="text-[#7A341F]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden bg-gradient-to-b from-white to-[#faf8f5] border-t border-[#7A341F]/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-2">
              {[
                { to: "/patient/doctors", label: "Find Doctors" },
                { to: "/patient/appointments", label: "Video Consult" },
                { to: "/pharmacy-locator", label: "Pharmacy Locator" },
                ...(isAuthenticated
                  ? []
                  : [{ to: "/login", label: "Login" }])
              ].map((link, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-4 rounded-lg hover:bg-[#7A341F]/10 transition-all duration-300 font-medium text-gray-700"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;