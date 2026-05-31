import { useEffect, useState } from "react";

import {
  getPendingDoctors,
  approveDoctor,
  rejectDoctor,
} from "../../api/adminApi";

const PendingDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

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
    try {
      await approveDoctor(id);

      setDoctors((prev) =>
        prev.filter((doctor) => doctor._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectDoctor(id);

      setDoctors((prev) =>
        prev.filter((doctor) => doctor._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2] p-10">
      <h1 className="text-4xl font-bold text-[#1f2937] mb-8">
        Pending Doctor Verifications
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white rounded-3xl shadow-lg p-8 border border-[#eadfd5]"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#1f2937]">
                  {doctor.fullName}
                </h2>

                <p className="text-gray-500 mt-1">
                  {doctor.specialization}
                </p>
              </div>

              <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
                Pending
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {doctor.email}
              </p>

              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {doctor.phone}
              </p>

              <p>
                <span className="font-semibold">Experience:</span>{" "}
                {doctor.yearsOfExperience} years
              </p>

              <p>
                <span className="font-semibold">Consultation Fee:</span>{" "}
                ₹{doctor.consultationFee}
              </p>

              <p>
                <span className="font-semibold">Hospital:</span>{" "}
                {doctor.hospitalName}
              </p>

              <p>
                <span className="font-semibold">Clinic Address:</span>{" "}
                {doctor.clinicAddress}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">
                Uploaded Documents
              </h3>

              <div className="space-y-3">
                {doctor.uploadedDocuments?.map((doc) => (
                  <div
                    key={doc._id}
                    className="flex items-center justify-between bg-[#f8f5f2] px-4 py-3 rounded-xl"
                  >
                    <div>
                      <p className="font-semibold">
                        {doc.documentType}
                      </p>

                      <p className="text-sm text-gray-500">
                        {doc.fileName}
                      </p>
                    </div>

                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#8B4513] text-white px-4 py-2 rounded-lg hover:bg-[#6f3610]"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleApprove(doctor._id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
              >
                Approve
              </button>

              <button
                onClick={() => handleReject(doctor._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingDoctors;