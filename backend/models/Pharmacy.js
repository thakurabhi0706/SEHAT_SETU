const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  documentType: String,
  fileName: String,
  fileUrl: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const pharmacySchema = new mongoose.Schema(
  {
    pharmacyName: {
      type: String,
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    pharmacyLicenseNumber: {
      type: String,
      required: true,
      unique: true,
    },

    gstNumber: {
      type: String,
      default: "",
    },

    uploadedDocuments: [documentSchema],

    medicinesAvailable: [
      {
        type: String,
      },
    ],

    operatingHours: {
      type: String,
      default: "",
    },

    verificationStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pharmacy", pharmacySchema);