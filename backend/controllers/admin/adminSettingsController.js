const Patient = require("../../models/Patient");
const Doctor = require("../../models/Doctor");
const Appointment = require("../../models/Appointment");

const getAdminSettings = async (req, res) => {
  try {

    const totalPatients =
      await Patient.countDocuments();

    const totalDoctors =
      await Doctor.countDocuments();

    const totalAppointments =
      await Appointment.countDocuments();

    const revenueData =
      await Appointment.aggregate([
        {
          $match: {
            paymentStatus: "Paid",
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$paymentAmount",
            },
          },
        },
      ]);

    const totalRevenue =
      revenueData[0]?.totalRevenue || 0;

    res.status(200).json({
      platformName: "Sehat Setu",
      supportEmail:
        "support@sehatsetu.com",
      supportPhone:
        "+91 9876543210",

      totalPatients,
      totalDoctors,
      totalAppointments,
      totalRevenue,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getAdminSettings,
};