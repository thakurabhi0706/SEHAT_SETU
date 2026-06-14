import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  createPaymentOrder,
  verifyPayment,
} from "../../api/paymentApi";
import {
  getPatientAppointments,
} from "../../services/appointmentService";
import ruralImage2 from "../../assets/images/rural-healthcare2.jpg";

function MyAppointments() {
  const navigate = useNavigate();
  
  const handlePayment = async (appointment) => {
    try {
      const data = await createPaymentOrder(appointment._id);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Sehat Setu",
        description: "Doctor Consultation",
        order_id: data.order.id,
        handler: async (response) => {
          await verifyPayment({
            ...response,
            appointmentId: appointment._id,
          });
          alert("Payment Successful");
          loadAppointments();
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
    }
  };

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await getPatientAppointments();
      setAppointments(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6]">
      {/* HERO SECTION */}
      <div className="relative h-56 rounded-b-[32px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${ruralImage2})`,
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
          <h1 className="text-5xl font-black">My Appointments</h1>
          <p className="mt-3 text-lg text-orange-100">
            Track all your consultations
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {appointments.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-gray-600">No Appointments Found</h2>
              <p className="text-gray-500 mt-4">You haven't booked any appointments yet.</p>
            </div>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1f2937]">
                      Dr. {appointment.doctor?.fullName}
                    </h2>
                    <p className="text-[#7A341F] font-medium mt-1">
                      {appointment.doctor?.specialization}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap ${
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

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-500 text-sm">Date</p>
                      <p className="font-semibold text-[#1f2937]">
                        {new Date(appointment.appointmentDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Time</p>
                      <p className="font-semibold text-[#1f2937]">
                        {appointment.appointmentTime}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-500 text-sm">Consultation Type</p>
                      <p className="font-semibold text-[#1f2937]">
                        {appointment.consultationType}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Reason for Visit</p>
                      <p className="font-semibold text-[#1f2937]">
                        {appointment.reasonForVisit}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {appointment.status === "Confirmed" &&
                    appointment.paymentStatus === "Pending" && (
                      <button
                        onClick={() => handlePayment(appointment)}
                        className="bg-[#7A341F] hover:bg-[#5C2415] text-white px-6 py-3 rounded-2xl font-semibold transition-all flex-1 sm:flex-none"
                      >
                        Pay Now
                      </button>
                    )}

                  {appointment.paymentStatus === "Paid" &&
                    appointment.status !== "Completed" &&
                    appointment.meetingLink && (
                      <a
                        href={appointment.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all text-center flex-1 sm:flex-none"
                      >
                        Join Consultation
                      </a>
                    )}

                  {appointment.status === "Completed" && (
                    <button
                      onClick={() => navigate("/patient/prescriptions")}
                      className="bg-[#7A341F] hover:bg-[#5C2415] text-white px-6 py-3 rounded-2xl font-semibold transition-all flex-1 sm:flex-none"
                    >
                      View Prescription
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAppointments;