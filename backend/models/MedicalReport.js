const mongoose = require("mongoose");

const medicalReportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    uploadedBy: {
      type: String,
      enum: ["Patient", "Doctor"],
      required: true,
    },

    reportType: {
      type: String,
      required: true,
    },

    reportName: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MedicalReport", medicalReportSchema);