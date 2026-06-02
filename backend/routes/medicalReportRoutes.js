const express = require("express");
const router = express.Router();

const {
  uploadMedicalReport,
  getPatientReports,
  getReportsByPatient,
  deleteMedicalReport,
} = require("../controllers/medicalReport/medicalReportController");

const {
  protect,
  patientOnly,
  doctorOnly,
} = require("../middleware/authMiddleware");

const upload =
  require("../middleware/uploadMiddleware");

router.post(
  "/upload",
  protect,
  patientOnly,
  upload.single("report"),
  uploadMedicalReport
);

router.get("/patient", protect, patientOnly, getPatientReports);

router.get(
  "/doctor/:patientId",
  protect,
  doctorOnly,
  getReportsByPatient
);

router.delete(
  "/:id",
  protect,
  patientOnly,
  deleteMedicalReport
);



module.exports = router;