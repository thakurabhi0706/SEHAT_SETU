import {
  useEffect,
  useState,
} from "react";

import {
  Settings,
  Mail,
  Phone,
  Users,
  UserCheck,
  Calendar,
  IndianRupee,
} from "lucide-react";

import {
  getAdminSettings,
} from "../../services/adminSettingsService";
import BackButton from "../../components/common/BackButton";

function AdminSettings() {

  const [settings, setSettings] =
    useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings =
    async () => {

      try {

        const data =
          await getAdminSettings();

        setSettings(data);

      } catch (error) {

        console.log(error);

      }
    };

  if (!settings)
    return (
      <div className="p-10">
        Loading...
      </div>
    );

  return (
    <div className="p-8">

      <h1 className="text-5xl font-bold text-[#8c3b24] mb-10">
        Settings
      </h1>

      <BackButton />

      <div className="grid grid-cols-2 gap-8">

        {/* Platform */}

        <div className="bg-white rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-6">

            <Settings />

            <h2 className="text-2xl font-bold">
              Platform Information
            </h2>

          </div>

          <p>
            <strong>Name:</strong>{" "}
            {settings.platformName}
          </p>

          <p className="mt-4">
            <Mail
              className="inline mr-2"
              size={18}
            />
            {settings.supportEmail}
          </p>

          <p className="mt-3">
            <Phone
              className="inline mr-2"
              size={18}
            />
            {settings.supportPhone}
          </p>

        </div>

        {/* Stats */}

        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            System Statistics
          </h2>

          <div className="space-y-4">

            <p>
              <Users
                className="inline mr-2"
                size={18}
              />
              Patients:
              {" "}
              {settings.totalPatients}
            </p>

            <p>
              <UserCheck
                className="inline mr-2"
                size={18}
              />
              Doctors:
              {" "}
              {settings.totalDoctors}
            </p>

            <p>
              <Calendar
                className="inline mr-2"
                size={18}
              />
              Appointments:
              {" "}
              {settings.totalAppointments}
            </p>

            <p>
              <IndianRupee
                className="inline mr-2"
                size={18}
              />
              Revenue:
              ₹
              {settings.totalRevenue}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminSettings;