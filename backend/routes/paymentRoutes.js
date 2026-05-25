const express = require("express");
const router = express.Router();

const {
  createPaymentOrder,
  verifyPayment,
} = require("../controllers/payment/paymentController");

const {
  protect,
  patientOnly,
} = require("../middleware/authMiddleware");

router.post("/create-order", protect, patientOnly, createPaymentOrder);

router.post("/verify", protect, patientOnly, verifyPayment);

module.exports = router;