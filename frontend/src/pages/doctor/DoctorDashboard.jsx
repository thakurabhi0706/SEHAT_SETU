import {
  LayoutDashboard,
  CalendarDays,
  Users,
  IndianRupee,
  Star,
  Clock3,
  UserCircle,
  LogOut,
} from "lucide-react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { logout } from "../../features/auth/authSlice";



function DoctorDashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
      dispatch(logout());
      navigate("/login");
    };
  const stats = [
    {
      title: "Patients",
      value: "124",
      icon: Users,
    },
    {
      title: "Appointments",
      value: "38",
      icon: CalendarDays,
    },
    {
      title: "Earnings",
      value: "₹24,500",
      icon: IndianRupee,
    },
    {
      title: "Rating",
      value: "4.8",
      icon: Star,
    },
    
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ef] flex">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#8c3b24] text-white p-8 flex flex-col">
        
        {/* LOGO */}
        <div>
          <h1 className="text-3xl font-bold">
            Sehat Setu
          </h1>

          <p className="text-orange-100 mt-2 text-sm">
            Doctor Portal
          </p>
        </div>

        {/* MENU */}
        <nav className="mt-12 flex-1 space-y-3">
          
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            active={
              location.pathname === "/doctor/dashboard"
            }
            onClick={() =>
              navigate("/doctor/dashboard")
            }
          />

          <SidebarItem
            icon={CalendarDays}
            label="Appointments"
            active={
              location.pathname === "/doctor/appointments"
            }
            onClick={() =>
              navigate("/doctor/appointments")
            }
          />

          <SidebarItem
            icon={Users}
            label="Patients"
            active={
              location.pathname === "/doctor/patients"
            }
            onClick={() =>
              navigate("/doctor/patients")
            }
          />

          <SidebarItem
            icon={Clock3}
            label="Availability"
            active={
              location.pathname === "/doctor/availability"
            }
            onClick={() =>
              navigate("/doctor/availability")
            }
          />

          <SidebarItem
            icon={IndianRupee}
            label="Earnings"
            active={
              location.pathname === "/doctor/earnings"
            }
            onClick={() =>
              navigate("/doctor/earnings")
            }
          />

          <SidebarItem
            icon={UserCircle}
            label="Profile"
            active={
              location.pathname === "/doctor/profile"
            }
            onClick={() =>
              navigate("/doctor/profile")
            }
          />`
        </nav>

        {/* LOGOUT */}
       <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-orange-100 hover:text-white transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        
        {/* HEADER */}
        <div
            className="relative rounded-3xl p-8 text-white shadow-xl overflow-hidden"
            style={{
              backgroundImage:
                "url('/images/rural-healthcare1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#5c2415]/85 to-[#8c3b24]/60"></div>
          <div className="relative z-10 flex items-center justify-between">
            
            <div>
              <p className="text-orange-100">
                Welcome Back
              </p>

              <h1 className="text-4xl font-bold mt-2">
                Dr. {user?.fullName}
              </h1>

              <p className="mt-4 text-orange-50 max-w-2xl">
                Continue serving rural communities through
                trusted digital healthcare.
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl">
              Approved Doctor
            </div>

            
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-6 shadow-md border border-[#efe5db]"
              >
                <div className="flex items-center justify-between">
                  
                  <div>
                    <p className="text-gray-500">
                      {item.title}
                    </p>

                    <h2 className="text-3xl font-bold mt-3 text-gray-900">
                      {item.value}
                    </h2>
                  </div>

                  <div className="bg-[#f5e6dc] p-4 rounded-2xl">
                    <Icon className="text-[#8c3b24]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CONTENT SECTION */}
        <div className="grid lg:grid-cols-3 gap-8 mt-10">
          
          {/* UPCOMING APPOINTMENTS */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-md border border-[#efe5db]">
            
            <h2 className="text-2xl font-bold text-gray-900">
              Upcoming Appointments
            </h2>

            <div className="mt-6 space-y-4">
              
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between bg-[#fcfaf8] border border-[#efe5db] rounded-2xl p-5"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      Patient Name
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Video Consultation
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      10:30 AM
                    </p>

                    <p className="text-gray-500">
                      Today
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIVITY */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-[#efe5db]">
            
            <h2 className="text-2xl font-bold text-gray-900">
              Recent Activity
            </h2>

            <div className="mt-6 space-y-5">
              
              <ActivityItem text="New appointment booked" />
              <ActivityItem text="Profile approved by admin" />
              <ActivityItem text="Patient uploaded reports" />
              <ActivityItem text="Consultation completed" />
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

function ActivityItem({ text }) {
  return (
    <div className="border-l-4 border-[#c26a3d] pl-4">
      <p className="text-gray-700">{text}</p>
    </div>
  );
}

export default DoctorDashboard;