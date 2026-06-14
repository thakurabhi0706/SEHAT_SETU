// import { useEffect, useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   LineChart,
//   Line,
//   Legend,
//   RadialBarChart,
//   RadialBar,
// } from "recharts";
// import {
//   LayoutDashboard,
//   UserCheck,
//   Home,
//   Building2,
//   Megaphone,
//   CalendarDays,
//   Settings,
//   LogOut,
//   ShieldCheck,
// } from "lucide-react";

// import { useDispatch } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";

// import { logout } from "../../features/auth/authSlice";

// import { getDashboardStats } from "../../api/adminApi";

// function Dashboard() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const [stats, setStats] =
//       useState(null);

//     useEffect(() => {
//       const fetchStats = async () => {
//         try {
//           const data =
//             await getDashboardStats();

//           setStats(data);
//         } catch (error) {
//           console.log(error);
//         }
//       };

//       fetchStats();
//     }, []);

//     if (!stats) {
//       return (
//         <div className="min-h-screen flex items-center justify-center">
//           Loading...
//         </div>
//       );
//     }

//   const appointmentData =
//   Object.entries(
//     stats.appointmentStats
//   ).map(([name, value]) => ({
//     name,
//     value,
//   }));

// const consultationData =
//   Object.entries(
//     stats.consultationStats
//   ).map(([name, value]) => ({
//     name,
//     value,
//   }));

// const specializationData =
//   Object.entries(
//     stats.specializationStats
//   ).map(([name, value]) => ({
//     name,
//     value,
//   }));

// const COLORS = [
//   "#8B4513",
//   "#C66B3D",
//   "#D7BFAE",
//   "#EADFD5",
// ];

//   return (
//     <div className="min-h-screen bg-[#f7f4ef] flex">

//       {/* SIDEBAR */}

//       <aside className="w-72 bg-[#8c3b24] text-white p-8 flex flex-col">

//         <div>
//           <h1 className="text-4xl font-bold leading-tight">
//             Sehat
//             <br />
//             Setu
//           </h1>

//           <p className="text-orange-100 mt-2 text-sm">
//             Admin Portal
//           </p>
//         </div>

//         <nav className="mt-12 flex-1 space-y-3">
//           <SidebarItem
//                       icon={Home}
//                       label="Home"
//                       active={
//                         location.pathname === "/"
//                       }
//                       onClick={() =>
//                         navigate("/")
//                       }
//           />
//           <SidebarItem
//             icon={LayoutDashboard}
//             label="Dashboard"
//             active={location.pathname === "/admin/dashboard"}
//             onClick={() => navigate("/admin/dashboard")}
//           />

//           <SidebarItem
//             icon={UserCheck}
//             label="Pending Doctors"
//             active={
//               location.pathname === "/admin/pending-doctors"
//             }
//             onClick={() =>
//               navigate("/admin/pending-doctors")
//             }
//           />

//           <SidebarItem
//             icon={Building2}
//             label="Pharmacies"
//             active={location.pathname === "/pharmacy-locator"}
//             onClick={() => navigate("/pharmacy-locator")}
//           />

//           <SidebarItem
//             icon={Megaphone}
//             label="Advertisements"
//             active={location.pathname === "/admin/advertisements"}
//             onClick={() => navigate("/admin/advertisements")}
//           />

//           <SidebarItem
//             icon={CalendarDays}
//             label="Appointments"
//             active={location.pathname === "/admin/appointments"}
//             onClick={() => navigate("/admin/appointments")}
//           />

//           <SidebarItem
//             icon={Settings}
//             label="Settings"
//             active={location.pathname === "/admin/settings"}
//             onClick={() => navigate("/admin/settings")}
          
//           />

//         </nav>

//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 text-orange-100 hover:text-white transition"
//         >
//           <LogOut size={20} />
//           Logout
//         </button>

//       </aside>

//       {/* MAIN */}

//       <main className="flex-1 p-10 overflow-y-auto">

//         {/* HERO */}

//         <div
//           className="relative rounded-3xl p-8 text-white shadow-xl overflow-hidden"
//           style={{
//             backgroundImage:
//               "url('/images/rural-healthcare1.jpg')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-[#5c2415]/85 to-[#8c3b24]/60"></div>

//           <div className="relative z-10 flex items-center justify-between">

//             <div>
//               <p className="text-orange-100">
//                 Welcome Back
//               </p>

//               <h1 className="text-4xl font-bold mt-2">
//                 Administrator
//               </h1>

//               <p className="mt-4 text-orange-50 max-w-2xl">
//                 Manage doctors, pharmacies and healthcare
//                 operations across Sehat Setu.
//               </p>
//             </div>

//             <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl">
//               System Administrator
//             </div>

//           </div>
//         </div>

//         {/* STATS */}

//         {/* STATS */}

//           <div className="grid md:grid-cols-4 gap-6 mt-8">

//             <StatCard
//               title="Patients"
//               value={stats.totalPatients}
//             />

//             <StatCard
//               title="Doctors"
//               value={stats.totalDoctors}
//             />

//             <StatCard
//               title="Pending Doctors"
//               value={stats.pendingDoctors}
//             />

//             <StatCard
//               title="Revenue"
//               value={`₹${stats.totalRevenue}`}
//             />

//           </div>

//           {/* ANALYTICS */}

//           <div className="grid lg:grid-cols-3 gap-6 mt-10">

//             {/* Appointment Status */}

//             <div className="bg-white p-5 rounded-3xl shadow-md">

//               <h2 className="text-xl font-bold mb-4">
//                 Appointment Status
//               </h2>

//               <ResponsiveContainer
//                 width="100%"
//                 height={280}
//               >
//                 <PieChart>

//                   <Pie
//                     data={appointmentData}
//                     dataKey="value"
//                     nameKey="name"
//                     outerRadius={90}
//                   >
//                     <Tooltip />
//                     <Legend />
//                     {appointmentData.map(
//                       (_, index) => (
//                         <Cell
//                           key={index}
//                           fill={
//                             COLORS[
//                               index %
//                               COLORS.length
//                             ]
//                           }
//                         />
//                       )
//                     )}
//                   </Pie>

//                   <Tooltip />

//                 </PieChart>
//               </ResponsiveContainer>

//             </div>

//             {/* Doctor Specializations */}

//             <div className="bg-white p-5 rounded-3xl shadow-md">

//               <h2 className="text-xl font-bold mb-4">
//                 Doctor Specializations
//               </h2>

//               <ResponsiveContainer
//                 width="100%"
//                 height={280}
//               >
//                 <BarChart
//   layout="vertical"
//   data={specializationData}
// >
//   <CartesianGrid strokeDasharray="3 3" />

//   <XAxis type="number" />

//   <YAxis
//     type="category"
//     dataKey="name"
//     width={100}
//   />

//   <Tooltip />

//   <Bar
//     dataKey="value"
//     fill="#8c4a2f"
//     radius={[0, 10, 10, 0]}
//   />
// </BarChart>
//               </ResponsiveContainer>

//             </div>

//             {/* Monthly Revenue */}

//             <div className="bg-white p-5 rounded-3xl shadow-md">

//               <h2 className="text-xl font-bold mb-4">
//                 Monthly Revenue Trend
//               </h2>

//               <ResponsiveContainer
//                 width="100%"
//                 height={280}
//               >
//                 <LineChart
//                   data={revenueData}
//                 >

//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                   />

//                   <XAxis dataKey="month" />

//                   <YAxis />

//                   <Tooltip />

//                   <Line
//                     type="monotone"
//                     dataKey="revenue"
//                     stroke="#8c4a2f"
//                     strokeWidth={3}
//                   />

//                 </LineChart>
//               </ResponsiveContainer>

//             </div>

//           </div>

//           {/* BOTTOM SECTION */}

//           <div className="grid lg:grid-cols-2 gap-6 mt-10">

//             {/* Admin Activity */}

//             <div className="bg-white rounded-3xl p-8 shadow-md">

//               <h2 className="text-2xl font-bold">
//                 Admin Activity
//               </h2>

//               <div className="mt-6 text-gray-500">

//                 Activity logs will appear here
//                 once backend tracking is added.

//               </div>

//             </div>

//             {/* Quick Summary */}

//             <div className="bg-white rounded-3xl p-8 shadow-md">

//               <h2 className="text-2xl font-bold">
//                 Platform Summary
//               </h2>

//               <div className="space-y-5 mt-6">

//                 <div className="flex justify-between">

//                   <span>Total Patients</span>

//                   <span className="font-semibold">
//                     {stats.totalPatients}
//                   </span>

//                 </div>

//                 <div className="flex justify-between">

//                   <span>Total Doctors</span>

//                   <span className="font-semibold">
//                     {stats.totalDoctors}
//                   </span>

//                 </div>

//                 <div className="flex justify-between">

//                   <span>Pending Doctors</span>

//                   <span className="font-semibold">
//                     {stats.pendingDoctors}
//                   </span>

//                 </div>

//                 <div className="flex justify-between">

//                   <span>Total Revenue</span>

//                   <span className="font-semibold">
//                     ₹{stats.totalRevenue}
//                   </span>

//                 </div>

//               </div>

//             </div>

//           </div>

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

// function VerificationCard({
//   title,
//   subtitle,
//   status,
// }) {
//   return (
//     <div className="flex items-center justify-between bg-[#fcfaf8] border border-[#efe5db] rounded-2xl p-5">

//       <div>
//         <h3 className="font-semibold text-lg">
//           {title}
//         </h3>

//         <p className="text-gray-500 mt-1">
//           {subtitle}
//         </p>
//       </div>

//       <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl text-sm font-semibold">
//         {status}
//       </div>

//     </div>
//   );
// }

// function ActivityItem({ text }) {
//   return (
//     <div className="border-l-4 border-[#c26a3d] pl-4">
//       <p className="text-gray-700">{text}</p>
//     </div>
//   );
// }

// function StatCard({
//   title,
//   value,
// }) {
//   return (
//     <div className="bg-white rounded-3xl p-8 shadow-md border border-[#efe5db]">
//       <p className="text-gray-500 text-lg">
//         {title}
//       </p>

//       <h2 className="text-4xl font-bold text-[#111827] mt-4">
//         {value}
//       </h2>
//     </div>
//   );
// }

// const revenueData = [
//   { month: "Jan", revenue: 5000 },
//   { month: "Feb", revenue: 12000 },
//   { month: "Mar", revenue: 18000 },
//   { month: "Apr", revenue: 15000 },
//   { month: "May", revenue: 25000 },
// ];

// export default Dashboard;


import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  LayoutDashboard,
  UserCheck,
  Home,
  Building2,
  Megaphone,
  CalendarDays,
  Settings,
  LogOut,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  ChevronRight,
} from "lucide-react";

import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { logout } from "../../features/auth/authSlice";

import { getDashboardStats } from "../../api/adminApi";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7A341F] mx-auto mb-4"></div>
          <p className="text-[#7A341F] font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6]">
        <p className="text-[#7A341F] text-lg">Unable to load dashboard</p>
      </div>
    );
  }

  const appointmentData = Object.entries(
    stats.appointmentStats
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const specializationData = Object.entries(
    stats.specializationStats
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    "#7A341F",
    "#9D4F2F",
    "#C66B3D",
    "#D7BFAE",
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
            ADMIN PORTAL
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
            active={location.pathname === "/admin/dashboard"}
            onClick={() => navigate("/admin/dashboard")}
          />

          <SidebarItem
            icon={UserCheck}
            label="Pending Doctors"
            active={location.pathname === "/admin/pending-doctors"}
            onClick={() => navigate("/admin/pending-doctors")}
          />

          <SidebarItem
            icon={Building2}
            label="Pharmacies"
            active={location.pathname === "/pharmacy-locator"}
            onClick={() => navigate("/pharmacy-locator")}
          />

          <SidebarItem
            icon={Megaphone}
            label="Advertisements"
            active={location.pathname === "/admin/advertisements"}
            onClick={() => navigate("/admin/advertisements")}
          />

          <SidebarItem
            icon={CalendarDays}
            label="Appointments"
            active={location.pathname === "/admin/appointments"}
            onClick={() => navigate("/admin/appointments")}
          />

          <SidebarItem
            icon={Settings}
            label="Settings"
            active={location.pathname === "/admin/settings"}
            onClick={() => navigate("/admin/settings")}
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
        <div className="relative rounded-3xl p-10 text-white shadow-xl overflow-hidden mb-10 hover:shadow-2xl transition-shadow duration-300">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/rural-healthcare1.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5C2415]/88 via-[#7A341F]/80 to-[#5C2415]/70" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-orange-200 font-semibold tracking-wide uppercase text-sm">
                Welcome Back
              </p>
              <h1 className="text-5xl font-black mt-3">Administrator</h1>
              <p className="mt-4 text-orange-100 max-w-2xl leading-relaxed">
                Manage doctors, pharmacies, and healthcare operations across
                the Sehat Setu platform.
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
              <p className="text-orange-100 text-sm">System Role</p>
              <p className="font-bold text-lg">Administrator</p>
            </div>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={Users}
            title="Patients"
            value={stats.totalPatients}
            color="bg-blue-50"
            iconColor="text-blue-600"
          />

          <StatCard
            icon={UserCheck}
            title="Doctors"
            value={stats.totalDoctors}
            color="bg-green-50"
            iconColor="text-green-600"
          />

          <StatCard
            icon={Clock}
            title="Pending Doctors"
            value={stats.pendingDoctors}
            color="bg-amber-50"
            iconColor="text-amber-600"
          />

          <StatCard
            icon={DollarSign}
            title="Revenue"
            value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`}
            color="bg-purple-50"
            iconColor="text-purple-600"
          />
        </div>

        {/* CHARTS SECTION */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Appointment Status */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#1f2937]">
                Appointment Status
              </h2>
              <TrendingUp size={20} className="text-[#7A341F]" />
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={appointmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {appointmentData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Doctor Specializations */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#1f2937]">
                Doctor Specializations
              </h2>
              <UserCheck size={20} className="text-[#7A341F]" />
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart layout="vertical" data={specializationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" width={100} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#7A341F"
                  radius={[0, 12, 12, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#1f2937]">
                Monthly Revenue Trend
              </h2>
              <TrendingUp size={20} className="text-[#7A341F]" />
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#7A341F"
                  strokeWidth={3}
                  dot={{ fill: "#7A341F", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-6">Quick Actions</h2>

            <div className="space-y-3">
              <QuickActionButton
                label="View Pending Doctors"
                onClick={() => navigate("/admin/pending-doctors")}
              />
              <QuickActionButton
                label="Manage Appointments"
                onClick={() => navigate("/admin/appointments")}
              />
              <QuickActionButton
                label="View Advertisements"
                onClick={() => navigate("/admin/advertisements")}
              />
              <QuickActionButton
                label="Platform Settings"
                onClick={() => navigate("/admin/settings")}
              />
            </div>
          </div>

          {/* Platform Summary */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-[#1f2937] mb-6">
              Platform Summary
            </h2>

            <div className="space-y-4">
              <SummaryRow
                label="Total Patients"
                value={stats.totalPatients}
              />
              <SummaryRow label="Total Doctors" value={stats.totalDoctors} />
              <SummaryRow
                label="Pending Doctors"
                value={stats.pendingDoctors}
              />
              <SummaryRow
                label="Total Revenue"
                value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`}
              />
              <SummaryRow
                label="Total Appointments"
                value={stats.totalAppointments || 0}
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

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-bold text-[#1f2937]">{value}</span>
    </div>
  );
}

const revenueData = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 12000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 15000 },
  { month: "May", revenue: 25000 },
];

export default Dashboard;