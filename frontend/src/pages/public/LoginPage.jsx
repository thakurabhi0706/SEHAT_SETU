import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { X } from "lucide-react";

import {
  loginPatient,
  loginDoctor,
  loginAdmin,
} from "../../api/authApi";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../features/auth/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    dispatch(loginStart());

    let response;

    if (role === "patient") {
      response = await loginPatient(formData);
    } else if (role === "doctor") {
      response = await loginDoctor(formData);
    } else {
      response = await loginAdmin(formData);
    }

    dispatch(loginSuccess(response));

    const user = response.user;

    // PATIENT
    if (role === "patient") {
      navigate("/patient/dashboard");
    }

    // DOCTOR
    else if (role === "doctor") {
      
      // IF PROFILE NOT COMPLETED
      if (!user.profileCompleted) {
        navigate("/doctor/complete-profile");
      }

      // IF PROFILE COMPLETED
      else {
        navigate("/doctor/dashboard");
      }
    }

    // ADMIN
    else {
      navigate("/admin/dashboard");
    }

  } catch (err) {
    dispatch(loginFailure());

    setError(
      err.response?.data?.message || "Login failed"
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
              Beyond Cities
            </h1>

            <p className="mt-6 text-lg text-orange-50 leading-8 max-w-md">
              Bringing trusted healthcare, digital consultations,
              and medical accessibility to every town and village.
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
              Welcome Back
            </p>

            <h2 className="text-5xl font-bold text-gray-900 mt-2">
              Login
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              Sign in to continue your healthcare journey
            </p>
          </div>

          {/* ROLE SELECTOR */}
          <div className="flex gap-3 mt-10">
            {["patient", "doctor", "admin"].map((item) => (
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
            onSubmit={handleLogin}
            className="mt-10 space-y-6"
          >
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
                placeholder="Enter your password"
                className="w-full border border-[#e7d8c9] rounded-2xl px-5 py-4 bg-[#fcfaf8] outline-none focus:border-[#c26a3d] focus:ring-2 focus:ring-[#c26a3d]/20 transition"
                required
              />
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#8c3b24] hover:bg-[#71301d] text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg"
            >
              Login
            </button>
          </form>

          {/* FOOTER */}
          <p className="mt-8 text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#c26a3d] font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;