import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { getDoctorProfile } from "../../services/doctorService";
import ruralHealthcare4 from "../../assets/images/rural-healthcare4.jpg";

function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getDoctorProfile();
      setDoctor(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6] flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#7A341F]">Loading...</h1>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#7A341F]">Profile Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-[#7A341F] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#5C2415] transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6]">
      {/* HERO SECTION */}
      <div className="relative h-56 rounded-b-[32px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${ruralHealthcare4})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5C2415]/90 via-[#7A341F]/75 to-[#5C2415]/60" />

        {/* Back Button Inside Banner */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 rounded-xl px-5 py-3 flex items-center gap-2 font-semibold transition-all"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl font-black">Doctor Profile</h1>
          <p className="mt-3 text-lg text-orange-100">
            Your professional information and credentials
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          {/* PERSONAL & PROFESSIONAL INFO */}
          <div className="grid md:grid-cols-2 gap-10 mb-10">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-[#7A341F] mb-6 pb-4 border-b border-gray-200">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">Full Name</p>
                  <p className="font-semibold text-[#1f2937]">{doctor.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-semibold text-[#1f2937]">{doctor.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p className="font-semibold text-[#1f2937]">{doctor.phone}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Age</p>
                    <p className="font-semibold text-[#1f2937]">{doctor.age}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Gender</p>
                    <p className="font-semibold text-[#1f2937]">{doctor.gender}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h2 className="text-2xl font-bold text-[#7A341F] mb-6 pb-4 border-b border-gray-200">
                Professional Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">Specialization</p>
                  <p className="font-semibold text-[#1f2937]">{doctor.specialization}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Years of Experience</p>
                  <p className="font-semibold text-[#1f2937]">{doctor.yearsOfExperience} years</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Consultation Fee</p>
                  <p className="font-semibold text-[#1f2937]">₹{doctor.consultationFee}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Hospital</p>
                  <p className="font-semibold text-[#1f2937]">{doctor.hospitalName}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Clinic Address</p>
                  <p className="font-semibold text-[#1f2937]">{doctor.clinicAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* VERIFICATION STATUS */}
          <div className="border-t border-gray-200 pt-10 mb-10">
            <h2 className="text-2xl font-bold text-[#7A341F] mb-4">Verification Status</h2>
            <div className="flex items-center gap-3">
              <span
                className={`px-6 py-2 rounded-full font-semibold text-sm ${
                  doctor.verificationStatus === "Approved"
                    ? "bg-green-100 text-green-700"
                    : doctor.verificationStatus === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {doctor.verificationStatus}
              </span>
            </div>
          </div>

          {/* UPLOADED DOCUMENTS */}
          <div className="border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-[#7A341F] mb-6">Uploaded Documents</h2>
            {doctor.uploadedDocuments && doctor.uploadedDocuments.length > 0 ? (
              <div className="space-y-4">
                {doctor.uploadedDocuments.map((doc) => (
                  <div
                    key={doc._id}
                    className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-5 hover:border-[#7A341F] hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#7A341F]/10 flex items-center justify-center">
                        <FileText size={24} className="text-[#7A341F]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1f2937]">{doc.documentType}</p>
                        <p className="text-sm text-gray-500">{doc.fileName}</p>
                      </div>
                    </div>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#7A341F] hover:bg-[#5C2415] text-white px-6 py-2 rounded-xl font-semibold transition-all"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No documents uploaded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;