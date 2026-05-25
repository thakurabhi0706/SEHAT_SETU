const express = require("express");
const router = express.Router();

const {
  uploadMedicalReport,
  getPatientReports,
  getReportsByPatient,
} = require("../controllers/medicalReport/medicalReportController");

const {
  protect,
  patientOnly,
  doctorOnly,
} = require("../middleware/authMiddleware");

router.post("/upload", protect, patientOnly, uploadMedicalReport);

router.get("/patient", protect, patientOnly, getPatientReports);

router.get(
  "/doctor/:patientId",
  protect,
  doctorOnly,
  getReportsByPatient
);

module.exports = router;