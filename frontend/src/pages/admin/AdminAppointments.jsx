import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, DollarSign } from "lucide-react";
import { getAllAppointments } from "../../services/adminAppointmentService";
import ruralHealthcare6 from "../../assets/images/rural-healthcare1.jpg";

function AdminAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments =
    statusFilter === "All"
      ? appointments
      : appointments.filter((appointment) => appointment.status === statusFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentColor = (status) => {
    return status === "Paid"
      ? "bg-green-100 text-green-700"
      : "bg-orange-100 text-orange-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6] flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#7A341F]">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6]">
      {/* HERO SECTION */}
      <div className="relative h-56 rounded-b-[32px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${ruralHealthcare6})`,
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
          <h1 className="text-5xl font-black">Appointment Management</h1>
          <p className="mt-3 text-lg text-orange-100">
            View and manage all platform appointments
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
            <p className="text-gray-600 text-sm">Total</p>
            <p className="text-3xl font-bold text-[#7A341F]">{appointments.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">
              {appointments.filter((a) => a.status === "Pending").length}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
            <p className="text-gray-600 text-sm">Confirmed</p>
            <p className="text-3xl font-bold text-green-600">
              {appointments.filter((a) => a.status === "Confirmed").length}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
            <p className="text-gray-600 text-sm">Completed</p>
            <p className="text-3xl font-bold text-blue-600">
              {appointments.filter((a) => a.status === "Completed").length}
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <p className="text-gray-700 font-semibold mb-4">Filter by Status</p>
          <div className="flex flex-wrap gap-3">
            {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                  statusFilter === status
                    ? "bg-[#7A341F] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* APPOINTMENTS TABLE */}
        {filteredAppointments.length > 0 ? (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#7A341F] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Patient</th>
                    <th className="px-6 py-4 text-left font-semibold">Doctor</th>
                    <th className="px-6 py-4 text-left font-semibold">Date & Time</th>
                    <th className="px-6 py-4 text-left font-semibold">Type</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment, index) => (
                    <tr
                      key={appointment._id}
                      className={`border-b last:border-b-0 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-400" />
                          <span className="font-semibold text-[#1f2937]">
                            {appointment.patient?.fullName}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-[#7A341F] font-semibold">
                          {appointment.doctor?.fullName}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={14} />
                            {new Date(appointment.appointmentDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock size={14} />
                            {appointment.appointmentTime}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-gray-700">
                          {appointment.consultationType}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-xs font-semibold ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1 ${getPaymentColor(
                            appointment.paymentStatus
                          )}`}
                        >
                          <DollarSign size={14} />
                          {appointment.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-[#1f2937]">No Appointments Found</h3>
            <p className="text-gray-500 mt-2">No appointments match the selected filter.</p>
          </div>
        )}

        {/* SUMMARY */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Pending Action</h3>
            <p className="text-3xl font-bold text-blue-600">
              {appointments.filter((a) => a.status === "Pending").length}
            </p>
            <p className="text-sm text-blue-700 mt-1">Require confirmation</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h3 className="font-semibold text-green-900 mb-2">Confirmed</h3>
            <p className="text-3xl font-bold text-green-600">
              {appointments.filter((a) => a.status === "Confirmed").length}
            </p>
            <p className="text-sm text-green-700 mt-1">Ready for consultation</p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
            <h3 className="font-semibold text-purple-900 mb-2">Completed</h3>
            <p className="text-3xl font-bold text-purple-600">
              {appointments.filter((a) => a.status === "Completed").length}
            </p>
            <p className="text-sm text-purple-700 mt-1">Successfully concluded</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAppointments;