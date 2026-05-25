const express = require("express");
const router = express.Router();


const {
  registerPharmacy,
  loginPharmacy,
} = require("../controllers/pharmacy/pharmacyAuthController");

const {
  getPharmacyProfile,
  updatePharmacyProfile,
} = require("../controllers/pharmacy/pharmacyProfileController");

const { protect, pharmacyOnly} = require("../middleware/authMiddleware");

router.post("/register", registerPharmacy);
router.post("/login", loginPharmacy);

router.get("/profile", protect, pharmacyOnly, getPharmacyProfile);
router.put("/profile", protect, pharmacyOnly, updatePharmacyProfile);

module.exports = router;