import Navbar from "../../components/common/Navbar";
import { Video, Search, Pill, Stethoscope } from "lucide-react";

function HomePage() {
  const services = [
    {
      title: "Instant Video Consultation",
      subtitle: "Connect with doctors within minutes",
      icon: <Video size={32} />,
    },
    {
      title: "Find Doctors Near You",
      subtitle: "Book confirmed appointments",
      icon: <Search size={32} />,
    },
    {
      title: "Pharmacy Locator",
      subtitle: "Find nearby medicine stores",
      icon: <Pill size={32} />,
    },
    {
      title: "Specialist Care",
      subtitle: "Consult top healthcare experts",
      icon: <Stethoscope size={32} />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold leading-tight">
            Your Health, Our Priority
          </h1>

          <p className="mt-6 text-lg max-w-2xl mx-auto">
            Book appointments, consult doctors online, manage prescriptions,
            and access healthcare seamlessly.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-10 max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-3 flex">
            <input
              type="text"
              placeholder="Search doctors, specialties, clinics..."
              className="flex-1 px-4 py-3 rounded-xl outline-none text-gray-700"
            />

            <button className="bg-blue-600 px-8 rounded-xl font-semibold hover:bg-blue-700 transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Our Healthcare Services
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition cursor-pointer"
            >
              <div className="text-blue-600 mb-4">{service.icon}</div>

              <h3 className="text-xl font-semibold text-gray-800">
                {service.title}
              </h3>

              <p className="text-gray-600 mt-3">{service.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;