import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ROUTE GUARDS */
import RoleProtectedRoute from "../components/common/RoleProtectedRoute";

/* PUBLIC */
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import PharmacyLocator from "../pages/public/PharmacyLocator";
import NotFound from "../pages/public/NotFound";

/* PATIENT */
import PatientDashboard from "../pages/patient/Dashboard";
import FindDoctors from "../pages/patient/FindDoctors";
import MyAppointments from "../pages/patient/MyAppointments";

/* DOCTOR */
import DoctorDashboard from "../pages/doctor/Dashboard";
import AppointmentRequests from "../pages/doctor/AppointmentRequests";
import DoctorCompleteProfile from "../pages/doctor/DoctorCompleteProfile";

/* ADMIN */
import AdminDashboard from "../pages/admin/Dashboard";
import AdsManagement from "../pages/admin/AdsManagement";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pharmacy-locator" element={<PharmacyLocator />} />

        {/* PATIENT */}
        <Route
          path="/patient/dashboard"
          element={
            <RoleProtectedRoute allowedRole="patient">
              <PatientDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/patient/doctors"
          element={
            <RoleProtectedRoute allowedRole="patient">
              <FindDoctors />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/patient/appointments"
          element={
            <RoleProtectedRoute allowedRole="patient">
              <MyAppointments />
            </RoleProtectedRoute>
          }
        />

        {/* DOCTOR */}
        <Route
          path="/doctor/dashboard"
          element={
            <RoleProtectedRoute allowedRole="doctor">
              <DoctorDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/doctor/complete-profile"
          element={<DoctorCompleteProfile />}
        />

        <Route
          path="/doctor/appointments"
          element={
            <RoleProtectedRoute allowedRole="doctor">
              <AppointmentRequests />
            </RoleProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <RoleProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/ads"
          element={
            <RoleProtectedRoute allowedRole="admin">
              <AdsManagement />
            </RoleProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;