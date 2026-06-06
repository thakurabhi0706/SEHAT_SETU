import { useEffect, useState } from "react";
import { getDoctorPatients } from "../../services/doctorPatientService";
import BackButton from "../../components/common/BackButton";

function DoctorPatients() {
  const [patients, setPatients] =
    useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data =
        await getDoctorPatients();

      setPatients(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 bg-[#f7f4ef] min-h-screen">

      <h1 className="text-4xl font-bold mb-8 text-[#8c3b24]">
        My Patients
      </h1>

      <BackButton />

      <div className="grid md:grid-cols-2 gap-6">

        {patients.map((patient) => (

          <div
            key={patient._id}
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-md
              border
              border-[#efe5db]
            "
          >

            <h2 className="text-2xl font-bold">
              {patient.fullName}
            </h2>

            <p className="mt-2 text-gray-600">
              Gender: {patient.gender || "N/A"}
            </p>

            <p className="text-gray-600">
              Age: {patient.age || "N/A"}
            </p>

            <p className="text-gray-600">
              Visits: {patient.totalVisits}
            </p>

            <p className="text-gray-600">
              Last Visit:
              {" "}
              {new Date(
                patient.lastVisit
              ).toLocaleDateString()}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default DoctorPatients;