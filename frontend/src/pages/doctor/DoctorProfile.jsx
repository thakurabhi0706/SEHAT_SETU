import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctorProfile } from "../../services/doctorService";
import BackButton from "../../components/common/BackButton";


function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
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
    }
  };

  if (!doctor) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f1] p-10">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-4xl font-bold text-[#8B4513] mb-8">
          Doctor Profile
        </h1>

        <BackButton />

        <div className="bg-white rounded-3xl shadow-md p-8">

          <div className="grid md:grid-cols-2 gap-8">

            <div>
              <h2 className="font-bold text-xl mb-4">
                Personal Information
              </h2>

              <p><strong>Name:</strong> {doctor.fullName}</p>
              <p><strong>Email:</strong> {doctor.email}</p>
              <p><strong>Phone:</strong> {doctor.phone}</p>
              <p><strong>Age:</strong> {doctor.age}</p>
              <p><strong>Gender:</strong> {doctor.gender}</p>
            </div>

            <div>
              <h2 className="font-bold text-xl mb-4">
                Professional Information
              </h2>

              <p>
                <strong>Specialization:</strong>{" "}
                {doctor.specialization}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {doctor.yearsOfExperience} years
              </p>

              <p>
                <strong>Fee:</strong> ₹
                {doctor.consultationFee}
              </p>

              <p>
                <strong>Hospital:</strong>{" "}
                {doctor.hospitalName}
              </p>

              <p>
                <strong>Clinic:</strong>{" "}
                {doctor.clinicAddress}
              </p>
            </div>

          </div>

          <div className="mt-8">
            <h2 className="font-bold text-xl mb-4">
              Verification Status
            </h2>
            <span className="
              px-4 py-2 rounded-full
              bg-green-100
              text-green-700
            ">
              {doctor.verificationStatus}
            </span>

            <div className="mt-8">
              <h2 className="font-bold text-xl mb-4">
                Uploaded Documents
              </h2>

              <div className="space-y-4">

                {doctor.uploadedDocuments?.map((doc) => (
                  <div
                    key={doc._id}
                    className="
                      flex justify-between
                      items-center
                      bg-gray-50
                      p-4
                      rounded-xl
                    "
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
                      className="
                        bg-[#8B4513]
                        text-white
                        px-4 py-2
                        rounded-lg
                      "
                    >
                      View
                    </a>
                  </div>
                ))}

              </div>
            </div>

            
          </div>

        </div>

      </div>
    </div>
  );
}

export default DoctorProfile;