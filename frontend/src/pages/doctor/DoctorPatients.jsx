import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Calendar } from "lucide-react";
import { getDoctorPatients } from "../../services/doctorPatientService";
import ruralHealthcare6 from "../../assets/images/rural-healthcare3.jpg";

function DoctorPatients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getDoctorPatients();
      setPatients(data);
    } catch (error) {
      console.log(error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6]">
      {/* HERO SECTION */}
      <div className="relative h-56 rounded-b-[32px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${ruralHealthcare6})`,
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
          <h1 className="text-5xl font-black">My Patients</h1>
          <p className="mt-3 text-lg text-orange-100">
            View your patient list and visit history
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* STATS */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#7A341F]/10 flex items-center justify-center">
              <Users size={20} className="text-[#7A341F]" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Patients</p>
              <p className="text-3xl font-bold text-[#7A341F]">{patients.length}</p>
            </div>
          </div>
        </div>

        {/* PATIENTS GRID */}
        {patients.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {patients.map((patient) => (
              <div
                key={patient._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <h2 className="text-2xl font-bold text-[#1f2937]">
                  {patient.fullName}
                </h2>

                <div className="space-y-3 mt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 text-sm">Gender</p>
                    <p className="font-semibold text-[#1f2937]">{patient.gender || "N/A"}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 text-sm">Age</p>
                    <p className="font-semibold text-[#1f2937]">{patient.age || "N/A"}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 text-sm">Total Visits</p>
                    <p className="font-semibold text-[#7A341F] text-lg">{patient.totalVisits}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex items-start gap-2">
                      <Calendar size={16} className="text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-gray-600 text-sm">Last Visit</p>
                        <p className="font-semibold text-[#1f2937]">
                          {new Date(patient.lastVisit).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-600">No Patients Yet</h3>
            <p className="text-gray-500 mt-2">Your patient list will appear here once you complete consultations.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorPatients;