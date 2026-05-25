const razorpay = require("../../config/razorpay");
const Appointment = require("../../models/Appointment");
const crypto = require("crypto");

const createPaymentOrder = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await Appointment.findById(appointmentId)
      .populate("doctor");

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    const amount = appointment.doctor.consultationFee * 100;

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${appointment._id}`,
    };

    const order = await razorpay.orders.create(options);

    appointment.paymentAmount = appointment.doctor.consultationFee;
    await appointment.save();

    res.status(200).json({
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      appointmentId,
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    const appointment = await Appointment.findById(appointmentId);

    appointment.paymentStatus = "Paid";
    appointment.paymentId = razorpay_payment_id;
    appointment.status = "Confirmed";

    appointment.meetingLink =
      `https://meet.jit.si/sehatsetu-${appointment._id}`;

    await appointment.save();

    res.status(200).json({
      message: "Payment successful",
      meetingLink: appointment.meetingLink,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};