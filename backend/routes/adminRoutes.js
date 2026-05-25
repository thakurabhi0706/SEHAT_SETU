const express = require("express");
const router = express.Router();

const {
  getAdminProfile,
} = require("../controllers/admin/adminProfileController");


const {
  loginAdmin,
} = require("../controllers/admin/adminAuthController");

const {
  getPendingDoctors,
  approveDoctor,
  rejectDoctor,
  getPendingPharmacies,
  approvePharmacy,
  rejectPharmacy,
} = require("../controllers/admin/adminManagementController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);

router.get(
  "/pending-doctors",
  protect,
  adminOnly,
  getPendingDoctors
);

router.put(
  "/approve-doctor/:id",
  protect,
  adminOnly,
  approveDoctor
);

router.put(
  "/reject-doctor/:id",
  protect,
  adminOnly,
  rejectDoctor
);

router.get(
  "/pending-pharmacies",
  protect,
  adminOnly,
  getPendingPharmacies
);

router.put(
  "/approve-pharmacy/:id",
  protect,
  adminOnly,
  approvePharmacy
);

router.put(
  "/reject-pharmacy/:id",
  protect,
  adminOnly,
  rejectPharmacy
);

router.get("/profile", protect, adminOnly, getAdminProfile);

module.exports = router;