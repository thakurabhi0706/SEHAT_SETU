const Prescription = require("../../models/Prescription");
const Appointment = require("../../models/Appointment");

const createPrescription = async (req, res) => {
  try {
    const {
      appointmentId,
      medicines,
      diagnosis,
      doctorNotes,
      followUpDate,
    } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    if (
      appointment.status !== "Confirmed" ||
      appointment.paymentStatus !== "Paid"
    ) {
      return res.status(400).json({
        message:
          "Prescription can only be created for paid consultations",
      });
    }

    const prescription = await Prescription.create({
      patient: appointment.patient,
      doctor: req.user._id,
      appointment: appointmentId,
      medicines,
      diagnosis,
      doctorNotes,
      followUpDate,
    });

    res.status(201).json({
      message: "Prescription created successfully",
      prescription,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPatientPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      patient: req.user._id,
    })
      .populate("doctor", "-password")
      .populate("appointment")
      .sort({ createdAt: -1 });

    res.status(200).json(prescriptions);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPrescription,
  getPatientPrescriptions,
};