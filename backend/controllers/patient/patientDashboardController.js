const Appointment = require("../../models/Appointment");
const Prescription = require("../../models/Prescription");
const MedicalReport = require("../../models/MedicalReport");

const getPatientDashboard = async (req, res) => {
  try {

    const appointments =
      await Appointment.countDocuments({
        patient: req.user._id,
      });

    const prescriptions =
      await Prescription.countDocuments({
        patient: req.user._id,
      });

    const reports =
      await MedicalReport.countDocuments({
        patient: req.user._id,
      });

    const consultedDoctors =
      await Appointment.distinct(
        "doctor",
        {
          patient: req.user._id,
          status: "Completed",
        }
      );

    res.status(200).json({
      appointments,
      reports,
      prescriptions,
      doctorsConsulted:
        consultedDoctors.length,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPatientDashboard,
};