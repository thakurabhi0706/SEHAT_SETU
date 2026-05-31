import { useEffect, useState } from "react";
import { Search, Stethoscope, MapPin } from "lucide-react";
import { getAllDoctors } from "../../services/patientDoctorService";

import {
  useNavigate,
  Link,
} from "react-router-dom";


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
    const filtered = doctors.filter((doctor) =>
      doctor.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      doctor.specialization
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
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
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#8c3b24]">
          Loading Doctors...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef]">

      {/* HERO SECTION */}
      <div
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/rural-healthcare2.jpg')",
        }}
      >
        
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">

          <h1 className="text-5xl font-bold">
            Find Trusted Doctors
          </h1>

          <p className="mt-4 text-lg max-w-2xl">
            Connect with verified healthcare professionals
            serving rural communities through Sehat Setu.
          </p>

        </div>
      </div>

      {/* SEARCH */}
      <div className="max-w-7xl mx-auto px-6 mt-10">

        <div className="bg-white rounded-3xl shadow-md p-6">

          <div className="flex items-center gap-3">

            <Search
              size={22}
              className="text-[#8c3b24]"
            />

            <input
              type="text"
              placeholder="Search by doctor name or specialization..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="
                flex-1
                outline-none
                text-lg
              "
            />

          </div>

        </div>

      </div>

      {/* DOCTOR LIST */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-20">

            <h2 className="text-3xl font-bold text-gray-600">
              No Doctors Found
            </h2>

          </div>
        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredDoctors.map((doctor) => (

              <div
                key={doctor._id}
                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  overflow-hidden
                  border border-[#efe5db]
                "
              >

                {/* CARD HEADER */}
                <div className="bg-[#8c3b24] text-white p-6">

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        w-16
                        h-16
                        rounded-full
                        bg-white/20
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Stethoscope />
                    </div>

                    <div>

                      <h2 className="text-2xl font-bold">
                        Dr. {doctor.fullName}
                      </h2>

                      <p className="text-orange-100">
                        {doctor.specialization}
                      </p>

                    </div>

                  </div>

                </div>

                {/* DETAILS */}
                <div className="p-6 space-y-4">

                  <div>
                    <p className="text-gray-500">
                      Experience
                    </p>

                    <p className="font-semibold">
                      {doctor.yearsOfExperience} Years
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Consultation Fee
                    </p>

                    <p className="font-semibold">
                      ₹{doctor.consultationFee}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Hospital
                    </p>

                    <p className="font-semibold">
                      {doctor.hospitalName ||
                        "Not Available"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">

                    <MapPin
                      size={18}
                      className="text-[#8c3b24]"
                    />

                    <p className="text-gray-700">
                      {doctor.clinicAddress ||
                        "Location Not Available"}
                    </p>

                  </div>

                </div>

                {/* BUTTONS */}
                <div className="p-6 pt-0 flex gap-3">

                  <Link
                    to={`/patient/doctor/${doctor._id}`}
                    className="
                      flex-1
                      border
                      border-[#8c3b24]
                      text-[#8c3b24]
                      py-3
                      rounded-xl
                      font-semibold
                      text-center
                    "
                  >
                    View Profile
                  </Link>
                  
                  <button
                    onClick={() =>
                      navigate(
                        `/patient/book-appointment/${doctor._id}`
                      )
                    }
                    className="
                      flex-1
                      bg-[#8c3b24]
                      text-white
                      py-3
                      rounded-xl
                      font-semibold
                    "
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