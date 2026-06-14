import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Mail,
  Phone,
  Users,
  UserCheck,
  Calendar,
  IndianRupee,
  ArrowLeft,
} from "lucide-react";
import { getAdminSettings } from "../../services/adminSettingsService";
import ruralHealthcare7 from "../../assets/images/rural-healthcare4.jpg";

function AdminSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getAdminSettings();
      setSettings(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6] flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#7A341F]">Loading...</h1>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6] flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#7A341F]">No settings found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6]">
      {/* HERO SECTION */}
      <div className="relative h-56 rounded-b-[32px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${ruralHealthcare7})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5C2415]/90 via-[#7A341F]/75 to-[#5C2415]/60" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 rounded-xl px-5 py-3 flex items-center gap-2 font-semibold"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl font-black">Settings</h1>
          <p className="mt-3 text-lg text-orange-100">
            Platform configuration and system statistics
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* PLATFORM INFORMATION */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7A341F] to-[#5C2415] flex items-center justify-center">
              <Settings size={24} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-[#1f2937]">Platform Information</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Platform Name */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
              <p className="text-orange-600 text-sm font-semibold uppercase tracking-wide mb-2">
                Platform Name
              </p>
              <p className="text-2xl font-bold text-[#1f2937]">{settings.platformName}</p>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Mail size={18} className="text-blue-600" />
                <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide">
                  Support Email
                </p>
              </div>
              <p className="text-lg font-semibold text-[#1f2937] break-all">{settings.supportEmail}</p>
            </div>

            {/* Phone */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={18} className="text-green-600" />
                <p className="text-green-600 text-sm font-semibold uppercase tracking-wide">
                  Support Phone
                </p>
              </div>
              <p className="text-lg font-semibold text-[#1f2937]">{settings.supportPhone}</p>
            </div>
          </div>
        </div>

        {/* SYSTEM STATISTICS */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-[#1f2937] mb-8">System Statistics</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Patients */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-purple-600 text-sm font-semibold uppercase">Total Patients</p>
                <Users size={24} className="text-purple-600" />
              </div>
              <p className="text-4xl font-black text-purple-700">{settings.totalPatients}</p>
              <p className="text-xs text-purple-600 mt-2">Active users</p>
            </div>

            {/* Total Doctors */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-blue-600 text-sm font-semibold uppercase">Total Doctors</p>
                <UserCheck size={24} className="text-blue-600" />
              </div>
              <p className="text-4xl font-black text-blue-700">{settings.totalDoctors}</p>
              <p className="text-xs text-blue-600 mt-2">Verified practitioners</p>
            </div>

            {/* Total Appointments */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-green-600 text-sm font-semibold uppercase">Appointments</p>
                <Calendar size={24} className="text-green-600" />
              </div>
              <p className="text-4xl font-black text-green-700">{settings.totalAppointments}</p>
              <p className="text-xs text-green-600 mt-2">Total scheduled</p>
            </div>

            {/* Total Revenue */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-amber-600 text-sm font-semibold uppercase">Revenue</p>
                <IndianRupee size={24} className="text-amber-600" />
              </div>
              <p className="text-4xl font-black text-amber-700">
                ₹{settings.totalRevenue.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-amber-600 mt-2">Total earned</p>
            </div>
          </div>

          {/* SUMMARY STATS */}
          <div className="mt-10 pt-10 border-t border-gray-200">
            <h3 className="text-lg font-bold text-[#1f2937] mb-6">Platform Overview</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-600 text-sm mb-2">Average Appointments per Doctor</p>
                <p className="text-2xl font-bold text-[#7A341F]">
                  {settings.totalDoctors > 0
                    ? Math.round(settings.totalAppointments / settings.totalDoctors)
                    : 0}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-600 text-sm mb-2">Revenue per Appointment</p>
                <p className="text-2xl font-bold text-[#7A341F]">
                  ₹
                  {settings.totalAppointments > 0
                    ? Math.round(settings.totalRevenue / settings.totalAppointments)
                    : 0}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-600 text-sm mb-2">Doctor to Patient Ratio</p>
                <p className="text-2xl font-bold text-[#7A341F]">
                  1:{settings.totalPatients > 0 && settings.totalDoctors > 0
                    ? Math.round(settings.totalPatients / settings.totalDoctors)
                    : 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;