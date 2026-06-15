const express = require("express");
const cors = require("cors");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const pharmacyRoutes = require("./routes/pharmacyRoutes");
const adminRoutes = require("./routes/adminRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const medicalReportRoutes = require("./routes/medicalReportRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const advertisementRoutes = require("./routes/advertisementRoutes");
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sehat-setu-r3jqpbm8n-rbjanil1973-4617s-projects.vercel.app",
      "sehat-setu-kappa.vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/ads", advertisementRoutes);
app.use(
  "/api/medical-reports",
  medicalReportRoutes
);

app.get("/", (req, res) => {
  res.send("SEHAT SETU Backend Running");
});

module.exports = app;