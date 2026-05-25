const express = require("express");
const router = express.Router();

const {
  createAdvertisement,
  getActiveAdvertisements,
} = require("../controllers/admin/advertisementController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.post(
  "/create",
  protect,
  adminOnly,
  createAdvertisement
);

router.get("/", getActiveAdvertisements);

module.exports = router;