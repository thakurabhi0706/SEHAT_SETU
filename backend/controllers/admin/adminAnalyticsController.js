const Doctor = require("../../models/Doctor");
const Patient = require("../../models/Patient");
const Appointment = require("../../models/Appointment");


const getDashboardStats = async (req, res) => {
  try {
    const totalPatients =
      await Patient.countDocuments();

    const totalDoctors =
      await Doctor.countDocuments({
        verificationStatus: "Approved",
      });

    const pendingDoctors =
      await Doctor.countDocuments({
        verificationStatus: "Pending",
      });

    const appointments =
      await Appointment.find();

    const totalRevenue =
      appointments
        .filter(
          (a) => a.paymentStatus === "Paid"
        )
        .reduce(
          (sum, a) =>
            sum + (a.paymentAmount || 0),
          0
        );

    const appointmentStats = {
      Pending: 0,
      Confirmed: 0,
      Completed: 0,
      Cancelled: 0,
    };

    appointments.forEach((a) => {
      appointmentStats[a.status]++;
    });

    const consultationStats = {
      Video: 0,
      Audio: 0,
      Chat: 0,
      "In-Person": 0,
    };

    appointments.forEach((a) => {
      consultationStats[
        a.consultationType
      ]++;
    });

    const approvedDoctors =
      await Doctor.find({
        verificationStatus: "Approved",
      });

    const specializationMap = {};

    approvedDoctors.forEach((doctor) => {
      const specialization =
        doctor.specialization ||
        "Unknown";

      specializationMap[
        specialization
      ] =
        (specializationMap[
          specialization
        ] || 0) + 1;
    });

    res.status(200).json({
      totalPatients,
      totalDoctors,
      pendingDoctors,
      totalRevenue,
      appointmentStats,
      consultationStats,
      specializationStats:
        specializationMap,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};