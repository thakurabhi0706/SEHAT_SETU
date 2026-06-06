const Appointment = require("../../models/Appointment");

const getDoctorDashboard =
  async (req, res) => {
    try {

      const appointments =
        await Appointment.find({
          doctor: req.user._id,
        }).populate(
          "patient",
          "fullName age gender"
        );

      const totalPatients =
        new Set(
          appointments.map(
            (a) =>
              a.patient?._id?.toString()
          )
        ).size;

      const totalAppointments =
        appointments.length;

      const totalEarnings =
        appointments
          .filter(
            (a) =>
              a.paymentStatus ===
              "Paid"
          )
          .reduce(
            (sum, a) =>
              sum +
              (a.paymentAmount || 0),
            0
          );

      const upcomingAppointments =
        appointments
          .filter(
            (a) =>
              a.status === "Confirmed"
          )
          .slice(0, 5);

      res.json({
        totalPatients,
        totalAppointments,
        totalEarnings,
        upcomingAppointments,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };



const getDoctorPatients = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user._id,
    })
      .populate(
        "patient",
        "fullName email phone age gender"
      )
      .sort({ createdAt: -1 });

    const patientsMap = {};

    appointments.forEach((appointment) => {
      const patient = appointment.patient;

      if (!patient) return;

      const id = patient._id.toString();

      if (!patientsMap[id]) {
        patientsMap[id] = {
          ...patient.toObject(),
          totalVisits: 0,
          lastVisit: appointment.appointmentDate,
        };
      }

      patientsMap[id].totalVisits += 1;

      if (
        new Date(appointment.appointmentDate) >
        new Date(patientsMap[id].lastVisit)
      ) {
        patientsMap[id].lastVisit =
          appointment.appointmentDate;
      }
    });

    res.json(Object.values(patientsMap));

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDoctorEarnings =
  async (req, res) => {

    try {

      const appointments =
        await Appointment.find({
          doctor: req.user._id,
          paymentStatus: "Paid",
        })
          .populate(
            "patient",
            "fullName"
          )
          .sort({
            createdAt: -1,
          });

      const totalEarnings =
        appointments.reduce(
          (sum, item) =>
            sum +
            item.paymentAmount,
          0
        );

      res.json({
        totalEarnings,
        transactions:
          appointments,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
};

module.exports = {
  getDoctorDashboard,
  getDoctorPatients,
  getDoctorEarnings,
};