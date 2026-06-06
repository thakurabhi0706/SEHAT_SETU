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
  updateAvailability,
  getDoctorsBySpecialization,
  getDoctorById,
} = require("../controllers/doctor/doctorProfileController");


const {
  getDoctorDashboard,
  getDoctorPatients,
  getDoctorEarnings,
} = require(
  "../controllers/doctor/doctorDashboardController"
);


const { protect, doctorOnly } = require("../middleware/authMiddleware");


router.post("/register", registerDoctor);
router.post("/login", loginDoctor);

router.get("/profile", protect, doctorOnly, getDoctorProfile);
router.put("/profile", protect, doctorOnly, updateDoctorProfile);

router.put(
  "/availability",
  protect,
  doctorOnly,
  updateAvailability
);




router.get("/", getAllApprovedDoctors);
router.get("/specialization/:specialization", getDoctorsBySpecialization);


router.get(
  "/dashboard",
  protect,
  doctorOnly,
  getDoctorDashboard
);

router.get(
  "/patients",
  protect,
  doctorOnly,
  getDoctorPatients
);

router.get(
  "/earnings",
  protect,
  doctorOnly,
  getDoctorEarnings
);


router.get("/:id", getDoctorById);
module.exports = router;