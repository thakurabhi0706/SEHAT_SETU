import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getDoctorById }
from "../../services/patientDoctorService";

import { bookAppointment }
from "../../services/appointmentService";

import ruralHealthcare1
from "../../assets/images/rural-healthcare1.jpg";

function BookAppointment() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      appointmentDate: "",
      appointmentTime: "",
      consultationType: "Video",
      reasonForVisit: "",
      symptoms: "",
    });

  useEffect(() => {

    const loadDoctor = async () => {

      try {

        const data =
          await getDoctorById(id);

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

  const handleSubmit = async () => {

    try {

      await bookAppointment({
        doctorId: doctor._id,
        appointmentDate:
          formData.appointmentDate,
        appointmentTime:
          formData.appointmentTime,
        consultationType:
          formData.consultationType,
        reasonForVisit:
          formData.reasonForVisit,
        symptoms:
          formData.symptoms
            .split(",")
            .map((s) => s.trim()),
      });

      alert(
        "Appointment request sent successfully"
      );

      navigate(
        "/patient/appointments"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to book appointment"
      );
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
    <div className="min-h-screen bg-[#f7f4ef]">

      {/* HERO */}

      <div
        className="
          h-[300px]
          bg-cover
          bg-center
          relative
        "
        style={{
          backgroundImage:
            `url(${ruralHealthcare1})`,
        }}
      >
        <div className="absolute inset-0 bg-[#6f2d1b]/70" />

        <div
          className="
            relative
            z-10
            h-full
            flex
            items-center
            justify-center
            flex-col
            text-white
          "
        >
          <h1 className="text-5xl font-bold">
            Book Appointment
          </h1>

          <p className="mt-4 text-xl">
            Schedule your consultation
          </p>
        </div>
      </div>

      {/* CONTENT */}

      <div className="max-w-6xl mx-auto p-8">

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

        <div
          className="
            bg-white
            rounded-3xl
            shadow-md
            p-8
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              mb-2
            "
          >
            Dr. {doctor.fullName}
          </h2>

          <p
            className="
              text-[#8c3b24]
              font-semibold
              mb-8
            "
          >
            {doctor.specialization}
          </p>

          <div
            className="
              grid
              md:grid-cols-2
              gap-6
            "
          >

            <div>

              <label className="font-semibold">
                Appointment Date
              </label>

              <input
                type="date"
                name="appointmentDate"
                value={
                  formData.appointmentDate
                }
                onChange={handleChange}
                className="
                  w-full
                  border
                  rounded-xl
                  p-4
                  mt-2
                "
              />

            </div>

            <div>

              <label className="font-semibold">
                Time Slot
              </label>

              <select
                name="appointmentTime"
                value={
                  formData.appointmentTime
                }
                onChange={handleChange}
                className="
                  w-full
                  border
                  rounded-xl
                  p-4
                  mt-2
                "
              >
                <option value="">
                  Select Time
                </option>

                {doctor.availabilitySlots?.map(
                  (slot, index) => (

                    <option
                      key={index}
                      value={
                        slot.startTime
                      }
                    >
                      {slot.day}
                      {" | "}
                      {slot.startTime}
                      {" - "}
                      {slot.endTime}
                    </option>
                  )
                )}

              </select>

            </div>

            <div>

              <label className="font-semibold">
                Consultation Type
              </label>

              <select
                name="consultationType"
                value={
                  formData.consultationType
                }
                onChange={handleChange}
                className="
                  w-full
                  border
                  rounded-xl
                  p-4
                  mt-2
                "
              >
                <option>
                  Video
                </option>

                <option>
                  Audio
                </option>

                <option>
                  Chat
                </option>

                <option>
                  In-Person
                </option>

              </select>

            </div>

            <div>

              <label className="font-semibold">
                Consultation Fee
              </label>

              <div
                className="
                  border
                  rounded-xl
                  p-4
                  mt-2
                  bg-gray-50
                "
              >
                ₹{doctor.consultationFee}
              </div>

            </div>

          </div>

          <div className="mt-6">

            <label className="font-semibold">
              Reason For Visit
            </label>

            <textarea
              name="reasonForVisit"
              value={
                formData.reasonForVisit
              }
              onChange={handleChange}
              rows="4"
              className="
                w-full
                border
                rounded-xl
                p-4
                mt-2
              "
            />

          </div>

          <div className="mt-6">

            <label className="font-semibold">
              Symptoms
            </label>

            <textarea
              name="symptoms"
              value={
                formData.symptoms
              }
              onChange={handleChange}
              rows="3"
              placeholder="
                fever, headache, cough
              "
              className="
                w-full
                border
                rounded-xl
                p-4
                mt-2
              "
            />

          </div>

          <button
            onClick={handleSubmit}
            className="
              mt-8
              bg-[#8c3b24]
              text-white
              px-8
              py-4
              rounded-xl
              font-semibold
            "
          >
            Confirm Appointment
          </button>

        </div>

      </div>

    </div>
  );
}

export default BookAppointment;