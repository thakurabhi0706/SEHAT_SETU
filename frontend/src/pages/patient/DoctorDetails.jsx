import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Stethoscope, ArrowLeft } from "lucide-react";
import { getDoctorById } from "../../services/patientDoctorService";
import ruralHealthcare2 from "../../assets/images/rural-healthcare2.jpg";

function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const data = await getDoctorById(id);
        setDoctor(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [id]);

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
          <h1 className="text-2xl font-bold text-[#7A341F]">Doctor Not Found</h1>
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
            backgroundImage: `url(${ruralHealthcare2})`,
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
            Trusted healthcare for rural communities
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-8 border-b border-gray-200">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7A341F] to-[#5C2415] flex items-center justify-center flex-shrink-0">
              <Stethoscope size={40} className="text-white" />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-[#1f2937]">Dr. {doctor.fullName}</h2>
              <p className="text-[#7A341F] text-xl font-semibold mt-2">
                {doctor.specialization}
              </p>
              <span className="inline-block mt-3 px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold text-sm">
                Verified Doctor
              </span>
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="grid md:grid-cols-2 gap-10 mt-10">
            {/* Professional Information */}
            <div>
              <h3 className="text-2xl font-bold text-[#7A341F] mb-6">Professional Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">Experience</p>
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

            {/* Availability */}
            <div>
              <h3 className="text-2xl font-bold text-[#7A341F] mb-6">Availability</h3>
              <div className="space-y-3">
                {doctor.availabilitySlots && doctor.availabilitySlots.length > 0 ? (
                  doctor.availabilitySlots.map((slot, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-2xl p-4 hover:border-[#7A341F] hover:bg-gray-50 transition-all"
                    >
                      <div className="font-semibold text-[#1f2937]">{slot.day}</div>
                      <div className="text-gray-600 mt-1">
                        {slot.startTime} - {slot.endTime}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No availability slots available</p>
                )}
              </div>
            </div>
          </div>

          {/* BOOK BUTTON */}
          <div className="mt-10 flex gap-4">
            <button
              onClick={() => navigate(`/patient/book-appointment/${doctor._id}`)}
              className="bg-[#7A341F] hover:bg-[#5C2415] text-white px-8 py-4 rounded-2xl font-semibold transition-all flex-1 md:flex-none"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;