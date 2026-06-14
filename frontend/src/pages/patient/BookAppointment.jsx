import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getDoctorById } from "../../services/patientDoctorService";
import { bookAppointment } from "../../services/appointmentService";
import ruralHealthcare1 from "../../assets/images/rural-healthcare1.jpg";

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    consultationType: "Video",
    reasonForVisit: "",
    symptoms: "",
  });

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const data = await getDoctorById(id);
        setDoctor(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.appointmentDate || !formData.appointmentTime || !formData.reasonForVisit) {
      alert("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    try {
      await bookAppointment({
        doctorId: doctor._id,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        consultationType: formData.consultationType,
        reasonForVisit: formData.reasonForVisit,
        symptoms: formData.symptoms
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
      });

      alert("Appointment request sent successfully");
      navigate("/patient/appointments");
    } catch (error) {
      console.error(error);
      alert("Failed to book appointment");
    } finally {
      setSubmitting(false);
    }
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
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${ruralHealthcare1})`,
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
          <h1 className="text-5xl font-black">Book Appointment</h1>
          <p className="mt-3 text-lg text-orange-100">
            Schedule your consultation with a trusted doctor
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          {/* DOCTOR INFO */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h2 className="text-3xl font-bold text-[#1f2937]">Dr. {doctor.fullName}</h2>
            <p className="text-[#7A341F] font-semibold mt-2">{doctor.specialization}</p>
            <p className="text-gray-600 mt-1">Consultation Fee: <span className="font-semibold">₹{doctor.consultationFee}</span></p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Appointment Date */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Appointment Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all"
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Time Slot <span className="text-red-500">*</span>
                </label>
                <select
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all"
                >
                  <option value="">Select Time Slot</option>
                  {doctor.availabilitySlots && doctor.availabilitySlots.length > 0 ? (
                    doctor.availabilitySlots.map((slot, index) => (
                      <option key={index} value={slot.startTime}>
                        {slot.day} | {slot.startTime} - {slot.endTime}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No slots available
                    </option>
                  )}
                </select>
              </div>

              {/* Consultation Type */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Consultation Type
                </label>
                <select
                  name="consultationType"
                  value={formData.consultationType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all"
                >
                  <option>Video</option>
                  <option>Audio</option>
                  <option>Chat</option>
                  <option>In-Person</option>
                </select>
              </div>

              {/* Fee Display */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Consultation Fee
                </label>
                <div className="border border-gray-300 rounded-2xl px-4 py-3 bg-gray-50 text-gray-700 font-semibold">
                  ₹{doctor.consultationFee}
                </div>
              </div>
            </div>

            {/* Reason For Visit */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Reason For Visit <span className="text-red-500">*</span>
              </label>
              <textarea
                name="reasonForVisit"
                value={formData.reasonForVisit}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Please describe the reason for your visit..."
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all resize-none"
              />
            </div>

            {/* Symptoms */}
            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-2">
                Symptoms (Optional)
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                rows="3"
                placeholder="e.g., fever, headache, cough (separate with commas)"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#7A341F] hover:bg-[#5C2415] disabled:bg-gray-400 text-white px-8 py-4 rounded-2xl font-semibold transition-all flex-1 md:flex-none"
              >
                {submitting ? "Booking..." : "Confirm Appointment"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="border border-[#7A341F] text-[#7A341F] hover:bg-[#7A341F]/5 px-8 py-4 rounded-2xl font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;