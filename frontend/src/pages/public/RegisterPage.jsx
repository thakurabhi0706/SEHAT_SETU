import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { X } from "lucide-react";

import {
  registerPatient,
  registerDoctor,
} from "../../api/authApi";

function RegisterPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

    try {
      setError("");
      setSuccess("");

      if (role === "patient") {
        await registerPatient(formData);
      } else {
        await registerDoctor(formData);
      }

      setSuccess("Registration successful");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center px-6 py-10">
      
      <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden max-w-6xl w-full grid md:grid-cols-2">
        
        {/* LEFT SECTION */}
        <div
          className="relative hidden md:flex"
          style={{
            backgroundImage:
              "url('/images/rural-healthcare.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#8c3b24]/60 to-[#1e293b]/70"></div>

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col justify-end p-14 text-white">
            <p className="uppercase tracking-[4px] text-sm text-orange-100 mb-4">
              Sehat Setu
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              Healthcare <br />
              For Every Village
            </h1>

            <p className="mt-6 text-lg text-orange-50 leading-8 max-w-md">
              Join a platform dedicated to accessible healthcare,
              trusted doctors, and digital medical support across India.
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="relative p-10 md:p-14 bg-white">

          {/* CLOSE BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-6 right-6 text-gray-500 hover:text-black transition"
          >
            <X size={24} />
          </button>

          {/* HEADER */}
          <div>
            <p className="text-[#c26a3d] font-semibold tracking-wide">
              Join Sehat Setu
            </p>

            <h2 className="text-5xl font-bold text-gray-900 mt-2">
              Register
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              Create your healthcare account
            </p>
          </div>

          {/* ROLE SELECTOR */}
          <div className="flex gap-3 mt-10">
            {["patient", "doctor"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`px-6 py-3 rounded-2xl capitalize font-semibold transition-all duration-300 ${
                  role === item
                    ? "bg-[#8c3b24] text-white shadow-lg"
                    : "bg-[#f3ede6] text-gray-700 hover:bg-[#eadfce]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* FORM */}
          <form
            onSubmit={handleRegister}
            className="mt-10 space-y-6"
          >
            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-[#e7d8c9] rounded-2xl px-5 py-4 bg-[#fcfaf8] outline-none focus:border-[#c26a3d] focus:ring-2 focus:ring-[#c26a3d]/20 transition"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-[#e7d8c9] rounded-2xl px-5 py-4 bg-[#fcfaf8] outline-none focus:border-[#c26a3d] focus:ring-2 focus:ring-[#c26a3d]/20 transition"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full border border-[#e7d8c9] rounded-2xl px-5 py-4 bg-[#fcfaf8] outline-none focus:border-[#c26a3d] focus:ring-2 focus:ring-[#c26a3d]/20 transition"
                required
              />
            </div>

            {/* SUCCESS */}
            {success && (
              <p className="text-green-600 text-sm">
                {success}
              </p>
            )}

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#8c3b24] hover:bg-[#71301d] text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg"
            >
              Create Account
            </button>
          </form>

          {/* FOOTER */}
          <p className="mt-8 text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#c26a3d] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;