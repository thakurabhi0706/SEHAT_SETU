const express = require("express");
const router = express.Router();

const {
  createPrescription,
  getPatientPrescriptions,
} = require("../controllers/prescription/prescriptionController");

const {
  protect,
  doctorOnly,
  patientOnly,
} = require("../middleware/authMiddleware");

router.post("/create", protect, doctorOnly, createPrescription);

router.get("/patient", protect, patientOnly, getPatientPrescriptions);

module.exports = router;