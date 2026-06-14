// import {
//   LayoutDashboard,
//   CalendarDays,
//   Users,
//   IndianRupee,
//   Star,
//   Clock3,
//   UserCircle,
//   LogOut,
//   Home,
// } from "lucide-react";



// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   getDoctorDashboard,
// } from "../../services/doctorDashboardService";

// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";

// import { logout } from "../../features/auth/authSlice";



// function DoctorDashboard() {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [dashboardData,
//   setDashboardData] =
//   useState(null);

//   useEffect(() => {

//   const fetchDashboard =
//     async () => {

//       try {

//         const data =
//           await getDoctorDashboard();

//         setDashboardData(data);

//       } catch (error) {
//         console.log(error);
//       }

//     };

//   fetchDashboard();

// }, []);
  
//   const handleLogout = () => {
//       dispatch(logout());
//       navigate("/login");
//     };
//   const stats = [
//     {
//       title: "Patients",
//       value:
//         dashboardData
//           ?.totalPatients || 0,
//       icon: Users,
//     },
//     {
//       title: "Appointments",
//       value:
//         dashboardData
//           ?.totalAppointments || 0,
//       icon: CalendarDays,
//     },
//     {
//       title: "Earnings",
//       value: `₹${
//         dashboardData
//           ?.totalEarnings || 0
//       }`,
//       icon: IndianRupee,
//     },
//     {
//       title: "Rating",
//       value: "5.0",
//       icon: Star,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#f7f4ef] flex">
      
//       {/* SIDEBAR */}
//       <aside className="w-72 bg-[#8c3b24] text-white p-8 flex flex-col">
        
//         {/* LOGO */}
//         <div>
//           <h1 className="text-3xl font-bold">
//             Sehat Setu
//           </h1>

//           <p className="text-orange-100 mt-2 text-sm">
//             Doctor Portal
//           </p>
//         </div>

//         {/* MENU */}
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
//               location.pathname === "/doctor/dashboard"
//             }
//             onClick={() =>
//               navigate("/doctor/dashboard")
//             }
//           />

//           <SidebarItem
//             icon={UserCircle}
//             label="Profile"
//             active={
//               location.pathname === "/doctor/profile"
//             }
//             onClick={() =>
//               navigate("/doctor/profile")
//             }
//           />

//           <SidebarItem
//             icon={CalendarDays}
//             label="Appointments"
//             active={
//               location.pathname === "/doctor/appointments"
//             }
//             onClick={() =>
//               navigate("/doctor/appointments")
//             }
//           />

//           <SidebarItem
//             icon={Users}
//             label="Patients"
//             active={
//               location.pathname === "/doctor/patients"
//             }
//             onClick={() =>
//               navigate("/doctor/patients")
//             }
//           />

//           <SidebarItem
//             icon={Clock3}
//             label="Availability"
//             active={
//               location.pathname === "/doctor/availability"
//             }
//             onClick={() =>
//               navigate("/doctor/availability")
//             }
//           />

//           <SidebarItem
//             icon={IndianRupee}
//             label="Earnings"
//             active={
//               location.pathname === "/doctor/earnings"
//             }
//             onClick={() =>
//               navigate("/doctor/earnings")
//             }
//           />

//           `
//         </nav>

//         {/* LOGOUT */}
//        <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 text-orange-100 hover:text-white transition"
//         >
//           <LogOut size={20} />
//           Logout
//         </button>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="flex-1 p-10 overflow-y-auto">
        
//         {/* HEADER */}
//         <div
//             className="relative rounded-3xl p-8 text-white shadow-xl overflow-hidden"
//             style={{
//               backgroundImage:
//                 "url('/images/rural-healthcare1.jpg')",
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           >
//           {/* DARK OVERLAY */}
//           <div className="absolute inset-0 bg-gradient-to-r from-[#5c2415]/85 to-[#8c3b24]/60"></div>
//           <div className="relative z-10 flex items-center justify-between">
            
//             <div>
//               <p className="text-orange-100">
//                 Welcome Back
//               </p>

//               <h1 className="text-4xl font-bold mt-2">
//                 Dr. {user?.fullName}
//               </h1>

//               <p className="mt-4 text-orange-50 max-w-2xl">
//                 Continue serving rural communities through
//                 trusted digital healthcare.
//               </p>
//             </div>

//             <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl">
//               Approved Doctor
//             </div>

            
//           </div>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
//           {stats.map((item) => {
//             const Icon = item.icon;

//             return (
//               <div
//                 key={item.title}
//                 className="bg-white rounded-3xl p-6 shadow-md border border-[#efe5db]"
//               >
//                 <div className="flex items-center justify-between">
                  
//                   <div>
//                     <p className="text-gray-500">
//                       {item.title}
//                     </p>

//                     <h2 className="text-3xl font-bold mt-3 text-gray-900">
//                       {item.value}
//                     </h2>
//                   </div>

//                   <div className="bg-[#f5e6dc] p-4 rounded-2xl">
//                     <Icon className="text-[#8c3b24]" />
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* CONTENT SECTION */}
//         <div className="grid lg:grid-cols-3 gap-8 mt-10">
          
//           {/* UPCOMING APPOINTMENTS */}
//           <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-md border border-[#efe5db]">
            
//             <h2 className="text-2xl font-bold text-gray-900">
//               Upcoming Appointments
//             </h2>

//             <div className="mt-6 space-y-4">
              
//               {
//                 dashboardData
//                 ?.upcomingAppointments
//                 ?.map((appointment) => (

//                 <div
//                   key={appointment._id}
//                   className="
//                   flex items-center
//                   justify-between
//                   bg-[#fcfaf8]
//                   border
//                   border-[#efe5db]
//                   rounded-2xl
//                   p-5"
//                 >

//                   <div>

//                     <h3 className="font-semibold text-lg">
//                       {
//                       appointment.patient
//                         ?.fullName
//                       }
//                     </h3>

//                     <p className="text-gray-500 mt-1">
//                       {
//                       appointment.consultationType
//                       }
//                     </p>

//                   </div>

//                   <div className="text-right">

//                     <p className="font-semibold">
//                       {
//                       appointment.appointmentTime
//                       }
//                     </p>

//                     <p className="text-gray-500">
//                       {
//                       new Date(
//                         appointment.appointmentDate
//                       ).toLocaleDateString()
//                       }
//                     </p>

//                   </div>

//                 </div>

//                 ))
//                 }
//             </div>
//           </div>

//           {/* ACTIVITY */}
//           <div className="bg-white rounded-3xl p-8 shadow-md border border-[#efe5db]">
            
//             <h2 className="text-2xl font-bold text-gray-900">
//               Recent Activity
//             </h2>

//             <div className="mt-6 space-y-5">
              
//               <ActivityItem text="New appointment booked" />
//               <ActivityItem text="Profile approved by admin" />
//               <ActivityItem text="Patient uploaded reports" />
//               <ActivityItem text="Consultation completed" />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// function SidebarItem({
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

// function ActivityItem({ text }) {
//   return (
//     <div className="border-l-4 border-[#c26a3d] pl-4">
//       <p className="text-gray-700">{text}</p>
//     </div>
//   );
// }

// export default DoctorDashboard;


import {
  LayoutDashboard,
  CalendarDays,
  Users,
  IndianRupee,
  Star,
  Clock3,
  UserCircle,
  LogOut,
  Home,
  TrendingUp,
  Activity,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  getDoctorDashboard,
} from "../../services/doctorDashboardService";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { logout } from "../../features/auth/authSlice";

function DoctorDashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDoctorDashboard();
        setDashboardData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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

  const stats = [
    {
      title: "Patients",
      value: dashboardData?.totalPatients || 0,
      icon: Users,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Appointments",
      value: dashboardData?.totalAppointments || 0,
      icon: CalendarDays,
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Earnings",
      value: `₹${(dashboardData?.totalEarnings || 0).toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Rating",
      value: dashboardData?.rating || "5.0",
      icon: Star,
      color: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

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
            DOCTOR PORTAL
          </p>
          <div className="w-12 h-1 bg-orange-400 rounded-full mt-3"></div>
        </div>

        {/* MENU */}
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
            active={location.pathname === "/doctor/dashboard"}
            onClick={() => navigate("/doctor/dashboard")}
          />

          <SidebarItem
            icon={UserCircle}
            label="Profile"
            active={location.pathname === "/doctor/profile"}
            onClick={() => navigate("/doctor/profile")}
          />

          <SidebarItem
            icon={CalendarDays}
            label="Appointments"
            active={location.pathname === "/doctor/appointments"}
            onClick={() => navigate("/doctor/appointments")}
          />

          <SidebarItem
            icon={Users}
            label="Patients"
            active={location.pathname === "/doctor/patients"}
            onClick={() => navigate("/doctor/patients")}
          />

          <SidebarItem
            icon={Clock3}
            label="Availability"
            active={location.pathname === "/doctor/availability"}
            onClick={() => navigate("/doctor/availability")}
          />

          <SidebarItem
            icon={IndianRupee}
            label="Earnings"
            active={location.pathname === "/doctor/earnings"}
            onClick={() => navigate("/doctor/earnings")}
          />
        </nav>

        {/* LOGOUT */}
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
        <div className="relative rounded-3xl p-10 text-white shadow-xl overflow-hidden mb-10 hover:shadow-2xl transition-shadow duration-300">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/rural-healthcare1.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5C2415]/88 via-[#7A341F]/80 to-[#5C2415]/70" />

          <div className="relative z-10">
            <p className="text-orange-200 font-semibold tracking-wide uppercase text-sm">
              Welcome Back
            </p>
            <h1 className="text-5xl font-black mt-3">
              Dr. {user?.fullName}
            </h1>
            <p className="mt-4 text-orange-100 max-w-2xl leading-relaxed">
              Continue serving rural communities through trusted digital
              healthcare. Manage your appointments, patients, and earnings in
              one place.
            </p>
          </div>

          <div className="absolute top-6 right-6 bg-white/15 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
            <p className="text-orange-100 text-sm">Status</p>
            <p className="font-bold text-lg">Approved Doctor</p>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <StatCard
                key={stat.title}
                icon={Icon}
                title={stat.title}
                value={stat.value}
                color={stat.color}
                iconColor={stat.iconColor}
              />
            );
          })}
        </div>

        {/* CONTENT SECTION */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* UPCOMING APPOINTMENTS */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1f2937]">
                Upcoming Appointments
              </h2>
              <CalendarDays size={24} className="text-[#7A341F]" />
            </div>

            <div className="space-y-3">
              {dashboardData?.upcomingAppointments &&
              dashboardData.upcomingAppointments.length > 0 ? (
                dashboardData.upcomingAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment._id}
                    appointment={appointment}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <CalendarDays size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No upcoming appointments</p>
                </div>
              )}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1f2937]">
                Recent Activity
              </h2>
              <Activity size={24} className="text-[#7A341F]" />
            </div>

            <div className="space-y-3">
              <ActivityItem
                icon={CheckCircle}
                text="New appointment booked"
                status="success"
              />
              <ActivityItem
                icon={CheckCircle}
                text="Profile approved by admin"
                status="success"
              />
              <ActivityItem
                icon={AlertCircle}
                text="Patient uploaded reports"
                status="info"
              />
              <ActivityItem
                icon={CheckCircle}
                text="Consultation completed"
                status="success"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-6">Quick Stats</h2>

            <div className="space-y-4">
              <StatRow
                label="Total Patients Served"
                value={dashboardData?.totalPatients || 0}
                icon={Users}
              />
              <StatRow
                label="Total Appointments"
                value={dashboardData?.totalAppointments || 0}
                icon={CalendarDays}
              />
              <StatRow
                label="This Month Earnings"
                value={`₹${(dashboardData?.totalEarnings || 0).toLocaleString("en-IN")}`}
                icon={IndianRupee}
              />
              <StatRow
                label="Doctor Rating"
                value={dashboardData?.rating || "5.0"}
                icon={Star}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-6">Quick Actions</h2>

            <div className="space-y-3">
              <QuickActionButton
                label="View All Appointments"
                onClick={() => navigate("/doctor/appointments")}
              />
              <QuickActionButton
                label="Manage My Availability"
                onClick={() => navigate("/doctor/availability")}
              />
              <QuickActionButton
                label="View All Patients"
                onClick={() => navigate("/doctor/patients")}
              />
              <QuickActionButton
                label="Check Earnings"
                onClick={() => navigate("/doctor/earnings")}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick }) {
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

function AppointmentCard({ appointment }) {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-[#7A341F]/5 to-[#5C2415]/5 border border-[#7A341F]/20 rounded-2xl p-5 hover:border-[#7A341F]/40 hover:shadow-md transition-all duration-300">
      <div>
        <h3 className="font-bold text-[#1f2937]">
          {appointment.patient?.fullName || "Unknown Patient"}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {appointment.consultationType}
        </p>
      </div>

      <div className="text-right">
        <p className="font-bold text-[#1f2937]">
          {appointment.appointmentTime}
        </p>
        <p className="text-sm text-gray-600">
          {new Date(appointment.appointmentDate).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, text, status }) {
  const statusColors = {
    success: "text-green-600 bg-green-50",
    info: "text-blue-600 bg-blue-50",
    warning: "text-amber-600 bg-amber-50",
  };

  return (
    <div className="flex items-start gap-3">
      <div className={`${statusColors[status]} p-2 rounded-lg flex-shrink-0`}>
        <Icon size={16} />
      </div>
      <p className="text-gray-700 text-sm pt-0.5">{text}</p>
    </div>
  );
}

function StatRow({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-bold text-[#1f2937]">{value}</span>
    </div>
  );
}

function QuickActionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-gradient-to-r from-[#7A341F]/5 to-[#5C2415]/5 hover:from-[#7A341F]/10 hover:to-[#5C2415]/10 border border-[#7A341F]/20 hover:border-[#7A341F]/40 transition-all duration-200 text-[#1f2937] font-semibold group"
    >
      <span>{label}</span>
      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
    </button>
  );
}

export default DoctorDashboard;