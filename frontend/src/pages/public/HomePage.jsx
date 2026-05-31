import { useNavigate } from "react-router-dom";

import Navbar from "../../components/common/Navbar";

import {
  Video,
  Search,
  Pill,
  Stethoscope,
  Shield,
  HeartPulse,
  MapPin,
} from "lucide-react";

import heroImage from "../../assets/images/rural-healthcare.jpg";
import ruralImage1 from "../../assets/images/rural-healthcare1.jpg";
import ruralImage2 from "../../assets/images/rural-healthcare2.jpg";
import ruralImage3 from "../../assets/images/rural-healthcare3.jpg";

function HomePage() {
  const navigate = useNavigate();

  const handleProtectedNavigation = (path) => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login"); 
    return;
  }

  navigate(path);
};

  const services = [
    {
      title: "Video Consultation",
      subtitle: "Connect with verified doctors",
      icon: <Video size={32} />,
    },
    {
      title: "Find Doctors",
      subtitle: "Book appointments easily",
      icon: <Search size={32} />,
    },
    {
      title: "Pharmacy Locator",
      subtitle: "Locate nearby pharmacies",
      icon: <Pill size={32} />,
    },
    {
      title: "Specialist Care",
      subtitle: "Consult experienced specialists",
      icon: <Stethoscope size={32} />,
    },
  ];

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Gynecology",
    "Pediatrics",
    "Psychiatry",
    "General Medicine",
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ef]">

      <Navbar />

      {/* HERO */}

      <section
        className="relative h-[700px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-[#8c3b24]/55" />

        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-6">

          <h1 className="text-6xl font-bold max-w-5xl leading-tight">
            Healthcare For Every Village
          </h1>

          <p className="mt-6 text-xl max-w-3xl">
            Connecting rural communities with trusted doctors,
            digital prescriptions and online consultations.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap justify-center">
            <button
              onClick={() =>
                handleProtectedNavigation("/patient/doctors")
              }
              className="
                bg-[#8c3b24]
                hover:bg-[#73301d]
                px-8
                py-4
                rounded-xl
                font-semibold
                transition
              "
            >
              Find Doctors
            </button>

            <button
              onClick={() =>
                handleProtectedNavigation("/patient/appointments")
              }
              className="
                border
                border-white
                px-8
                py-4
                rounded-xl
                font-semibold
                hover:bg-white
                hover:text-[#8c3b24]
                transition
              "
            >
              Video Consultation
            </button>
          </div>

        </div>
      </section>

      {/* STATS */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

          <div className="text-center">
            <h2 className="text-5xl font-bold text-[#8c3b24]">
              120+
            </h2>
            <p className="mt-2 text-gray-500">
              Verified Doctors
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-5xl font-bold text-[#8c3b24]">
              500+
            </h2>
            <p className="mt-2 text-gray-500">
              Villages Served
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-5xl font-bold text-[#8c3b24]">
              10K+
            </h2>
            <p className="mt-2 text-gray-500">
              Consultations
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-5xl font-bold text-[#8c3b24]">
              300+
            </h2>
            <p className="mt-2 text-gray-500">
              Pharmacies
            </p>
          </div>

        </div>

      </section>

      {/* SERVICES */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center mb-16">
            Our Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {services.map((service, index) => (

              <div
                key={index}
                onClick={() => {
                  if (service.title === "Find Doctors")
                    handleProtectedNavigation("/patient/doctors");

                  if (service.title === "Video Consultation")
                    handleProtectedNavigation("/patient/appointments");

                  if (service.title === "Pharmacy Locator")
                    navigate("/pharmacy-locator");
                }}
                className="
                  bg-white
                  rounded-3xl
                  p-8
                  shadow-md
                  cursor-pointer
                  hover:bg-[#8c3b24]
                  hover:text-white
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >

                <div className="mb-6">
                  {service.icon}
                </div>

                <h3 className="text-xl font-semibold">
                  {service.title}
                </h3>

                <p className="mt-3">
                  {service.subtitle}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section className="bg-white py-24">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center mb-20">
            How Sehat Setu Works
          </h2>

          <div className="grid md:grid-cols-5 gap-6">

            {[
              "Find Doctor",
              "Book Appointment",
              "Doctor Confirms",
              "Video Consultation",
              "Get Prescription",
            ].map((step, index) => (

              <div
                key={index}
                className="
                  bg-[#f7f4ef]
                  rounded-3xl
                  p-8
                  text-center
                "
              >

                <div
                  className="
                    w-14 h-14
                    rounded-full
                    bg-[#8c3b24]
                    text-white
                    flex items-center
                    justify-center
                    mx-auto
                    font-bold
                    text-xl
                  "
                >
                  {index + 1}
                </div>

                <p className="mt-5 font-semibold">
                  {step}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* SPECIALIZATIONS */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center mb-16">
            Popular Specializations
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {specializations.map((item, index) => (

              <div
                key={index}
                onClick={() =>
                  handleProtectedNavigation("/patient/doctors")
                }
                className="
                  bg-white
                  p-8
                  rounded-3xl
                  shadow-md
                  text-center
                  cursor-pointer
                  hover:bg-[#8c3b24]
                  hover:text-white
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >
                <HeartPulse
                  size={36}
                  className="mx-auto text-[#8c3b24]"
                />

                <h3 className="mt-4 text-xl font-semibold">
                  {item}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* WHY CHOOSE */}

      <section className="bg-white py-24">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          <img
            src={ruralImage3}
            alt=""
            className="rounded-3xl"
          />

          <div>

            <h2 className="text-5xl font-bold mb-10">
              Why Choose Sehat Setu
            </h2>

            <div className="space-y-6">

              <div className="flex gap-4">
                <Shield />
                <p>Verified Doctors</p>
              </div>

              <div className="flex gap-4">
                <Video />
                <p>Secure Video Consultations</p>
              </div>

              <div className="flex gap-4">
                <Pill />
                <p>Digital Prescriptions</p>
              </div>

              <div className="flex gap-4">
                <MapPin />
                <p>Accessible Rural Healthcare</p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ADVERTISEMENT */}

      <section className="py-20">

        <div
          className="
            max-w-6xl
            mx-auto
            bg-[#8c3b24]
            text-white
            rounded-3xl
            p-12
            text-center
          "
        >
          <div className="space-y-3">
              <h3 className="text-3xl font-bold">
                Health Awareness Campaign
              </h3>

              <p className="text-lg">
                Bringing quality healthcare access
                to rural communities across India.
              </p>
            </div>
        </div>

      </section>

      {/* CTA */}

      <section
        className="
          relative
          py-32
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: `url(${ruralImage2})`,
        }}
      >

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center text-white px-6">

          <h2 className="text-5xl font-bold">
            Need Medical Help?
          </h2>

          <p className="mt-6 text-xl">
            Connect with trusted doctors today.
          </p>
            
          <button
            onClick={() =>
              handleProtectedNavigation("/patient/doctors")
            }
            className="
              mt-8
              bg-[#8c3b24]
              hover:bg-[#73301d]
              px-8 py-4
              rounded-xl
              font-semibold
              transition-all
              duration-300
            "
          >
            Find Doctor
          </button>

        </div>

      </section>

    </div>
  );
}

export default HomePage;