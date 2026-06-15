import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ROUTE GUARDS */
import RoleProtectedRoute from "../components/common/RoleProtectedRoute";

/* PUBLIC */
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import PharmacyLocator from "../pages/public/PharmacyLocator";
import NotFound from "../pages/public/NotFound";
import PrescriptionViewer from "../pages/patient/PrescriptionViewer";


/* PATIENT */
import PatientDashboard from "../pages/patient/Dashboard";
import FindDoctors from "../pages/patient/FindDoctors";
import MyAppointments from "../pages/patient/MyAppointments";
import DoctorDetails from "../pages/patient/DoctorDetails";
import BookAppointment from "../pages/patient/BookAppointment";
import PatientProfile from "../pages/patient/PatientProfile";


/* DOCTOR */
import AppointmentRequests from "../pages/doctor/AppointmentRequests";
import DoctorCompleteProfile from "../pages/doctor/DoctorCompleteProfile";
import DoctorPendingPage from "../pages/doctor/DoctorPendingPage";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorProtectedRoute from "../components/common/DoctorProtectedRoute";
import DoctorPatients from "../pages/doctor/DoctorPatients";
import DoctorAvailability from "../pages/doctor/DoctorAvailability";
import DoctorEarnings from "../pages/doctor/DoctorEarnings";
import DoctorProfile from "../pages/doctor/DoctorProfile";
import CreatePrescription from "../pages/doctor/CreatePrescription";
import DoctorReports from "../pages/doctor/DoctorReports";




/* ADMIN */
import AdminDashboard from "../pages/admin/Dashboard";
import AdminAppointments from "../pages/admin/AdminAppointments";
import PendingDoctors from "../pages/admin/PendingDoctors";
import AdminProtectedRoute from "../components/common/AdminProtectedRoute";
import Advertisements from "../pages/admin/Advertisements";
import AdminSettings from "../pages/admin/AdminSettings";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/pharmacy-locator"
          element={<PharmacyLocator />}
        />

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
          path="/patient/profile"
          element={
            <RoleProtectedRoute allowedRole="patient">
              <PatientProfile />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/patient/prescriptions"
          element={
            <RoleProtectedRoute allowedRole="patient">
              <PrescriptionViewer />
            </RoleProtectedRoute>
          }
        />


        <Route
          path="/patient/doctor/:id"
          element={
            <RoleProtectedRoute allowedRole="patient">
              <DoctorDetails />
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

        <Route
            path="/patient/book-appointment/:id"
            element={
              <RoleProtectedRoute allowedRole="patient">
                <BookAppointment />
              </RoleProtectedRoute>
            }
          />
        

        {/* DOCTOR */}
        <Route
          path="/doctor/reports/:patientId"
          element={<DoctorReports />}
        />

        <Route
          path="/doctor/prescription/:appointmentId"
          element={
            <DoctorProtectedRoute>
              <CreatePrescription />
            </DoctorProtectedRoute>
          }
        />


        <Route
          path="/doctor/patients"
          element={
            <DoctorProtectedRoute>
              <DoctorPatients />
            </DoctorProtectedRoute>
          }
        />

        <Route
          path="/doctor/availability"
          element={
            <DoctorProtectedRoute>
              <DoctorAvailability />
            </DoctorProtectedRoute>
          }
        />

        <Route
          path="/doctor/earnings"
          element={
            <DoctorProtectedRoute>
              <DoctorEarnings />
            </DoctorProtectedRoute>
          }
        />

        <Route
          path="/doctor/profile"
          element={
            <DoctorProtectedRoute>
              <DoctorProfile />
            </DoctorProtectedRoute>
          }
        />

        <Route
          path="/doctor/pending"
          element={<DoctorPendingPage />}
        />

        <Route
          path="/admin/settings"
          element={
            <AdminProtectedRoute>
              <AdminSettings />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/doctor/dashboard"
          element={
            <DoctorProtectedRoute>
              <DoctorDashboard />
            </DoctorProtectedRoute>
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
        path="/admin/appointments"
        element={
          <AdminProtectedRoute>
            <AdminAppointments />
          </AdminProtectedRoute>
        }
      />

        <Route
          path="/admin/advertisements"
          element={<Advertisements />}
        />

        <Route
          path="/admin/pending-doctors"
          element={
            <AdminProtectedRoute>
              <PendingDoctors />
            </AdminProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;