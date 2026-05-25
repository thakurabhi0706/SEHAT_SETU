const express = require("express");
const router = express.Router();


const {
  registerDoctor,
  loginDoctor,
} = require("../controllers/doctor/doctorAuthController");

const {
  getDoctorProfile,
  updateDoctorProfile,
  getAllApprovedDoctors,
  getDoctorsBySpecialization
} = require("../controllers/doctor/doctorProfileController");

const { protect, doctorOnly } = require("../middleware/authMiddleware");

router.post("/register", registerDoctor);
router.post("/login", loginDoctor);

router.get("/", getAllApprovedDoctors);
router.get("/specialization/:specialization", getDoctorsBySpecialization);

router.get("/profile", protect, doctorOnly, getDoctorProfile);
router.put("/profile", protect, doctorOnly, updateDoctorProfile);

module.exports = router;