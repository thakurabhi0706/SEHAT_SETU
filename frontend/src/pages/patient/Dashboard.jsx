import { Link } from "react-router-dom";
import {
  Calendar,
  UserRoundSearch,
  FileText,
  Pill,
} from "lucide-react";

import ruralImage from "../../assets/images/rural-healthcare1.jpg";

function Dashboard() {
  const patientName =
    JSON.parse(localStorage.getItem("user"))
      ?.fullName || "Patient";

  return (
    <div className="min-h-screen bg-[#f7f4ef] flex">

      {/* SIDEBAR */}
      <div className="w-72 bg-[#8c3b24] text-white p-8">

        <h1 className="text-5xl font-bold">
          Sehat Setu
        </h1>

        <p className="mt-2 text-white/80">
          Patient Portal
        </p>

        <div className="mt-16 space-y-6">

          <Link
            to="/patient/dashboard"
            className="block"
          >
            Dashboard
          </Link>

          <Link
            to="/patient/doctors"
            className="block"
          >
            Find Doctors
          </Link>

          <Link
            to="/patient/appointments"
            className="block"
          >
            My Appointments
          </Link>

          <Link
            to="/patient/prescriptions"
            className="block"
          >
            Prescriptions
          </Link>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* HERO */}
        <div
          className="
            relative
            h-64
            rounded-3xl
            overflow-hidden
            bg-cover
            bg-center
          "
          style={{
            backgroundImage: `url(${ruralImage})`,
          }}
        >
          <div className="absolute inset-0 bg-[#8c3b24]/70" />

          <div className="relative z-10 p-10 text-white">

            <p className="text-2xl">
              Welcome Back
            </p>

            <h1 className="text-6xl font-bold mt-2">
              {patientName}
            </h1>

            <p className="mt-4 text-xl">
              Your healthcare records,
              consultations and appointments
              all in one place.
            </p>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mt-8">

          <div className="bg-white rounded-3xl p-6 shadow">
            <h3 className="text-gray-500">
              Appointments
            </h3>

            <p className="text-4xl font-bold mt-2">
              5
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow">
            <h3 className="text-gray-500">
              Reports
            </h3>

            <p className="text-4xl font-bold mt-2">
              12
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow">
            <h3 className="text-gray-500">
              Prescriptions
            </h3>

            <p className="text-4xl font-bold mt-2">
              4
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow">
            <h3 className="text-gray-500">
              Doctors Consulted
            </h3>

            <p className="text-4xl font-bold mt-2">
              3
            </p>
          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="mt-10">

          <h2 className="text-3xl font-bold">
            Quick Actions
          </h2>

          <div className="grid grid-cols-4 gap-6 mt-6">

            <Link
              to="/patient/doctors"
              className="
                bg-white
                rounded-3xl
                p-8
                shadow
                text-center
              "
            >
              <UserRoundSearch
                size={40}
                className="mx-auto text-[#8c3b24]"
              />

              <p className="mt-4 font-semibold">
                Find Doctor
              </p>
            </Link>

            <Link
              to="/patient/appointments"
              className="
                bg-white
                rounded-3xl
                p-8
                shadow
                text-center
              "
            >
              <Calendar
                size={40}
                className="mx-auto text-[#8c3b24]"
              />

              <p className="mt-4 font-semibold">
                Appointments
              </p>
            </Link>

            <div
              className="
                bg-white
                rounded-3xl
                p-8
                shadow
                text-center
              "
            >
              <FileText
                size={40}
                className="mx-auto text-[#8c3b24]"
              />

              <p className="mt-4 font-semibold">
                Reports
              </p>
            </div>

            <Link
              to="/patient/prescriptions"
              className="
                bg-white
                rounded-3xl
                p-8
                shadow
                text-center
              "
            >
              <Pill
                size={40}
                className="mx-auto text-[#8c3b24]"
              />

              <p className="mt-4 font-semibold">
                Prescriptions
              </p>
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;