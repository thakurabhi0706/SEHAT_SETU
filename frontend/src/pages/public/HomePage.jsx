// HomePage.jsx
import { useNavigate } from "react-router-dom";
import AdvertisementCarousel from "../../components/ads/AdvertisementCarousel";
import Navbar from "../../components/common/Navbar";

import {
  Video,
  Search,
  Pill,
  Stethoscope,
  Shield,
  HeartPulse,
  MapPin,
  ArrowRight,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

import heroImage from "../../assets/images/rural-healthcare.jpg";
import ruralImage1 from "../../assets/images/rural-healthcare1.jpg";
import ruralImage2 from "../../assets/images/rural-healthcare2.jpg";
import ruralImage3 from "../../assets/images/rural-healthcare3.jpg";
import ruralImage4 from "../../assets/images/rural-healthcare4.jpg";

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
      icon: <Video size={40} />,
      color: "from-blue-500 to-blue-600",
      lightColor: "bg-blue-50",
    },
    {
      title: "Find Doctors",
      subtitle: "Book appointments easily",
      icon: <Search size={40} />,
      color: "from-purple-500 to-purple-600",
      lightColor: "bg-purple-50",
    },
    {
      title: "Pharmacy Locator",
      subtitle: "Locate nearby pharmacies",
      icon: <Pill size={40} />,
      color: "from-green-500 to-green-600",
      lightColor: "bg-green-50",
    },
    {
      title: "Specialist Care",
      subtitle: "Consult experienced specialists",
      icon: <Stethoscope size={40} />,
      color: "from-[#8c3b24] to-orange-500",
      lightColor: "bg-orange-50",
    },
  ];

  const specializations = [
    { name: "Cardiology", icon: "❤️" },
    { name: "Dermatology", icon: "🩺" },
    { name: "Gynecology", icon: "👩‍⚕️" },
    { name: "Pediatrics", icon: "👶" },
    { name: "Psychiatry", icon: "🧠" },
    { name: "General Medicine", icon: "⚕️" },
  ];

  const whyChoosePoints = [
    { icon: Shield, title: "Verified Doctors", desc: "All doctors are thoroughly vetted" },
    { icon: Video, title: "Secure Consultations", desc: "End-to-end encrypted video calls" },
    { icon: Pill, title: "Digital Prescriptions", desc: "Instant e-prescriptions available" },
    { icon: MapPin, title: "Rural Access", desc: "Serving remote communities nationwide" },
  ];

  const stats = [
    { number: "120+", label: "Verified Doctors", icon: "👨‍⚕️" },
    { number: "500+", label: "Villages Served", icon: "🏘️" },
    { number: "10K+", label: "Consultations", icon: "📞" },
    { number: "300+", label: "Pharmacies", icon: "💊" },
  ];

  const steps = [
    { step: "1", title: "Find Doctor", icon: "🔍" },
    { step: "2", title: "Book Appointment", icon: "📅" },
    { step: "3", title: "Doctor Confirms", icon: "✅" },
    { step: "4", title: "Video Consultation", icon: "📹" },
    { step: "5", title: "Get Prescription", icon: "📝" },
  ];

  return (
    <div className="bg-gradient-to-b from-[#f7f4ef] via-white to-[#faf8f5]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden pt-12 pb-24">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#8c3b24]/70 via-[#8c3b24]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mt-12 mb-16">
            <h1 className="text-6xl md:text-7xl font-black text-white drop-shadow-2xl leading-tight mb-6">
              Healthcare For Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">Village</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-100 drop-shadow-lg max-w-4xl mx-auto leading-relaxed mb-8">
              Connecting rural communities with trusted doctors, digital prescriptions and secure online consultations from the comfort of home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleProtectedNavigation("/patient/doctors")}
                className="px-8 py-4 bg-gradient-to-r from-[#8c3b24] to-orange-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#8c3b24]/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Find a Doctor <ArrowRight size={20} />
              </button>

              <button
                onClick={() => handleProtectedNavigation("/patient/appointments")}
                className="px-8 py-4 bg-white/20 backdrop-blur-md border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
              >
                Book Consultation
              </button>
            </div>
          </div>

          {/* Advertisement Carousel */}
          <AdvertisementCarousel />
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#8c3b24]/10 overflow-hidden"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8c3b24]/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-3">{stat.icon}</div>
                  <h2 className="text-5xl font-black bg-gradient-to-r from-[#8c3b24] to-orange-500 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </h2>
                  <p className="text-gray-600 font-semibold text-lg">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-100 to-transparent rounded-full blur-3xl opacity-30" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c3b24] to-orange-500">Services</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive healthcare solutions tailored for rural communities
            </p>
          </div>

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
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-3 border border-gray-200 overflow-hidden"
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon Background */}
                <div
                  className={`${service.lightColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 relative z-10 group-hover:text-white`}
                >
                  <span className="group-hover:hidden">{service.icon}</span>
                  <span className="hidden group-hover:block">{service.icon}</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2 relative z-10 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 relative z-10 group-hover:text-white/90 transition-colors duration-300">
                  {service.subtitle}
                </p>

                {/* Arrow Icon */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300 relative z-10">
                  <ArrowRight className="text-white" size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#f7f4ef] to-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c3b24] to-orange-500">Sehat Setu</span> Works
            </h2>
            <p className="text-gray-600 text-lg">
              Five simple steps to quality healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 md:gap-6">
            {steps.map((item, index) => (
              <div key={index} className="relative group">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 -right-3 w-6 h-1 bg-gradient-to-r from-[#8c3b24] to-transparent opacity-30" />
                )}

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent group-hover:border-[#8c3b24]/30 h-full">
                  {/* Step Number */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8c3b24] to-orange-500 text-white flex items-center justify-center font-black text-2xl mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div className="text-4xl text-center mb-4">
                    {item.icon}
                  </div>

                  {/* Text */}
                  <p className="text-center font-bold text-lg text-gray-900">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALIZATIONS SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-100 to-transparent rounded-full blur-3xl opacity-30" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c3b24] to-orange-500">Specializations</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Find specialists in your area of need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {specializations.map((item, index) => (
              <div
                key={index}
                onClick={() => handleProtectedNavigation("/patient/doctors")}
                className="group relative bg-gradient-to-br from-white to-[#faf8f5] p-8 rounded-3xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-3 border-2 border-gray-100 group-hover:border-[#8c3b24]/30 overflow-hidden"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8c3b24]/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">
                    {item.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {item.name}
                  </h3>

                  <button className="inline-flex items-center gap-2 text-[#8c3b24] font-semibold hover:gap-3 transition-all duration-300 group-hover:text-orange-500">
                    Browse Doctors <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#f7f4ef] to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8c3b24]/20 to-orange-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <img
                src={ruralImage4}
                alt="Why Choose Sehat Setu"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-96 group-hover:shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c3b24] to-orange-500">Sehat Setu</span>
              </h2>

              <div className="space-y-6">
                {whyChoosePoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={index}
                      className="flex gap-4 items-start p-4 rounded-2xl bg-white shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent transition-all duration-300 group"
                    >
                      <div className="p-3 bg-gradient-to-br from-[#8c3b24] to-orange-500 text-white rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-1">
                          {point.title}
                        </h4>
                        <p className="text-gray-600">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        className="relative py-32 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${ruralImage2})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-4 drop-shadow-2xl">
            Ready to Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">Medical Help</span>?
          </h2>

          <p className="mt-6 text-xl text-gray-100 drop-shadow-lg max-w-2xl mx-auto mb-8">
            Connect with our trusted network of verified doctors today. Your health is our priority.
          </p>

          <button
            onClick={() => handleProtectedNavigation("/patient/doctors")}
            className="px-10 py-5 bg-gradient-to-r from-[#8c3b24] to-orange-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#8c3b24]/50 transition-all duration-300 transform hover:scale-110 inline-flex items-center gap-3"
          >
            Find a Doctor Now <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#8c3b24] to-orange-500 text-white rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden group">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
              <HeartPulse size={80} className="absolute -top-10 -right-10 opacity-30" />
              <HeartPulse size={60} className="absolute -bottom-10 -left-10 opacity-30" />
            </div>

            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-black mb-4">
                Health Awareness Campaign
              </h3>

              <p className="text-lg text-orange-100 max-w-2xl mx-auto mb-8">
                Bringing quality healthcare access to rural communities across India through technology and innovation.
              </p>

              <button
                onClick={() => handleProtectedNavigation("/patient/doctors")}
                className="px-8 py-4 bg-white text-[#8c3b24] rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Discover More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;