import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getDoctorAppointments,
  acceptAppointment,
  rejectAppointment,
  completeAppointment,
} from "../../services/appointmentService";

function AppointmentRequests() {

  const navigate = useNavigate();

  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
  const handleComplete =
    async (id) => {

      try {

        await completeAppointment(id);

        alert(
          "Appointment completed successfully"
        );

        loadAppointments();

      } catch (error) {

        console.error(error);

        alert(
          "Failed to complete appointment"
        );
      }
  };


  const loadAppointments =
    async () => {

      try {

        const data =
          await getDoctorAppointments();

        setAppointments(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    loadAppointments();

  }, []);

  const handleAccept =
    async (id) => {

      try {

        await acceptAppointment(id);

        alert(
          "Appointment accepted"
        );

        loadAppointments();

      } catch (error) {

        console.error(error);
      }
    };

  const handleReject =
    async (id) => {

      try {

        await rejectAppointment(id);

        alert(
          "Appointment rejected"
        );

        loadAppointments();

      } catch (error) {

        console.error(error);
      }
    };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] p-8">

      <button
        onClick={() => navigate(-1)}
        className="
          mb-6
          text-[#8c3b24]
          font-semibold
        "
      >
        ← Back
      </button>

      <div className="max-w-7xl mx-auto">

        <h1
          className="
            text-5xl
            font-bold
            text-[#8c3b24]
            mb-2
          "
        >
          Appointment Requests
        </h1>

        <p className="text-gray-500 mb-10">
          Manage incoming patient consultations
        </p>

        {appointments.length === 0 && (
          <div
            className="
              bg-white
              rounded-3xl
              p-10
              shadow-md
              text-center
            "
          >
            No appointment requests
          </div>
        )}

        <div className="space-y-6">

          {appointments.map(
            (appointment) => (

              <div
                key={appointment._id}
                className="
                  bg-white
                  rounded-3xl
                  shadow-md
                  p-8
                "
              >

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
                      {
                        appointment.patient
                          ?.fullName
                      }
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {
                        appointment
                          .consultationType
                      }
                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${
                      appointment.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : appointment.status === "Confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : appointment.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {appointment.status}
                  </span>

                </div>

                <div
                  className="
                    grid
                    md:grid-cols-2
                    gap-8
                    mt-8
                  "
                >

                  <div>

                    <p>
                      <strong>
                        Date:
                      </strong>{" "}
                      {new Date(
                        appointment
                          .appointmentDate
                      ).toLocaleDateString()}
                    </p>

                    <p className="mt-3">
                      <strong>
                        Time:
                      </strong>{" "}
                      {
                        appointment
                          .appointmentTime
                      }
                    </p>

                    <p className="mt-3">
                      <strong>
                        Reason:
                      </strong>{" "}
                      {
                        appointment
                          .reasonForVisit
                      }
                    </p>

                  </div>

                  <div>

                    <p>
                      <strong>
                        Symptoms:
                      </strong>
                    </p>

                    <div className="mt-2">

                      {appointment.symptoms?.map(
                        (
                          symptom,
                          index
                        ) => (
                          <span
                            key={index}
                            className="
                              inline-block
                              mr-2
                              mb-2
                              px-3
                              py-1
                              rounded-full
                              bg-gray-100
                            "
                          >
                            {symptom}
                          </span>
                        )
                      )}

                    </div>

                  </div>

                </div>

                {appointment.status ===
                  "Pending" && (

                  <div
                    className="
                      flex
                      gap-4
                      mt-8
                    "
                  >

                    <button
                      onClick={() =>
                        handleAccept(
                          appointment._id
                        )
                      }
                      className="
                        bg-green-600
                        text-white
                        px-8
                        py-3
                        rounded-xl
                        font-semibold
                      "
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        handleReject(
                          appointment._id
                        )
                      }
                      className="
                        bg-red-600
                        text-white
                        px-8
                        py-3
                        rounded-xl
                        font-semibold
                      "
                    >
                      Reject
                    </button>

                  </div>

                  

                )}

                {appointment.paymentStatus === "Paid" &&
                 appointment.status !== "Completed" && (
                  <div className="flex gap-4 mt-8">

                    <a
                      href={appointment.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        bg-green-600
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                      "
                    >
                      Join Consultation
                    </a>

                    <button
                      onClick={() =>
                        navigate(
                          `/doctor/reports/${appointment.patient._id}`
                        )
                      }
                      className="
                        bg-purple-600
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                      "
                    >
                      View Reports
                    </button>



                    <button
                      onClick={() =>
                        navigate(
                          `/doctor/prescription/${appointment._id}`
                        )
                      }
                      className="
                        bg-[#8c3b24]
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                      "
                    >
                      Create Prescription
                    </button>

                    <button
                      onClick={() =>
                        handleComplete(
                          appointment._id
                        )
                      }
                      className="
                        bg-blue-600
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                      "
                    >
                      Complete Appointment
                    </button>

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

export default AppointmentRequests;