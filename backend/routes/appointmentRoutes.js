const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getDoctorAppointments,
  getPatientAppointments,
  acceptAppointment,
  rejectAppointment,
  completeAppointment,
} = require("../controllers/appointment/appointmentController");

const {
  protect,
  patientOnly,
  doctorOnly,
} = require("../middleware/authMiddleware");

router.post("/book", protect, patientOnly, bookAppointment);

router.get("/patient", protect, patientOnly, getPatientAppointments);

router.get("/doctor", protect, doctorOnly, getDoctorAppointments);

router.put("/accept/:id", protect, doctorOnly, acceptAppointment);

router.put("/reject/:id", protect, doctorOnly, rejectAppointment);

router.put("/complete/:id", protect, doctorOnly, completeAppointment);



module.exports = router;