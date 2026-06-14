import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle, Upload, Loader } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { uploadFile } from "../../services/uploadService";

const PRIMARY_COLOR = "#7A341F";

function DoctorCompleteProfile() {
  const navigate = useNavigate();
  const [licenseFile, setLicenseFile] = useState(null);
  const [degreeFile, setDegreeFile] = useState(null);
  const [idProofFile, setIdProofFile] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    phone: "",
    specialization: "",
    medicalLicenseNumber: "",
    yearsOfExperience: "",
    consultationFee: "",
    hospitalName: "",
    clinicAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await api.put(
        "/doctor/profile",
        {
          ...formData,
          uploadedDocuments: [
            licenseFile,
            degreeFile,
            idProofFile,
          ].filter(Boolean),
          profileCompleted: true,
        }
      );

      console.log(response.data);
      setSuccess("Profile submitted for verification!");

      setTimeout(() => {
        navigate("/doctor/pending");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Profile update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file, type) => {
    try {
      setUploading(true);

      const uploaded = await uploadFile(file);

      const documentData = {
        documentType: type,
        fileName: file.name,
        fileUrl: uploaded.fileUrl,
      };

      if (type === "License") {
        setLicenseFile(documentData);
      }

      if (type === "Degree") {
        setDegreeFile(documentData);
      }

      if (type === "ID Proof") {
        setIdProofFile(documentData);
      }

    } catch (error) {
      console.log(error);
      setError("File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f4ef] via-white to-[#faf8f5] py-10 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#7A341F]/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-300/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-5xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 border border-white/50 relative z-10"
      >
        {/* LEFT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex relative"
          style={{
            backgroundImage: "url('/images/rural-healthcare.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Multi-layer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#7A341F]/50 via-[#7A341F]/60 to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

          <div className="relative z-10 flex flex-col justify-between p-14 text-white h-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <p className="uppercase tracking-[4px] text-xs text-orange-200 mb-6 font-semibold">
                Doctor Verification
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-black leading-tight mb-8 drop-shadow-lg">
                Complete <br />
                <span className="bg-gradient-to-r from-orange-300 to-rose-300 bg-clip-text text-transparent">
                  Your Profile
                </span>
              </h1>

              <p className="text-lg text-orange-50 leading-8 font-medium">
                Help us verify your medical credentials and connect you with patients across rural India.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-10 md:p-14 bg-gradient-to-br from-white via-[#fcfaf8] to-[#faf8f5] overflow-y-auto max-h-screen md:max-h-none"
        >
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-8 bg-gradient-to-b from-[#7A341F] to-orange-500 rounded-full" />
              <p className="text-[#7A341F] font-bold text-sm tracking-widest uppercase">
                Doctor Onboarding
              </p>
            </div>

            <h2 className="text-5xl font-black text-gray-900 mt-2">
              Professional Details
            </h2>

            <p className="text-gray-600 mt-3 text-base">
              Complete your medical profile for verification
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="mt-10 space-y-5"
          >
            {/* PERSONAL INFO SECTION */}
            <div className="space-y-5 pb-6 border-b border-gray-200">
              <p className="text-sm font-bold text-[#7A341F] uppercase tracking-widest">
                Personal Information
              </p>

              <div className="grid grid-cols-2 gap-4">
                {/* AGE */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="30"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 bg-white outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all duration-300 text-sm"
                    required
                  />
                </div>

                {/* GENDER */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 bg-white outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all duration-300 text-sm"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 bg-white outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* PROFESSIONAL INFO SECTION */}
            <div className="space-y-5 pb-6 border-b border-gray-200">
              <p className="text-sm font-bold text-[#7A341F] uppercase tracking-widest">
                Professional Information
              </p>

              {/* SPECIALIZATION */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="e.g., Cardiologist, Dentist"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 bg-white outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all duration-300"
                  required
                />
              </div>

              {/* LICENSE */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Medical License Number
                </label>
                <input
                  type="text"
                  name="medicalLicenseNumber"
                  value={formData.medicalLicenseNumber}
                  onChange={handleChange}
                  placeholder="e.g., MCI123456"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 bg-white outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all duration-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* EXPERIENCE */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    placeholder="10"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 bg-white outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all duration-300 text-sm"
                    required
                  />
                </div>

                {/* CONSULTATION FEE */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Consultation Fee (₹)
                  </label>
                  <input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    placeholder="500"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 bg-white outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all duration-300 text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            {/* CLINIC INFO SECTION */}
            <div className="space-y-5 pb-6 border-b border-gray-200">
              <p className="text-sm font-bold text-[#7A341F] uppercase tracking-widest">
                Clinic Information
              </p>

              {/* HOSPITAL */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Hospital/Clinic Name
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  placeholder="Enter hospital name"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 bg-white outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all duration-300"
                />
              </div>

              {/* ADDRESS */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Clinic Address
                </label>
                <textarea
                  name="clinicAddress"
                  value={formData.clinicAddress}
                  onChange={handleChange}
                  placeholder="Enter clinic address"
                  rows="3"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 bg-white outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all duration-300 resize-none"
                />
              </div>
            </div>

            {/* DOCUMENT UPLOAD SECTION */}
            <div className="space-y-5">
              <p className="text-sm font-bold text-[#7A341F] uppercase tracking-widest">
                Document Verification
              </p>

              {/* License Upload */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Medical License Certificate
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileUpload(e.target.files[0], "License")
                    }
                    className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-white outline-none focus:border-[#7A341F] transition-all duration-300 cursor-pointer"
                    disabled={uploading}
                  />
                  {licenseFile && (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 bg-green-500 rounded-full p-1.5"
                    >
                      <CheckCircle size={20} className="text-white" />
                    </motion.div>
                  )}
                </div>
                {licenseFile && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-sm font-medium mt-2"
                  >
                    ✓ License uploaded successfully
                  </motion.p>
                )}
              </motion.div>

              {/* Degree Upload */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Medical Degree Certificate
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileUpload(e.target.files[0], "Degree")
                    }
                    className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-white outline-none focus:border-[#7A341F] transition-all duration-300 cursor-pointer"
                    disabled={uploading}
                  />
                  {degreeFile && (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 bg-green-500 rounded-full p-1.5"
                    >
                      <CheckCircle size={20} className="text-white" />
                    </motion.div>
                  )}
                </div>
                {degreeFile && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-sm font-medium mt-2"
                  >
                    ✓ Degree uploaded successfully
                  </motion.p>
                )}
              </motion.div>

              {/* ID Upload */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Government ID Proof
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileUpload(e.target.files[0], "ID Proof")
                    }
                    className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-white outline-none focus:border-[#7A341F] transition-all duration-300 cursor-pointer"
                    disabled={uploading}
                  />
                  {idProofFile && (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 bg-green-500 rounded-full p-1.5"
                    >
                      <CheckCircle size={20} className="text-white" />
                    </motion.div>
                  )}
                </div>
                {idProofFile && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-sm font-medium mt-2"
                  >
                    ✓ ID proof uploaded successfully
                  </motion.p>
                )}
              </motion.div>
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
              disabled={loading || uploading}
              whileHover={{ scale: loading || uploading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#7A341F] to-orange-500 hover:shadow-xl hover:shadow-[#7A341F]/40 disabled:opacity-70 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-lg transition-all duration-300 mt-8 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Submitting...
                </>
              ) : uploading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Submit For Verification
                </>
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default DoctorCompleteProfile;