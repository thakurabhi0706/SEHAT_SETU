import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { X, User, Mail, Lock, CheckCircle, AlertCircle, Users } from "lucide-react";
import { motion } from "framer-motion";

import {
  registerPatient,
  registerDoctor,
} from "../../api/authApi";

const PRIMARY_COLOR = "#7A341F";

function RegisterPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setError("");
      setSuccess("");

      if (role === "patient") {
        await registerPatient(formData);
      } else {
        await registerDoctor(formData);
      }

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const roleIcons = {
    patient: User,
    doctor: Users,
  };

  const passwordStrength = (pwd) => {
    if (!pwd) return { level: 0, color: "bg-gray-300", text: "" };
    if (pwd.length < 6) return { level: 1, color: "bg-red-500", text: "Weak" };
    if (pwd.length < 10) return { level: 2, color: "bg-yellow-500", text: "Fair" };
    return { level: 3, color: "bg-green-500", text: "Strong" };
  };

  const strength = passwordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f4ef] via-white to-[#faf8f5] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#7A341F]/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-300/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid md:grid-cols-2 border border-white/50 relative z-10"
      >
        {/* LEFT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:flex"
          style={{
            backgroundImage: "url('/images/rural-healthcare.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Multi-layer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#7A341F]/50 via-[#7A341F]/60 to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between p-14 text-white h-full">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="p-2 bg-gradient-to-br from-orange-400 to-rose-500 rounded-xl">
                  <Mail size={24} className="text-white" />
                </div>
                <span className="text-xl font-bold">Sehat Setu</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="uppercase tracking-[4px] text-xs text-orange-200 mb-6 font-semibold">
                Join Our Community
              </p>

              <h1 className="text-5xl md:text-6xl font-black leading-tight mb-8 drop-shadow-lg">
                Healthcare <br />
                <span className="bg-gradient-to-r from-orange-300 to-rose-300 bg-clip-text text-transparent">
                  For Every Village
                </span>
              </h1>

              <p className="text-lg text-orange-50 leading-8 max-w-md font-medium mb-6">
                Join a platform dedicated to accessible healthcare, trusted doctors, and digital medical support.
              </p>

              {/* Feature List */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="space-y-3"
              >
                {[
                  "24/7 Medical Support",
                  "Verified Healthcare Professionals",
                  "Secure & Private",
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    className="flex items-center gap-3 text-orange-100"
                  >
                    <CheckCircle size={18} className="flex-shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative p-10 md:p-14 bg-gradient-to-br from-white via-[#fcfaf8] to-[#faf8f5] overflow-y-auto max-h-screen md:max-h-none"
        >
          {/* CLOSE BUTTON */}
          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#7A341F] hover:bg-orange-50 rounded-full transition-all duration-300 z-50"
          >
            <X size={24} />
          </motion.button>

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-8 bg-gradient-to-b from-[#7A341F] to-orange-500 rounded-full" />
              <p className="text-[#7A341F] font-bold text-sm tracking-widest uppercase">
                Join Sehat Setu
              </p>
            </div>

            <h2 className="text-5xl font-black text-gray-900 mt-2">
              Register
            </h2>

            <p className="text-gray-600 mt-3 text-base leading-relaxed">
              Create your healthcare account
            </p>
          </motion.div>

          {/* ROLE SELECTOR */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex gap-3 mt-10"
          >
            {["patient", "doctor"].map((item) => {
              const Icon = roleIcons[item];
              return (
                <motion.button
                  key={item}
                  onClick={() => setRole(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 px-4 py-3 rounded-xl capitalize font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    role === item
                      ? "bg-gradient-to-r from-[#7A341F] to-orange-500 text-white shadow-lg shadow-[#7A341F]/40"
                      : "bg-white border-2 border-gray-200 text-gray-700 hover:border-[#7A341F]/30 hover:bg-orange-50/50"
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{item}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* FORM */}
          <form
            onSubmit={handleRegister}
            className="mt-10 space-y-5"
          >
            {/* NAME */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <User size={18} className="text-[#7A341F]" />
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border-2 border-gray-200 rounded-xl px-5 py-3 bg-white outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all duration-300 font-medium placeholder-gray-400"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Mail size={18} className="text-[#7A341F]" />
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full border-2 border-gray-200 rounded-xl px-5 py-3 bg-white outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all duration-300 font-medium placeholder-gray-400"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Lock size={18} className="text-[#7A341F]" />
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border-2 border-gray-200 rounded-xl px-5 py-3 bg-white outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all duration-300 font-medium placeholder-gray-400"
                required
              />

              {/* Password Strength Indicator */}
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(strength.level / 3) * 100}%` }}
                        className={`h-full ${strength.color}`}
                      />
                    </div>
                    <span className={`text-xs font-bold ${strength.level === 1 ? "text-red-500" : strength.level === 2 ? "text-yellow-500" : "text-green-500"}`}>
                      {strength.text}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {formData.password.length < 6 ? "Use at least 6 characters" : "Good password"}
                  </p>
                </motion.div>
              )}
            </div>

            {/* SUCCESS MESSAGE */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={success ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {success && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-green-700 text-sm font-semibold">
                    {success}
                  </p>
                </div>
              )}
            </motion.div>

            {/* ERROR MESSAGE */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={error ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm font-semibold">
                    {error}
                  </p>
                </div>
              )}
            </motion.div>

            {/* SUBMIT BUTTON */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#7A341F] to-orange-500 hover:shadow-xl hover:shadow-[#7A341F]/40 disabled:opacity-70 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-lg transition-all duration-300 mt-8 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          {/* FOOTER */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#7A341F] font-bold hover:text-orange-500 transition-colors duration-300 relative group"
              >
                Login Here
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#7A341F] to-orange-500 group-hover:w-full transition-all duration-300" />
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default RegisterPage;