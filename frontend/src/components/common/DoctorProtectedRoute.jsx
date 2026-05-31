import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function DoctorProtectedRoute({ children }) {
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // NOT LOGGED IN
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // NOT DOCTOR
  if (user?.role !== "doctor") {
    return <Navigate to="/" replace />;
  }

  // PROFILE NOT COMPLETED
  if (!user?.profileCompleted) {
    return (
      <Navigate
        to="/doctor/complete-profile"
        replace
      />
    );
  }

  // PENDING APPROVAL
  if (user?.verificationStatus !== "Approved") {
    return (
      <Navigate
        to="/doctor/pending"
        replace
      />
    );
  }

  // APPROVED
  return children;
}

export default DoctorProtectedRoute;