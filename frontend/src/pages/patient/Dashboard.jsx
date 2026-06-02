import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";


import {
  LayoutDashboard,
  Home,
  UserRoundSearch,
  CalendarDays,
  Calendar,
  Pill,
  FileText,
  LogOut,
  UserCircle,
} from "lucide-react";

import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import ruralImage from "../../assets/images/rural-healthcare1.jpg";



function Dashboard() {

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const { user } = useSelector(
    (state) => state.auth
  );

  const patientName =
    user?.fullName || "Patient";

  return (
    <div className="min-h-screen bg-[#f7f4ef] flex">

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#8c3b24] text-white p-8 flex flex-col">

        <div>
          <h1 className="text-3xl font-bold">
            Sehat Setu
          </h1>

          <p className="text-orange-100 mt-2 text-sm">
            Patient Portal
          </p>
        </div>

        <nav className="mt-12 flex-1 space-y-3">

          <SidebarItem
            icon={Home}
            label="Home"
            active={
              location.pathname === "/"
            }
            onClick={() =>
              navigate("/")
            }
          />

          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            active={
              location.pathname ===
              "/patient/dashboard"
            }
            onClick={() =>
              navigate("/patient/dashboard")
            }
          />
          
          <SidebarItem
            icon={UserCircle}
            label="My Profile"
            active={
              location.pathname ===
              "/patient/profile"
            }
            onClick={() =>
              navigate("/patient/profile")
            }
          />

          <SidebarItem
            icon={UserRoundSearch}
            label="Find Doctors"
            active={
              location.pathname ===
              "/patient/doctors"
            }
            onClick={() =>
              navigate("/patient/doctors")
            }
          />

          <SidebarItem
            icon={CalendarDays}
            label="My Appointments"
            active={
              location.pathname ===
              "/patient/appointments"
            }
            onClick={() =>
              navigate("/patient/appointments")
            }
          />

          <SidebarItem
            icon={Pill}
            label="Prescriptions"
            active={
              location.pathname ===
              "/patient/prescriptions"
            }
            onClick={() =>
              navigate(
                "/patient/prescriptions"
              )
            }
          />

        </nav>

        <button
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-3
            text-orange-100
            hover:text-white
            transition
          "
        >
          <LogOut size={20} />
          Logout
        </button>

      </aside>

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



  function SidebarItem({
  icon: Icon,
  label,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
        active
          ? "bg-white text-[#8c3b24] font-semibold"
          : "text-orange-100 hover:bg-white/10"
      }`}
    >
      <Icon size={22} />
      {label}
    </button>
  );
}
export default Dashboard;