// import {
//   Link,
//   useNavigate,
//   useLocation,
// } from "react-router-dom";

// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   getPatientDashboard,
// } from "../../services/patientDashboardService";

// import {
//   LayoutDashboard,
//   Home,
//   UserRoundSearch,
//   CalendarDays,
//   Calendar,
//   Pill,
//   FileText,
//   LogOut,
//   UserCircle,
// } from "lucide-react";

// import { useDispatch,useSelector } from "react-redux";
// import { logout } from "../../features/auth/authSlice";
// import ruralImage from "../../assets/images/rural-healthcare1.jpg";



// function Dashboard() {

//   const navigate = useNavigate();
//   const location = useLocation();

//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const { user } = useSelector(
//     (state) => state.auth
//   );
//   const [stats, setStats] =
//   useState({
//     appointments: 0,
//     reports: 0,
//     prescriptions: 0,
//     doctorsConsulted: 0,
//   });

//   useEffect(() => {
//   fetchDashboard();
// }, []);

// const fetchDashboard = async () => {
//   try {

//     const data =
//       await getPatientDashboard();

//     setStats(data);

//   } catch (error) {
//     console.log(error);
//   }
// };

//   const patientName =
//     user?.fullName || "Patient";
//   return (
//     <div className="min-h-screen bg-[#f7f4ef] flex">

//       {/* SIDEBAR */}
//       <aside className="w-72 bg-[#8c3b24] text-white p-8 flex flex-col">

//         <div>
//           <h1 className="text-3xl font-bold">
//             Sehat Setu
//           </h1>

//           <p className="text-orange-100 mt-2 text-sm">
//             Patient Portal
//           </p>
//         </div>

//         <nav className="mt-12 flex-1 space-y-3">

//           <SidebarItem
//             icon={Home}
//             label="Home"
//             active={
//               location.pathname === "/"
//             }
//             onClick={() =>
//               navigate("/")
//             }
//           />

//           <SidebarItem
//             icon={LayoutDashboard}
//             label="Dashboard"
//             active={
//               location.pathname ===
//               "/patient/dashboard"
//             }
//             onClick={() =>
//               navigate("/patient/dashboard")
//             }
//           />
          
//           <SidebarItem
//             icon={UserCircle}
//             label="My Profile"
//             active={
//               location.pathname ===
//               "/patient/profile"
//             }
//             onClick={() =>
//               navigate("/patient/profile")
//             }
//           />

//           <SidebarItem
//             icon={UserRoundSearch}
//             label="Find Doctors"
//             active={
//               location.pathname ===
//               "/patient/doctors"
//             }
//             onClick={() =>
//               navigate("/patient/doctors")
//             }
//           />

//           <SidebarItem
//             icon={CalendarDays}
//             label="My Appointments"
//             active={
//               location.pathname ===
//               "/patient/appointments"
//             }
//             onClick={() =>
//               navigate("/patient/appointments")
//             }
//           />

//           <SidebarItem
//             icon={Pill}
//             label="Prescriptions"
//             active={
//               location.pathname ===
//               "/patient/prescriptions"
//             }
//             onClick={() =>
//               navigate(
//                 "/patient/prescriptions"
//               )
//             }
//           />

//         </nav>

//         <button
//           onClick={handleLogout}
//           className="
//             flex
//             items-center
//             gap-3
//             text-orange-100
//             hover:text-white
//             transition
//           "
//         >
//           <LogOut size={20} />
//           Logout
//         </button>

//       </aside>

//       {/* MAIN CONTENT */}
//       <div className="flex-1 p-8">

//         {/* HERO */}
//         <div
//           className="
//             relative
//             h-64
//             rounded-3xl
//             overflow-hidden
//             bg-cover
//             bg-center
//           "
//           style={{
//             backgroundImage: `url(${ruralImage})`,
//           }}
//         >
//           <div className="absolute inset-0 bg-[#8c3b24]/70" />

//           <div className="relative z-10 p-10 text-white">

//             <p className="text-2xl">
//               Welcome Back
//             </p>

//             <h1 className="text-6xl font-bold mt-2">
//               {patientName}
//             </h1>

//             <p className="mt-4 text-xl">
//               Your healthcare records,
//               consultations and appointments
//               all in one place.
//             </p>

//           </div>

//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-4 gap-6 mt-8">

//           <div className="bg-white rounded-3xl p-6 shadow">
//             <h3 className="text-gray-500">
//               Appointments
//             </h3>

//             <p className="text-4xl font-bold mt-2">
//               {stats.appointments}
//             </p>
//           </div>

//           <div className="bg-white rounded-3xl p-6 shadow">
//             <h3 className="text-gray-500">
//               Reports
//             </h3>

//             <p className="text-4xl font-bold mt-2">
//               {stats.reports}
//             </p>
//           </div>

//           <div className="bg-white rounded-3xl p-6 shadow">
//             <h3 className="text-gray-500">
//               Prescriptions
//             </h3>

//             <p className="text-4xl font-bold mt-2">
//               {stats.prescriptions}
//             </p>
//           </div>

//           <div className="bg-white rounded-3xl p-6 shadow">
//             <h3 className="text-gray-500">
//               Doctors Consulted
//             </h3>

//             <p className="text-4xl font-bold mt-2">
//               {stats.doctorsConsulted}
//             </p>
//           </div>

//         </div>

//         {/* QUICK ACTIONS */}
//         <div className="mt-10">

//           <h2 className="text-3xl font-bold">
//             Quick Actions
//           </h2>

//           <div className="grid grid-cols-4 gap-6 mt-6">

//             <Link
//               to="/patient/doctors"
//               className="
//                 bg-white
//                 rounded-3xl
//                 p-8
//                 shadow
//                 text-center
//               "
//             >
//               <UserRoundSearch
//                 size={40}
//                 className="mx-auto text-[#8c3b24]"
//               />

//               <p className="mt-4 font-semibold">
//                 Find Doctor
//               </p>
//             </Link>

//             <Link
//               to="/patient/appointments"
//               className="
//                 bg-white
//                 rounded-3xl
//                 p-8
//                 shadow
//                 text-center
//               "
//             >
//               <Calendar
//                 size={40}
//                 className="mx-auto text-[#8c3b24]"
//               />

//               <p className="mt-4 font-semibold">
//                 Appointments
//               </p>
//             </Link>

//             <div
//               className="
//                 bg-white
//                 rounded-3xl
//                 p-8
//                 shadow
//                 text-center
//               "
//             >
//               <FileText
//                 size={40}
//                 className="mx-auto text-[#8c3b24]"
//               />

//               <p className="mt-4 font-semibold">
//                 Reports
//               </p>
//             </div>

//             <Link
//               to="/patient/prescriptions"
//               className="
//                 bg-white
//                 rounded-3xl
//                 p-8
//                 shadow
//                 text-center
//               "
//             >
//               <Pill
//                 size={40}
//                 className="mx-auto text-[#8c3b24]"
//               />

//               <p className="mt-4 font-semibold">
//                 Prescriptions
//               </p>
//             </Link>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }



//   function SidebarItem({
//   icon: Icon,
//   label,
//   active,
//   onClick,
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
//         active
//           ? "bg-white text-[#8c3b24] font-semibold"
//           : "text-orange-100 hover:bg-white/10"
//       }`}
//     >
//       <Icon size={22} />
//       {label}
//     </button>
//   );
// }
// export default Dashboard;

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  getPatientDashboard,
} from "../../services/patientDashboardService";

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
  Activity,
  FileCheck,
  Stethoscope,
  ChevronRight,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
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

  const [stats, setStats] = useState({
    appointments: 0,
    reports: 0,
    prescriptions: 0,
    doctorsConsulted: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data =
        await getPatientDashboard();

      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const patientName =
    user?.fullName || "Patient";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7A341F] mx-auto mb-4"></div>
          <p className="text-[#7A341F] font-semibold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6] flex">
      {/* SIDEBAR */}
      <aside className="w-72 bg-gradient-to-b from-[#7A341F] to-[#5C2415] text-white p-8 flex flex-col shadow-xl">
        <div className="mb-12">
          <h1 className="text-4xl font-black leading-tight">
            Sehat
            <br />
            Setu
          </h1>
          <p className="text-orange-100 mt-3 text-sm font-semibold tracking-wide">
            PATIENT PORTAL
          </p>
          <div className="w-12 h-1 bg-orange-400 rounded-full mt-3"></div>
        </div>

        <nav className="mt-8 flex-1 space-y-2">
          <SidebarItem
            icon={Home}
            label="Home"
            active={location.pathname === "/"}
            onClick={() => navigate("/")}
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
          className="flex items-center gap-3 text-orange-100 hover:text-white hover:bg-white/10 transition-colors py-3 px-4 rounded-xl w-full"
        >
          <LogOut size={20} />
          <span className="font-semibold">Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* HERO SECTION */}
        <div
          className="relative rounded-3xl p-10 text-white shadow-xl overflow-hidden mb-10 hover:shadow-2xl transition-shadow duration-300"
          style={{
            backgroundImage: `url(${ruralImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#5C2415]/88 via-[#7A341F]/80 to-[#5C2415]/70" />

          <div className="relative z-10">
            <p className="text-orange-200 font-semibold tracking-wide uppercase text-sm">
              Welcome Back
            </p>
            <h1 className="text-5xl font-black mt-3">
              {patientName}
            </h1>
            <p className="mt-4 text-orange-100 max-w-2xl leading-relaxed">
              Your healthcare records, consultations, and appointments all in
              one place. Stay healthy, stay informed.
            </p>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={Calendar}
            title="Appointments"
            value={stats.appointments}
            color="bg-blue-50"
            iconColor="text-blue-600"
          />

          <StatCard
            icon={FileCheck}
            title="Reports"
            value={stats.reports}
            color="bg-green-50"
            iconColor="text-green-600"
          />

          <StatCard
            icon={Pill}
            title="Prescriptions"
            value={stats.prescriptions}
            color="bg-amber-50"
            iconColor="text-amber-600"
          />

          <StatCard
            icon={Stethoscope}
            title="Doctors Consulted"
            value={stats.doctorsConsulted}
            color="bg-purple-50"
            iconColor="text-purple-600"
          />
        </div>

        {/* QUICK ACTIONS */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#1f2937] mb-6">Quick Actions</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickActionCard
              icon={UserRoundSearch}
              title="Find Doctor"
              description="Search and book consultations"
              link="/patient/doctors"
              onClick={() => navigate("/patient/doctors")}
            />

            <QuickActionCard
              icon={Calendar}
              title="Appointments"
              description="Manage your appointments"
              link="/patient/appointments"
              onClick={() => navigate("/patient/appointments")}
            />

            <QuickActionCard
              icon={FileText}
              title="Reports"
              description="View your medical reports"
              link="#"
              onClick={() => { }}
            />

            <QuickActionCard
              icon={Pill}
              title="Prescriptions"
              description="Check your prescriptions"
              link="/patient/prescriptions"
              onClick={() => navigate("/patient/prescriptions")}
            />
          </div>
        </div>

        {/* HEALTH SUMMARY & RECENT ACTIVITY */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Health Overview */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1f2937]">Health Overview</h2>
              <Activity size={24} className="text-[#7A341F]" />
            </div>

            <div className="space-y-4">
              <HealthMetric
                label="Total Appointments Booked"
                value={stats.appointments}
                status="active"
              />
              <HealthMetric
                label="Medical Reports Available"
                value={stats.reports}
                status="info"
              />
              <HealthMetric
                label="Active Prescriptions"
                value={stats.prescriptions}
                status="warning"
              />
              <HealthMetric
                label="Healthcare Providers Consulted"
                value={stats.doctorsConsulted}
                status="success"
              />
            </div>
          </div>

          {/* Quick Help & Support */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-6">Resources</h2>

            <div className="space-y-3">
              <ResourceLink
                title="Complete Your Profile"
                description="Add medical history for better consultations"
                onClick={() => navigate("/patient/profile")}
              />

              <ResourceLink
                title="Schedule Appointment"
                description="Book your next consultation with doctors"
                onClick={() => navigate("/patient/doctors")}
              />

              <ResourceLink
                title="View Prescriptions"
                description="Access all your prescriptions in one place"
                onClick={() => navigate("/patient/prescriptions")}
              />

              <ResourceLink
                title="Medical Records"
                description="Download your health reports and documents"
                onClick={() => { }}
              />
            </div>
          </div>
        </div>
      </main>
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
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
        active
          ? "bg-white text-[#7A341F] font-semibold"
          : "text-orange-100 hover:bg-white/10"
      }`}
    >
      <Icon size={22} />
      <span>{label}</span>
    </button>
  );
}

function StatCard({ icon: Icon, title, value, color, iconColor }) {
  return (
    <div className={`${color} rounded-3xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-700 font-semibold">{title}</p>
        <Icon size={24} className={iconColor} />
      </div>
      <p className="text-3xl font-black text-[#1f2937]">{value}</p>
    </div>
  );
}

function QuickActionCard({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-lg hover:border-[#7A341F]/20 transition-all duration-300 text-left group"
    >
      <div className="mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7A341F]/10 to-[#5C2415]/10 flex items-center justify-center group-hover:from-[#7A341F]/20 group-hover:to-[#5C2415]/20 transition-colors">
          <Icon size={24} className="text-[#7A341F]" />
        </div>
      </div>
      <h3 className="font-bold text-[#1f2937] text-lg">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </button>
  );
}

function HealthMetric({ label, value, status }) {
  const statusColors = {
    active: "bg-blue-100 text-blue-700",
    info: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    success: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
      <span className="text-gray-600">{label}</span>
      <span className={`px-4 py-2 rounded-full text-sm font-bold ${statusColors[status]}`}>
        {value}
      </span>
    </div>
  );
}

function ResourceLink({ title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-gradient-to-r from-[#7A341F]/5 to-[#5C2415]/5 hover:from-[#7A341F]/10 hover:to-[#5C2415]/10 border border-[#7A341F]/20 hover:border-[#7A341F]/40 transition-all duration-200 text-left group"
    >
      <div>
        <p className="font-semibold text-[#1f2937]">{title}</p>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      </div>
      <ChevronRight size={20} className="text-[#7A341F] group-hover:translate-x-1 transition-transform" />
    </button>
  );
}

export default Dashboard;