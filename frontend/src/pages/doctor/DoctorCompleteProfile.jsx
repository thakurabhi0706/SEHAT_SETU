import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { uploadFile } from "../../services/uploadService";

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

      navigate("/doctor/pending");

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
    alert("File upload failed");
  } finally {
    setUploading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#f7f4ef] py-10 px-6">
      
      <div className="max-w-5xl mx-auto bg-white rounded-[32px] shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SECTION */}
        <div
          className="hidden md:flex relative"
          style={{
            backgroundImage:
              "url('/images/rural-healthcare.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#8c3b24]/60 to-[#1e293b]/70"></div>

          <div className="relative z-10 flex flex-col justify-end p-12 text-white">
            <p className="uppercase tracking-[4px] text-sm text-orange-100 mb-4">
              Doctor Verification
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              Complete <br />
              Your Profile
            </h1>

            <p className="mt-6 text-lg text-orange-50 leading-8">
              Help us verify your medical credentials and
              connect you with patients across rural India.
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="p-10 md:p-12 bg-white">

          <p className="text-[#c26a3d] font-semibold tracking-wide">
            Doctor Onboarding
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            Professional Details
          </h2>

          <p className="text-gray-500 mt-4">
            Complete your medical profile for verification
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* AGE */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Age
              </label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="w-full border border-[#e7d8c9] rounded-2xl px-5 py-4 bg-[#fcfaf8]"
                required
              />
            </div>

            {/* GENDER */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-[#e7d8c9] rounded-2xl px-5 py-4 bg-[#fcfaf8]"
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full border border-[#e7d8c9] rounded-2xl px-5 py-4 bg-[#fcfaf8]"
                required
              />
            </div>

            {/* SPECIALIZATION */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Specialization
              </label>

              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Cardiologist, Dentist..."
                className="w-full border border-[#e7d8c9] rounded-2xl px-5 py-4 bg-[#fcfaf8]"
                required
              />
            </div>

            {/* LICENSE */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Medical License Number
              </label>

              <input
                type="text"
                name="medicalLicenseNumber"
                value={formData.medicalLicenseNumber}
                onChange={handleChange}
                placeholder="Enter license number"
                className="w-full border border-[#e7d8c9] rounded-2xl px-5 py-4 bg-[#fcfaf8]"
                required
              />
            </div>

            {/* EXPERIENCE */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Years Of Experience
              </label>

              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                placeholder="Enter experience"
                className="w-full border border-[#e7d8c9] rounded-2xl px-5 py-4 bg-[#fcfaf8]"
                required
              />
            </div>

            {/* CONSULTATION FEE */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Consultation Fee
              </label>

              <input
                type="number"
                name="consultationFee"
                value={formData.consultationFee}
                onChange={handleChange}
                placeholder="Enter fee"
                className="w-full border border-[#e7d8c9] rounded-2xl px-5 py-4 bg-[#fcfaf8]"
                required
              />
            </div>

            {/* HOSPITAL */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Hospital Name
              </label>

              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                placeholder="Enter hospital"
                className="w-full border border-[#e7d8c9] rounded-2xl px-5 py-4 bg-[#fcfaf8]"
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Clinic Address
              </label>

              <textarea
                name="clinicAddress"
                value={formData.clinicAddress}
                onChange={handleChange}
                placeholder="Enter clinic address"
                rows="3"
                className="w-full border border-[#e7d8c9] rounded-2xl px-5 py-4 bg-[#fcfaf8]"
              />
            </div>


            <div className="space-y-6">

            {/* License Upload */}
            <div>
                <label className="block text-lg font-semibold text-[#2B3A55] mb-3">
                Medical License Certificate
                </label>

                <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                    handleFileUpload(e.target.files[0], "License")
                }
                className="w-full border-2 border-[#E5D3C5] rounded-3xl p-5 bg-white"
                />

                {licenseFile && (
                <p className="text-green-600 mt-2">
                    License uploaded successfully
                </p>
                )}
            </div>

            {/* Degree Upload */}
            <div>
                <label className="block text-lg font-semibold text-[#2B3A55] mb-3">
                Medical Degree Certificate
                </label>

                <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                    handleFileUpload(e.target.files[0], "Degree")
                }
                className="w-full border-2 border-[#E5D3C5] rounded-3xl p-5 bg-white"
                />

                {degreeFile && (
                <p className="text-green-600 mt-2">
                    Degree uploaded successfully
                </p>
                )}
            </div>

            {/* ID Upload */}
            <div>
                <label className="block text-lg font-semibold text-[#2B3A55] mb-3">
                Government ID Proof
                </label>

                <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                    handleFileUpload(e.target.files[0], "ID Proof")
                }
                className="w-full border-2 border-[#E5D3C5] rounded-3xl p-5 bg-white"
                />

                {idProofFile && (
                <p className="text-green-600 mt-2">
                    ID proof uploaded successfully
                </p>
                )}
            </div>

            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8c3b24] hover:bg-[#71301d] text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg"
            >
              {loading
                ? "Submitting..."
                : "Submit For Verification"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorCompleteProfile;