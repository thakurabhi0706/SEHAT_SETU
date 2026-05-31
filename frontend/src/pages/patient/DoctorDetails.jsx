import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";

import { getDoctorById }
from "../../services/patientDoctorService";

import ruralHealthcare2
from "../../assets/images/rural-healthcare2.jpg";

function DoctorDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);

  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="p-10">
        Doctor not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef]">

      {/* HERO */}

      <div
        className="
          h-[350px]
          bg-cover
          bg-center
          relative
        "
        style={{
          backgroundImage:
            `url(${ruralHealthcare2})`,
        }}
      >
        <div className="absolute inset-0 bg-[#6f2d1b]/70" />

        <div
          className="
            relative
            z-10
            h-full
            flex
            flex-col
            justify-center
            items-center
            text-white
          "
        >
          <h1 className="text-5xl font-bold">
            Doctor Profile
          </h1>

          <p className="mt-4 text-xl">
            Trusted healthcare for rural communities
          </p>
        </div>
      </div>

      {/* CONTENT */}

      <div className="max-w-7xl mx-auto px-6 py-10">

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

          {/* HEADER */}

          <div className="flex items-center gap-6">

            <div
              className="
                w-24
                h-24
                rounded-full
                bg-[#8c3b24]/20
                flex
                items-center
                justify-center
              "
            >
              <Stethoscope
                size={40}
                className="text-[#8c3b24]"
              />
            </div>

            <div>

              <h2 className="text-4xl font-bold">

                Dr. {doctor.fullName}

              </h2>

              <p
                className="
                  text-[#8c3b24]
                  text-xl
                  font-semibold
                  mt-2
                "
              >
                {doctor.specialization}
              </p>

              <span
                className="
                  inline-block
                  mt-3
                  px-4
                  py-1
                  bg-green-100
                  text-green-700
                  rounded-full
                "
              >
                Verified Doctor
              </span>

            </div>

          </div>

          {/* DETAILS */}

          <div
            className="
              grid
              md:grid-cols-2
              gap-10
              mt-10
            "
          >

            <div>

              <h3
                className="
                  text-2xl
                  font-bold
                  mb-6
                "
              >
                Professional Information
              </h3>

              <div className="space-y-4">

                <p>
                  <strong>
                    Experience:
                  </strong>{" "}
                  {doctor.yearsOfExperience} years
                </p>

                <p>
                  <strong>
                    Consultation Fee:
                  </strong>{" "}
                  ₹{doctor.consultationFee}
                </p>

                <p>
                  <strong>
                    Hospital:
                  </strong>{" "}
                  {doctor.hospitalName}
                </p>

                <p>
                  <strong>
                    Clinic:
                  </strong>{" "}
                  {doctor.clinicAddress}
                </p>

              </div>

            </div>

            <div>

              <h3
                className="
                  text-2xl
                  font-bold
                  mb-6
                "
              >
                Availability
              </h3>

              <div className="space-y-3">

                {doctor.availabilitySlots?.map(
                  (slot, index) => (

                    <div
                      key={index}
                      className="
                        border
                        rounded-xl
                        p-4
                      "
                    >
                      <div className="font-semibold">

                        {slot.day}

                      </div>

                      <div>

                        {slot.startTime}
                        {" - "}
                        {slot.endTime}

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </div>

          {/* BUTTON */}

          <div className="mt-10">

            <button
              onClick={() =>
                navigate(
                  `/patient/book-appointment/${doctor._id}`
                )
              }
              className="
                bg-[#8c3b24]
                text-white
                px-8
                py-4
                rounded-xl
                font-semibold
              "
            >
              Book Appointment
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DoctorDetails;