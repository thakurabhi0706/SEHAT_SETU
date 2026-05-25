const express = require("express");
const router = express.Router();

const {
  registerPatient,
  loginPatient,
} = require("../controllers/patient/patientAuthController");

const {
  getPatientProfile,
  updatePatientProfile,
} = require("../controllers/patient/patientProfileController");

const { protect, patientOnly } = require("../middleware/authMiddleware");

router.post("/register", registerPatient);
router.post("/login", loginPatient);

router.get("/profile", protect, patientOnly, getPatientProfile);
router.put("/profile", protect, patientOnly, updatePatientProfile);

module.exports = router;