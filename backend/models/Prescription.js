const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    medicines: [
      {
        medicineName: {
          type: String,
          required: true,
        },

        dosage: {
          type: String,
          required: true,
        },

        frequency: {
          type: String,
          required: true,
        },

        duration: {
          type: String,
          required: true,
        },

        instructions: {
          type: String,
          default: "",
        },
      },
    ],

    diagnosis: {
      type: String,
      default: "",
    },

    doctorNotes: {
      type: String,
      default: "",
    },

    followUpDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);