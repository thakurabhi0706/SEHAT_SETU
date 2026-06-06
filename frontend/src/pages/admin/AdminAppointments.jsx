import {
  useEffect,
  useState,
} from "react";

import {
  getAllAppointments,
} from "../../services/adminAppointmentService";
import BackButton from "../../components/common/BackButton";

function AdminAppointments() {

  const [appointments, setAppointments] =
    useState([]);

  const [statusFilter, setStatusFilter] =
    useState("All");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments =
    async () => {

      try {

        const data =
          await getAllAppointments();

        setAppointments(data);

      } catch (error) {
        console.log(error);
      }
    };

  const filteredAppointments =
    statusFilter === "All"
      ? appointments
      : appointments.filter(
          (appointment) =>
            appointment.status ===
            statusFilter
        );

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Appointment Management
      </h1>
      <BackButton />

      {/* FILTERS */}

      <div className="flex gap-4 mb-8">

        {[
          "All",
          "Pending",
          "Confirmed",
          "Completed",
          "Cancelled",
        ].map((status) => (

          <button
            key={status}
            onClick={() =>
              setStatusFilter(status)
            }
            className={`px-5 py-2 rounded-xl ${
              statusFilter === status
                ? "bg-[#8c3b24] text-white"
                : "bg-gray-200"
            }`}
          >
            {status}
          </button>

        ))}

      </div>

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#8c3b24] text-white">

            <tr>

              <th className="p-4 text-left">
                Patient
              </th>

              <th className="p-4 text-left">
                Doctor
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Time
              </th>

              <th className="p-4 text-left">
                Type
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Payment
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredAppointments.map(
              (appointment) => (

              <tr
                key={appointment._id}
                className="border-b"
              >

                <td className="p-4">
                  {
                    appointment.patient
                      ?.fullName
                  }
                </td>

                <td className="p-4">
                  {
                    appointment.doctor
                      ?.fullName
                  }
                </td>

                <td className="p-4">
                  {new Date(
                    appointment.appointmentDate
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {
                    appointment.appointmentTime
                  }
                </td>

                <td className="p-4">
                  {
                    appointment.consultationType
                  }
                </td>

                <td className="p-4">
                  {appointment.status}
                </td>

                <td className="p-4">
                  {
                    appointment.paymentStatus
                  }
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminAppointments;