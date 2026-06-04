const express = require("express");
const router = express.Router();

const {
  createAdvertisement,
  getActiveAdvertisements,
  getAllAdvertisements,
  toggleAdvertisement,
  deleteAdvertisement,
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


router.get(
  "/admin",
  protect,
  adminOnly,
  getAllAdvertisements
);

router.put(
  "/toggle/:id",
  protect,
  adminOnly,
  toggleAdvertisement
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteAdvertisement
);

router.get("/", getActiveAdvertisements);

module.exports = router;