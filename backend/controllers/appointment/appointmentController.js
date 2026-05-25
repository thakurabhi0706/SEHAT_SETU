const Appointment = require("../../models/Appointment");

const bookAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      appointmentDate,
      appointmentTime,
      consultationType,
      reasonForVisit,
      symptoms,
    } = req.body;

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      appointmentDate,
      appointmentTime,
      consultationType,
      reasonForVisit,
      symptoms,
      status: "Pending",
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user._id,
    })
      .populate("patient", "-password")
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const acceptAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    if (appointment.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending appointments can be accepted",
      });
    }

    appointment.status = "Pending";
    await appointment.save();

    res.status(200).json({
      message: "Appointment accepted",
      meetingLink: appointment.meetingLink,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const rejectAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    if (appointment.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending appointments can be rejected",
      });
    }

    appointment.status = "Cancelled";
    await appointment.save();

    res.status(200).json({
      message: "Appointment rejected",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const completeAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    if (appointment.status !== "Confirmed") {
      return res.status(400).json({
        message: "Only confirmed appointments can be completed",
      });
    }

    appointment.status = "Completed";
    await appointment.save();

    res.status(200).json({
      message: "Appointment marked completed",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user._id,
    })
      .populate("doctor", "-password")
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  bookAppointment,
  getDoctorAppointments,
  getPatientAppointments,
  acceptAppointment,
  rejectAppointment,
  completeAppointment,
};