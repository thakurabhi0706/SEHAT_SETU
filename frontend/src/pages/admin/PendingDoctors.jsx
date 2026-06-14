import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, FileText, ExternalLink } from "lucide-react";
import {
  getPendingDoctors,
  approveDoctor,
  rejectDoctor,
} from "../../api/adminApi";
import ruralHealthcare4 from "../../assets/images/rural-healthcare4.jpg";

const PendingDoctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchDoctors = async () => {
    try {
      const data = await getPendingDoctors();
      setDoctors(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      await approveDoctor(id);
      setDoctors((prev) =>
        prev.filter((doctor) => doctor._id !== id)
      );
      alert("Doctor approved successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to approve doctor");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(id);
    try {
      await rejectDoctor(id);
      setDoctors((prev) =>
        prev.filter((doctor) => doctor._id !== id)
      );
      alert("Doctor rejected successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to reject doctor");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6] flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#7A341F]">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6]">
      {/* HERO SECTION */}
      <div className="relative h-56 rounded-b-[32px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${ruralHealthcare4})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5C2415]/90 via-[#7A341F]/75 to-[#5C2415]/60" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 rounded-xl px-5 py-3 flex items-center gap-2 font-semibold"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl font-black">Doctor Verifications</h1>
          <p className="mt-3 text-lg text-orange-100">
            Review and approve pending doctor applications
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* STATS CARD */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <FileText size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Pending Verifications</p>
              <p className="text-3xl font-bold text-[#7A341F]">{doctors.length}</p>
            </div>
          </div>
        </div>

        {/* DOCTORS GRID */}
        {doctors.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8"
              >
                {/* HEADER */}
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1f2937]">
                      {doctor.fullName}
                    </h2>
                    <p className="text-[#7A341F] font-semibold mt-1">
                      {doctor.specialization}
                    </p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
                    ⏳ Pending
                  </span>
                </div>

                {/* DOCTOR INFO */}
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email</span>
                    <span className="font-semibold text-[#1f2937]">{doctor.email}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone</span>
                    <span className="font-semibold text-[#1f2937]">{doctor.phone}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-semibold text-[#1f2937]">{doctor.yearsOfExperience} years</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Consultation Fee</span>
                    <span className="font-semibold text-[#1f2937]">₹{doctor.consultationFee}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Hospital</span>
                    <span className="font-semibold text-[#1f2937] text-right">{doctor.hospitalName}</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <span className="text-gray-600">Clinic Address</span>
                    <span className="font-semibold text-[#1f2937] text-right max-w-xs">{doctor.clinicAddress}</span>
                  </div>
                </div>

                {/* DOCUMENTS SECTION */}
                {doctor.uploadedDocuments && doctor.uploadedDocuments.length > 0 && (
                  <div className="mb-6 pb-6 border-t border-gray-200 pt-6">
                    <h3 className="font-bold text-lg text-[#1f2937] mb-4">Uploaded Documents</h3>
                    <div className="space-y-3">
                      {doctor.uploadedDocuments.map((doc) => (
                        <div
                          key={doc._id}
                          className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-200"
                        >
                          <div>
                            <p className="font-semibold text-[#1f2937]">{doc.documentType}</p>
                            <p className="text-xs text-gray-500 mt-1">{doc.fileName}</p>
                          </div>
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#7A341F] hover:bg-[#5C2415] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold"
                          >
                            <ExternalLink size={16} />
                            View
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ACTION BUTTONS */}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleApprove(doctor._id)}
                    disabled={actionLoading === doctor._id}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} />
                    {actionLoading === doctor._id ? "Processing..." : "Approve"}
                  </button>

                  <button
                    onClick={() => handleReject(doctor._id)}
                    disabled={actionLoading === doctor._id}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <XCircle size={18} />
                    {actionLoading === doctor._id ? "Processing..." : "Reject"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center">
            <CheckCircle size={48} className="mx-auto text-green-400 mb-4" />
            <h3 className="text-2xl font-bold text-[#1f2937]">All Caught Up!</h3>
            <p className="text-gray-500 mt-2">No pending doctor verifications at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingDoctors;