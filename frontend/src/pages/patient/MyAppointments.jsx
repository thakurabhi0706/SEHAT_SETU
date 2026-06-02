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

function MyAppointments() {
  const navigate = useNavigate();
  const handlePayment = async (
      appointment
    ) => {

      try {

        const data =
          await createPaymentOrder(
            appointment._id
          );

        const options = {
          key:
            import.meta.env
              .VITE_RAZORPAY_KEY_ID,

          amount:
            data.order.amount,

          currency:
            data.order.currency,

          name: "Sehat Setu",

          description:
            "Doctor Consultation",

          order_id:
            data.order.id,

          handler: async (
            response
          ) => {

            await verifyPayment({
              ...response,
              appointmentId:
                appointment._id,
            });

            alert(
              "Payment Successful"
            );

            loadAppointments();
          },
        };

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();

      } catch (error) {

        console.error(error);
      }
    };



  const [appointments,
    setAppointments] = useState([]);

  useEffect(() => {

    loadAppointments();

  }, []);

  const loadAppointments =
    async () => {

      try {

        const data =
          await getPatientAppointments();

        setAppointments(data);

      } catch (error) {

        console.error(error);
      }
    };

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
          My Appointments
        </h1>

        <p className="text-gray-500 mb-10">
          Track all your consultations
        </p>

        <button
  onClick={() => navigate(-1)}
  className="
    flex
    items-center
    gap-2
    mb-6
    text-[#8c3b24]
    font-semibold
    hover:text-[#71301d]
    transition
  "
>
  <ArrowLeft size={20} />
  Go Back
</button>

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
                    items-center
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
                        appointment.doctor
                          ?.fullName
                      }
                    </h2>

                    <p
                      className="
                        text-[#8c3b24]
                        font-medium
                      "
                    >
                      {
                        appointment.doctor
                          ?.specialization
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
                    gap-6
                    mt-6
                  "
                >

                  <div>

                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(
                        appointment
                          .appointmentDate
                      ).toLocaleDateString()}
                    </p>

                    <p className="mt-2">
                      <strong>Time:</strong>{" "}
                      {
                        appointment
                          .appointmentTime
                      }
                    </p>

                  </div>

                  <div>

                    <p>
                      <strong>
                        Consultation:
                      </strong>{" "}
                      {
                        appointment
                          .consultationType
                      }
                    </p>

                    <p className="mt-2">
                      <strong>
                        Reason:
                      </strong>{" "}
                      {
                        appointment
                          .reasonForVisit
                      }
                    </p>

                    

                  </div>

                </div>
                  {/* PAYMENT BUTTON */}

{appointment.status === "Confirmed" &&
 appointment.paymentStatus === "Pending" && (

  <button
    onClick={() =>
      handlePayment(appointment)
    }
    className="
      mt-6
      bg-[#8c3b24]
      text-white
      px-6
      py-3
      rounded-xl
      font-semibold
    "
  >
    Pay Now
  </button>

)}

{/* JOIN MEETING */}

{appointment.paymentStatus === "Paid" &&
 appointment.status !== "Completed" &&
 appointment.meetingLink && (

  <a
    href={appointment.meetingLink}
    target="_blank"
    rel="noreferrer"
    className="
      inline-block
      mt-6
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

)}

{appointment.status === "Completed" && (

  <button
    onClick={() =>
      navigate("/patient/prescriptions")
    }
    className="
      mt-6
      bg-[#8c3b24]
      text-white
      px-6
      py-3
      rounded-xl
      font-semibold
    "
  >
    View Prescription
  </button>

)}
              </div>
            )
          )}

        </div>

        

      </div>

    </div>
  );
}

export default MyAppointments;