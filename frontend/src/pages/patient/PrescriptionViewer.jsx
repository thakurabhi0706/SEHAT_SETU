import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getPatientPrescriptions,
} from "../../services/prescriptionService";
import ruralImage3 from "../../assets/images/rural-healthcare3.jpg";

function PrescriptionViewer() {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrescriptions = async () => {
      try {
        const data = await getPatientPrescriptions();
        setPrescriptions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPrescriptions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6] flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#7A341F]">Loading prescriptions...</h1>
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
            backgroundImage: `url(${ruralImage3})`,
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
          <h1 className="text-5xl font-black">My Prescriptions</h1>
          <p className="mt-3 text-lg text-orange-100">
            View prescriptions issued by doctors
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {prescriptions.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-600">No Prescriptions Found</h2>
            <p className="text-gray-500 mt-2">You don't have any prescriptions yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {prescriptions.map((prescription) => (
              <div
                key={prescription._id}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all"
              >
                {/* HEADER */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h2 className="text-2xl font-bold text-[#1f2937]">
                    Dr. {prescription.doctor?.fullName}
                  </h2>
                  <p className="text-gray-500 mt-2">
                    {new Date(prescription.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* DIAGNOSIS */}
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-[#7A341F] mb-3">Diagnosis</h3>
                  <p className="text-gray-700">{prescription.diagnosis}</p>
                </div>

                {/* MEDICINES */}
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-[#7A341F] mb-4">Medicines</h3>
                  <div className="space-y-4">
                    {prescription.medicines?.map((medicine, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-[#7A341F] bg-gray-50 rounded-2xl p-6"
                      >
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-500 text-sm">Medicine Name</p>
                            <p className="font-semibold text-[#1f2937]">
                              {medicine.medicineName}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500 text-sm">Dosage</p>
                            <p className="font-semibold text-[#1f2937]">
                              {medicine.dosage}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500 text-sm">Frequency</p>
                            <p className="font-semibold text-[#1f2937]">
                              {medicine.frequency}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500 text-sm">Duration</p>
                            <p className="font-semibold text-[#1f2937]">
                              {medicine.duration}
                            </p>
                          </div>
                        </div>

                        {medicine.instructions && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-gray-500 text-sm">Instructions</p>
                            <p className="text-gray-700 mt-1">{medicine.instructions}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* DOCTOR NOTES */}
                {prescription.doctorNotes && (
                  <div className="mb-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="font-bold text-lg text-[#7A341F] mb-3">Doctor Notes</h3>
                    <p className="text-gray-700">{prescription.doctorNotes}</p>
                  </div>
                )}

                {/* FOLLOW UP */}
                {prescription.followUpDate && (
                  <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                    <h3 className="font-bold text-lg text-[#7A341F] mb-3">Follow Up Date</h3>
                    <p className="text-gray-700 font-semibold">
                      {new Date(prescription.followUpDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PrescriptionViewer;