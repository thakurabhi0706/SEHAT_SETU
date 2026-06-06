import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getPatientPrescriptions,
} from "../../services/prescriptionService";
import BackButton from "../../components/common/BackButton";

function PrescriptionViewer() {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadPrescriptions =
      async () => {

        try {

          const data =
            await getPatientPrescriptions();

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
      <div className="p-10">
        Loading prescriptions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] p-8">

      <div className="max-w-7xl mx-auto">

        <h1
          className="
            text-5xl
            font-bold
            text-[#8c3b24]
            mb-2
          "
        >
          My Prescriptions
        </h1>

        <p className="text-gray-500 mb-10">
          View prescriptions issued by doctors
        </p>

        <BackButton />

        {prescriptions.length === 0 && (

          <div
            className="
              bg-white
              rounded-3xl
              p-10
              shadow-md
              text-center
            "
          >
            No prescriptions found
          </div>

        )}

        <div className="space-y-8">

          {prescriptions.map(
            (prescription) => (

              <div
                key={prescription._id}
                className="
                  bg-white
                  rounded-3xl
                  shadow-md
                  p-8
                "
              >

                {/* HEADER */}

                <div
                  className="
                    flex
                    justify-between
                    items-start
                  "
                >

                  <div>

                    <h2
                      className="
                        text-2xl
                        font-bold
                      "
                    >
                      Dr. {
                        prescription.doctor
                          ?.fullName
                      }
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {
                        new Date(
                          prescription.createdAt
                        ).toLocaleDateString()
                      }
                    </p>

                  </div>

                </div>

                {/* DIAGNOSIS */}

                <div className="mt-8">

                  <h3
                    className="
                      font-bold
                      text-lg
                    "
                  >
                    Diagnosis
                  </h3>

                  <p className="mt-2">
                    {
                      prescription.diagnosis
                    }
                  </p>

                </div>

                {/* MEDICINES */}

                <div className="mt-8">

                  <h3
                    className="
                      font-bold
                      text-lg
                      mb-4
                    "
                  >
                    Medicines
                  </h3>

                  <div className="space-y-4">

                    {prescription.medicines?.map(
                      (
                        medicine,
                        index
                      ) => (

                        <div
                          key={index}
                          className="
                            border
                            rounded-2xl
                            p-4
                            bg-gray-50
                          "
                        >

                          <p>
                            <strong>
                              Medicine:
                            </strong>{" "}
                            {
                              medicine.medicineName
                            }
                          </p>

                          <p>
                            <strong>
                              Dosage:
                            </strong>{" "}
                            {
                              medicine.dosage
                            }
                          </p>

                          <p>
                            <strong>
                              Frequency:
                            </strong>{" "}
                            {
                              medicine.frequency
                            }
                          </p>

                          <p>
                            <strong>
                              Duration:
                            </strong>{" "}
                            {
                              medicine.duration
                            }
                          </p>

                          {medicine.instructions && (

                            <p>
                              <strong>
                                Instructions:
                              </strong>{" "}
                              {
                                medicine.instructions
                              }
                            </p>

                          )}

                        </div>

                      )
                    )}

                  </div>

                </div>

                {/* DOCTOR NOTES */}

                {prescription.doctorNotes && (

                  <div className="mt-8">

                    <h3
                      className="
                        font-bold
                        text-lg
                      "
                    >
                      Doctor Notes
                    </h3>

                    <p className="mt-2">
                      {
                        prescription.doctorNotes
                      }
                    </p>

                  </div>

                )}

                {/* FOLLOW UP */}

                {prescription.followUpDate && (

                  <div className="mt-8">

                    <h3
                      className="
                        font-bold
                        text-lg
                      "
                    >
                      Follow Up Date
                    </h3>

                    <p className="mt-2">
                      {
                        new Date(
                          prescription.followUpDate
                        ).toLocaleDateString()
                      }
                    </p>

                  </div>

                )}

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}

export default PrescriptionViewer;