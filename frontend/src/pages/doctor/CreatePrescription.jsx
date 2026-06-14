// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import {
//   createPrescription,
// } from "../../services/prescriptionService";

// function CreatePrescription() {

//   const navigate = useNavigate();

//   const { appointmentId } =
//     useParams();

//   const [diagnosis,
//     setDiagnosis] =
//     useState("");

//   const [doctorNotes,
//     setDoctorNotes] =
//     useState("");

//   const [medicineName,
//     setMedicineName] =
//     useState("");

//   const [dosage,
//     setDosage] =
//     useState("");

//   const [frequency,
//     setFrequency] =
//     useState("");

//   const [duration,
//     setDuration] =
//     useState("");

//   const handleSubmit =
//     async (e) => {

//       e.preventDefault();

//       try {

//         await createPrescription({
//           appointmentId,

//           diagnosis,

//           doctorNotes,

//           medicines: [
//             {
//               medicineName,
//               dosage,
//               frequency,
//               duration,
//             },
//           ],
//         });

//         alert(
//           "Prescription Created Successfully"
//         );

//         navigate(
//           "/doctor/appointments"
//         );

//       } catch (error) {

//         console.error(error);
//       }
//     };

//   return (
//     <div className="min-h-screen bg-[#f7f4ef] p-8">

//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-md">

//         <h1
//           className="
//             text-4xl
//             font-bold
//             text-[#8c3b24]
//             mb-8
//           "
//         >
//           Create Prescription
//         </h1>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6"
//         >

//           <textarea
//             placeholder="Diagnosis"
//             value={diagnosis}
//             onChange={(e) =>
//               setDiagnosis(
//                 e.target.value
//               )
//             }
//             className="
//               w-full
//               border
//               rounded-xl
//               p-4
//             "
//           />

//           <input
//             type="text"
//             placeholder="Medicine Name"
//             value={medicineName}
//             onChange={(e) =>
//               setMedicineName(
//                 e.target.value
//               )
//             }
//             className="
//               w-full
//               border
//               rounded-xl
//               p-4
//             "
//           />

//           <input
//             type="text"
//             placeholder="Dosage"
//             value={dosage}
//             onChange={(e) =>
//               setDosage(
//                 e.target.value
//               )
//             }
//             className="
//               w-full
//               border
//               rounded-xl
//               p-4
//             "
//           />

//           <input
//             type="text"
//             placeholder="Frequency"
//             value={frequency}
//             onChange={(e) =>
//               setFrequency(
//                 e.target.value
//               )
//             }
//             className="
//               w-full
//               border
//               rounded-xl
//               p-4
//             "
//           />

//           <input
//             type="text"
//             placeholder="Duration"
//             value={duration}
//             onChange={(e) =>
//               setDuration(
//                 e.target.value
//               )
//             }
//             className="
//               w-full
//               border
//               rounded-xl
//               p-4
//             "
//           />

//           <textarea
//             placeholder="Doctor Notes"
//             value={doctorNotes}
//             onChange={(e) =>
//               setDoctorNotes(
//                 e.target.value
//               )
//             }
//             className="
//               w-full
//               border
//               rounded-xl
//               p-4
//             "
//           />

//           <button
//             type="submit"
//             className="
//               bg-[#8c3b24]
//               text-white
//               px-8
//               py-3
//               rounded-xl
//               font-semibold
//             "
//           >
//             Save Prescription
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }

// export default CreatePrescription;

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pill, FileText, Stethoscope } from "lucide-react";
import { createPrescription } from "../../services/prescriptionService";
import ruralHealthcare7 from "../../assets/images/rural-healthcare2.jpg";

function CreatePrescription() {
  const navigate = useNavigate();
  const { appointmentId } = useParams();

  const [diagnosis, setDiagnosis] = useState("");
  const [doctorNotes, setDoctorNotes] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!diagnosis.trim()) {
      setError("Diagnosis is required");
      return false;
    }
    if (!medicineName.trim()) {
      setError("Medicine name is required");
      return false;
    }
    if (!dosage.trim()) {
      setError("Dosage is required");
      return false;
    }
    if (!frequency.trim()) {
      setError("Frequency is required");
      return false;
    }
    if (!duration.trim()) {
      setError("Duration is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await createPrescription({
        appointmentId,
        diagnosis,
        doctorNotes,
        medicines: [
          {
            medicineName,
            dosage,
            frequency,
            duration,
          },
        ],
      });

      alert("Prescription Created Successfully");
      navigate("/doctor/appointments");
    } catch (error) {
      console.error(error);
      setError("Failed to create prescription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6]">
      {/* HERO SECTION */}
      <div className="relative h-56 rounded-b-[32px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${ruralHealthcare7})`,
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
          <h1 className="text-5xl font-black">Create Prescription</h1>
          <p className="mt-3 text-lg text-orange-100">
            Fill in the prescription details for the patient
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
              <p className="text-red-700 font-semibold">⚠ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* DIAGNOSIS SECTION */}
            <div>
              <label className="flex items-center gap-2 text-[#1f2937] font-semibold mb-3">
                <Stethoscope size={20} className="text-[#7A341F]" />
                Diagnosis
              </label>
              <textarea
                placeholder="Enter patient diagnosis and clinical findings"
                value={diagnosis}
                onChange={(e) => {
                  setDiagnosis(e.target.value);
                  setError("");
                }}
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20"
                rows="4"
              />
            </div>

            {/* MEDICINE SECTION */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-2 text-[#1f2937] font-semibold mb-4">
                <Pill size={20} className="text-[#7A341F]" />
                Medicine Details
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Medicine Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Aspirin, Amoxicillin"
                    value={medicineName}
                    onChange={(e) => {
                      setMedicineName(e.target.value);
                      setError("");
                    }}
                    className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Dosage *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 500mg"
                      value={dosage}
                      onChange={(e) => {
                        setDosage(e.target.value);
                        setError("");
                      }}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Frequency *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 2x daily"
                      value={frequency}
                      onChange={(e) => {
                        setFrequency(e.target.value);
                        setError("");
                      }}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Duration *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 7 days"
                      value={duration}
                      onChange={(e) => {
                        setDuration(e.target.value);
                        setError("");
                      }}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* DOCTOR NOTES SECTION */}
            <div>
              <label className="flex items-center gap-2 text-[#1f2937] font-semibold mb-3">
                <FileText size={20} className="text-[#7A341F]" />
                Doctor Notes
              </label>
              <textarea
                placeholder="Add any additional notes, precautions, or special instructions for the patient"
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20"
                rows="4"
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#7A341F] px-6 py-3 rounded-2xl font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#7A341F] hover:bg-[#5C2415] disabled:bg-gray-400 text-white px-6 py-3 rounded-2xl font-semibold"
              >
                {loading ? "Saving..." : "Save Prescription"}
              </button>
            </div>
          </form>
        </div>

        {/* TIPS SECTION */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">📋 Prescription Guidelines</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Ensure all required fields are filled before saving</li>
            <li>• Be specific with dosage and frequency information</li>
            <li>• Add relevant precautions or allergies in doctor notes</li>
            <li>• Double-check medicine names for accuracy</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CreatePrescription;