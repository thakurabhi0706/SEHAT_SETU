import { useEffect, useState } from "react";
import { Search, Stethoscope, MapPin, ArrowLeft } from "lucide-react";
import { getAllDoctors } from "../../services/patientDoctorService";
import { useNavigate, Link } from "react-router-dom";
import heroImage from "../../assets/images/rural-healthcare.jpg";

function FindDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    const filtered = doctors.filter(
      (doctor) =>
        doctor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);

  const loadDoctors = async () => {
    try {
      const data = await getAllDoctors();
      setDoctors(data);
      setFilteredDoctors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6] flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#7A341F]">Loading Doctors...</h1>
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
            backgroundImage: `url(${heroImage})`,
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
          <h1 className="text-5xl font-black">Find Trusted Doctors</h1>
          <p className="mt-3 text-lg max-w-2xl text-orange-100">
            Connect with verified healthcare professionals serving rural communities through Sehat Setu.
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <Search size={22} className="text-[#7A341F]" />
            <input
              type="text"
              placeholder="Search by doctor name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none text-lg bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* DOCTOR LIST */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-600">No Doctors Found</h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl hover:border-[#7A341F] transition-all"
              >
                {/* CARD HEADER */}
                <div className="bg-gradient-to-r from-[#7A341F] to-[#5C2415] text-white p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <Stethoscope size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Dr. {doctor.fullName}</h2>
                      <p className="text-orange-100 text-sm mt-1">{doctor.specialization}</p>
                    </div>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm">Experience</p>
                    <p className="font-semibold text-[#1f2937]">{doctor.yearsOfExperience} Years</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Consultation Fee</p>
                    <p className="font-semibold text-[#1f2937]">₹{doctor.consultationFee}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Hospital</p>
                    <p className="font-semibold text-[#1f2937]">{doctor.hospitalName || "Not Available"}</p>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <MapPin size={18} className="text-[#7A341F] mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">{doctor.clinicAddress || "Location Not Available"}</p>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="p-6 pt-0 flex gap-3">
                  <Link
                    to={`/patient/doctor/${doctor._id}`}
                    className="flex-1 border border-[#7A341F] text-[#7A341F] py-3 rounded-2xl font-semibold text-center hover:bg-[#7A341F]/5 transition-all"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => navigate(`/patient/book-appointment/${doctor._id}`)}
                    className="flex-1 bg-[#7A341F] hover:bg-[#5C2415] text-white py-3 rounded-2xl font-semibold transition-all"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FindDoctors;