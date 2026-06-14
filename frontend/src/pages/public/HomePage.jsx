import { useNavigate } from "react-router-dom";
import AdvertisementCarousel from "../../components/ads/AdvertisementCarousel";
import Navbar from "../../components/common/Navbar";

import {
  Video,
  Search,
  Pill,
  Stethoscope,
  Shield,
  Zap,
  MapPin,
  ArrowRight,
  Users,
  CheckCircle,
  Award,
} from "lucide-react";

import heroImage from "../../assets/images/rural-healthcare.jpg";
import ruralImage2 from "../../assets/images/rural-healthcare2.jpg";
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
      icon: Video,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Find Doctors",
      subtitle: "Book appointments easily",
      icon: Search,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Pharmacy Locator",
      subtitle: "Locate nearby pharmacies",
      icon: Pill,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Specialist Care",
      subtitle: "Consult experienced specialists",
      icon: Stethoscope,
      color: "from-[#7A341F] to-orange-500",
      bgColor: "bg-orange-50",
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
    { icon: Shield, title: "Verified Doctors", desc: "All doctors are thoroughly vetted and certified" },
    { icon: Zap, title: "Secure Consultations", desc: "End-to-end encrypted video calls for privacy" },
    { icon: CheckCircle, title: "Digital Prescriptions", desc: "Instant e-prescriptions available online" },
    { icon: MapPin, title: "Rural Access", desc: "Serving remote communities nationwide" },
  ];

  const stats = [
    { number: "120+", label: "Verified Doctors", icon: "👨‍⚕️" },
    { number: "500+", label: "Villages Served", icon: "🏘️" },
    { number: "10K+", label: "Consultations", icon: "📞" },
    { number: "300+", label: "Pharmacies", icon: "💊" },
  ];

  const steps = [
    { step: "1", title: "Find Doctor", icon: Search },
    { step: "2", title: "Book Appointment", icon: CheckCircle },
    { step: "3", title: "Doctor Confirms", icon: Award },
    { step: "4", title: "Video Consultation", icon: Video },
    { step: "5", title: "Get Prescription", icon: CheckCircle },
  ];

  return (
    <div className="bg-gradient-to-b from-[#f9f6f1] via-white to-[#faf8f5]">
      <Navbar />

       {/* HERO SECTION */}
     <section className="relative h-[650px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#5C2415]/75 via-[#7A341F]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/25 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-center flex-1 flex flex-col justify-start pt-8">
            <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-2xl leading-tight">
              Healthcare For Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">Village</span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <button
                onClick={() => handleProtectedNavigation("/patient/doctors")}
                className="px-6 py-3 bg-gradient-to-r from-[#7A341F] to-orange-500 text-white rounded-lg font-bold hover:shadow-2xl hover:shadow-[#7A341F]/50 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
              >
                Find a Doctor <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleProtectedNavigation("/patient/appointments")}
                className="px-6 py-3 bg-white/20 backdrop-blur-md border-2 border-white text-white rounded-lg font-bold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Book Consultation
              </button>
            </div>
          </div>

          <div className="pb-6 -mt-10">
            <AdvertisementCarousel />
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 relative bg-gradient-to-b from-white to-[#f9f6f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-100 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-10 left-0 w-72 h-72 bg-gradient-to-tr from-amber-50 to-transparent rounded-full blur-3xl opacity-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="text-[#7A341F] font-semibold uppercase text-sm tracking-wide mb-3">
              What We Offer
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A341F] to-orange-500">Services</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive healthcare solutions tailored for rural communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                onClick={() => {
                  if (service.title === "Find Doctors")
                    handleProtectedNavigation("/patient/doctors");
                  if (service.title === "Video Consultation")
                    handleProtectedNavigation("/patient/appointments");
                  if (service.title === "Pharmacy Locator")
                    navigate("/pharmacy-locator");
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#f9f6f1] to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#7A341F] font-semibold uppercase text-sm tracking-wide mb-3">
              Simple Process
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A341F] to-orange-500">Sehat Setu</span> Works
            </h2>
            <p className="text-gray-600 text-lg">
              Five simple steps to quality healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 md:gap-2">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative group">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-20 left-1/2 w-full h-1 bg-gradient-to-r from-[#7A341F]/30 to-transparent -translate-x-full" />
                  )}

                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent group-hover:border-[#7A341F]/20 h-full relative z-10">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7A341F] to-orange-500 text-white flex items-center justify-center font-black text-xl mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </div>

                    <div className="flex justify-center mb-4 text-3xl group-hover:scale-125 transition-transform duration-300">
                      <Icon size={32} className="text-[#7A341F]" />
                    </div>

                    <p className="text-center font-bold text-lg text-gray-900">
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPECIALIZATIONS SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-100 to-transparent rounded-full blur-3xl opacity-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="text-[#7A341F] font-semibold uppercase text-sm tracking-wide mb-3">
              Medical Expertise
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A341F] to-orange-500">Specializations</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Find specialists in your area of need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {specializations.map((item, index) => (
              <SpecializationCard
                key={index}
                item={item}
                onClick={() => handleProtectedNavigation("/patient/doctors")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#f9f6f1] to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7A341F]/20 to-orange-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <img
                src={ruralImage4}
                alt="Why Choose Sehat Setu"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-96 group-hover:shadow-2xl transition-all duration-300 border border-gray-100"
              />
            </div>

            <div>
              <p className="text-[#7A341F] font-semibold uppercase text-sm tracking-wide mb-3">
                Why Choose Us
              </p>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
                Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A341F] to-orange-500">Healthcare</span>
              </h2>

              <div className="space-y-4">
                {whyChoosePoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={index}
                      className="flex gap-4 items-start p-5 rounded-2xl bg-white shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent transition-all duration-300 group border border-gray-100"
                    >
                      <div className="p-3 bg-gradient-to-br from-[#7A341F] to-orange-500 text-white rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-1">
                          {point.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#5C2415]/80 via-[#7A341F]/75 to-[#5C2415]/80" />

        <div className="relative z-10 text-center text-white px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-4 drop-shadow-2xl">
            Ready to Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">Medical Help</span>?
          </h2>

          <p className="mt-6 text-xl text-orange-100 drop-shadow-lg max-w-2xl mx-auto mb-8">
            Connect with our trusted network of verified doctors today. Your health is our priority.
          </p>

          <button
            onClick={() => handleProtectedNavigation("/patient/doctors")}
            className="px-10 py-5 bg-gradient-to-r from-[#7A341F] to-orange-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#7A341F]/50 transition-all duration-300 transform hover:scale-105 active:scale-95 inline-flex items-center gap-3 group"
          >
            Find a Doctor Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}

function StatCard({ stat }) {
  return (
    <div className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#7A341F]/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 text-center">
        <div className="text-5xl mb-3">{stat.icon}</div>
        <h2 className="text-4xl font-black bg-gradient-to-r from-[#7A341F] to-orange-500 bg-clip-text text-transparent mb-2">
          {stat.number}
        </h2>
        <p className="text-gray-600 font-semibold text-lg">
          {stat.label}
        </p>
      </div>
    </div>
  );
}

function ServiceCard({ service, onClick }) {
  const Icon = service.icon;

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-3xl p-8 shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-3 border border-gray-100 overflow-hidden h-full"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div
        className={`${service.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 relative z-10 group-hover:text-white group-hover:bg-white/20`}
      >
        <Icon size={40} className="transition-colors duration-300" />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-2 relative z-10 group-hover:text-white transition-colors duration-300">
        {service.title}
      </h3>

      <p className="text-gray-600 relative z-10 group-hover:text-white/90 transition-colors duration-300">
        {service.subtitle}
      </p>

      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300 relative z-10">
        <ArrowRight className="text-white" size={24} />
      </div>
    </div>
  );
}

function SpecializationCard({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-3xl p-8 shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-3 border-2 border-gray-100 group-hover:border-[#7A341F]/30 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#7A341F]/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 text-center">
        <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">
          {item.icon}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {item.name}
        </h3>

        <button className="inline-flex items-center gap-2 text-[#7A341F] font-semibold hover:gap-3 transition-all duration-300 group-hover:text-orange-500">
          Browse Doctors <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default HomePage;