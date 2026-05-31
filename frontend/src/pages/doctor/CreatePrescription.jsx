import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  createPrescription,
} from "../../services/prescriptionService";

function CreatePrescription() {

  const navigate = useNavigate();

  const { appointmentId } =
    useParams();

  const [diagnosis,
    setDiagnosis] =
    useState("");

  const [doctorNotes,
    setDoctorNotes] =
    useState("");

  const [medicineName,
    setMedicineName] =
    useState("");

  const [dosage,
    setDosage] =
    useState("");

  const [frequency,
    setFrequency] =
    useState("");

  const [duration,
    setDuration] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

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

        alert(
          "Prescription Created Successfully"
        );

        navigate(
          "/doctor/appointments"
        );

      } catch (error) {

        console.error(error);
      }
    };

  return (
    <div className="min-h-screen bg-[#f7f4ef] p-8">

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-md">

        <h1
          className="
            text-4xl
            font-bold
            text-[#8c3b24]
            mb-8
          "
        >
          Create Prescription
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <textarea
            placeholder="Diagnosis"
            value={diagnosis}
            onChange={(e) =>
              setDiagnosis(
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-xl
              p-4
            "
          />

          <input
            type="text"
            placeholder="Medicine Name"
            value={medicineName}
            onChange={(e) =>
              setMedicineName(
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-xl
              p-4
            "
          />

          <input
            type="text"
            placeholder="Dosage"
            value={dosage}
            onChange={(e) =>
              setDosage(
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-xl
              p-4
            "
          />

          <input
            type="text"
            placeholder="Frequency"
            value={frequency}
            onChange={(e) =>
              setFrequency(
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-xl
              p-4
            "
          />

          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) =>
              setDuration(
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-xl
              p-4
            "
          />

          <textarea
            placeholder="Doctor Notes"
            value={doctorNotes}
            onChange={(e) =>
              setDoctorNotes(
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-xl
              p-4
            "
          />

          <button
            type="submit"
            className="
              bg-[#8c3b24]
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
            "
          >
            Save Prescription
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreatePrescription;