import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, AlertCircle, CheckCircle } from "lucide-react";
import {
  getDoctorAppointments,
  acceptAppointment,
  rejectAppointment,
  completeAppointment,
} from "../../services/appointmentService";
import ruralHealthcare5 from "../../assets/images/rural-healthcare4.jpg";

function AppointmentRequests() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState(null);

  const loadAppointments = async () => {
    try {
      const data = await getDoctorAppointments();
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

  const handleAccept = async (id) => {
    setActionInProgress(id);
    try {
      await acceptAppointment(id);
      alert("Appointment accepted");
      loadAppointments();
    } catch (error) {
      console.error(error);
      alert("Failed to accept appointment");
    } finally {
      setActionInProgress(null);
    }
  };

  const handleReject = async (id) => {
    setActionInProgress(id);
    try {
      await rejectAppointment(id);
      alert("Appointment rejected");
      loadAppointments();
    } catch (error) {
      console.error(error);
      alert("Failed to reject appointment");
    } finally {
      setActionInProgress(null);
    }
  };

  const handleComplete = async (id) => {
    setActionInProgress(id);
    try {
      await completeAppointment(id);
      alert("Appointment completed successfully");
      loadAppointments();
    } catch (error) {
      console.error(error);
      alert("Failed to complete appointment");
    } finally {
      setActionInProgress(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6] flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#7A341F]">Loading appointments...</h1>
      </div>
    );
  }

  const pendingCount = appointments.filter((a) => a.status === "Pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "Confirmed").length;
  const completedCount = appointments.filter((a) => a.status === "Completed").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6]">
      {/* HERO SECTION */}
      <div className="relative h-56 rounded-b-[32px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${ruralHealthcare5})`,
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
          <h1 className="text-5xl font-black">Appointment Requests</h1>
          <p className="mt-3 text-lg text-orange-100">
            Manage incoming patient consultations
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* STATS OVERVIEW */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Requests</p>
                <p className="text-3xl font-bold text-[#7A341F] mt-2">{pendingCount}</p>
              </div>
              <AlertCircle size={32} className="text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Confirmed</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{confirmedCount}</p>
              </div>
              <CheckCircle size={32} className="text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{completedCount}</p>
              </div>
              <CheckCircle size={32} className="text-green-500" />
            </div>
          </div>
        </div>

        {/* APPOINTMENTS LIST */}
        {appointments.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center">
            <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-600">No Appointments Found</h2>
            <p className="text-gray-500 mt-2">You don't have any appointment requests yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all"
              >
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-200">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1f2937]">
                      {appointment.patient?.fullName}
                    </h2>
                    <p className="text-gray-600 mt-1">{appointment.consultationType} Consultation</p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap ${
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

                {/* DETAILS GRID */}
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar size={20} className="text-[#7A341F] mt-1" />
                      <div>
                        <p className="text-gray-500 text-sm">Date</p>
                        <p className="font-semibold text-[#1f2937]">
                          {new Date(appointment.appointmentDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock size={20} className="text-[#7A341F] mt-1" />
                      <div>
                        <p className="text-gray-500 text-sm">Time</p>
                        <p className="font-semibold text-[#1f2937]">{appointment.appointmentTime}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Reason for Visit</p>
                      <p className="font-semibold text-[#1f2937] mt-1">{appointment.reasonForVisit}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm mb-3">Symptoms</p>
                    <div className="flex flex-wrap gap-2">
                      {appointment.symptoms && appointment.symptoms.length > 0 ? (
                        appointment.symptoms.map((symptom, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium"
                          >
                            {symptom}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">No symptoms provided</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  {appointment.status === "Pending" && (
                    <div className="flex flex-col md:flex-row gap-3">
                      <button
                        onClick={() => handleAccept(appointment._id)}
                        disabled={actionInProgress === appointment._id}
                        className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-2xl font-semibold transition-all"
                      >
                        {actionInProgress === appointment._id ? "Processing..." : "Accept"}
                      </button>
                      <button
                        onClick={() => handleReject(appointment._id)}
                        disabled={actionInProgress === appointment._id}
                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-2xl font-semibold transition-all"
                      >
                        {actionInProgress === appointment._id ? "Processing..." : "Reject"}
                      </button>
                    </div>
                  )}

                  {appointment.paymentStatus === "Paid" && appointment.status !== "Completed" && (
                    <div className="grid md:grid-cols-2 gap-3">
                      <a
                        href={appointment.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all text-center"
                      >
                        Join Consultation
                      </a>

                      <button
                        onClick={() => navigate(`/doctor/reports/${appointment.patient._id}`)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all"
                      >
                        View Reports
                      </button>

                      <button
                        onClick={() => navigate(`/doctor/prescription/${appointment._id}`)}
                        className="bg-[#7A341F] hover:bg-[#5C2415] text-white px-6 py-3 rounded-2xl font-semibold transition-all"
                      >
                        Create Prescription
                      </button>

                      <button
                        onClick={() => handleComplete(appointment._id)}
                        disabled={actionInProgress === appointment._id}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-2xl font-semibold transition-all"
                      >
                        {actionInProgress === appointment._id ? "Processing..." : "Complete"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentRequests;