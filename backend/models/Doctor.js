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

const doctorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
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

    profilePhoto: {
      type: String,
      default: "",
    },

    doctorId: {
      type: String,
      required: true,
      unique: true,
    },

    medicalLicenseNumber: {
      type: String,
      required: true,
      unique: true,
    },

    qualifications: [
      {
        type: String,
      },
    ],

    certifications: [
      {
        type: String,
      },
    ],

    specialization: {
      type: String,
      required: true,
    },

    yearsOfExperience: {
      type: Number,
      default: 0,
    },

    consultationFee: {
      type: Number,
      default: 0,
    },

    hospitalName: {
      type: String,
      default: "",
    },

    clinicAddress: {
      type: String,
      default: "",
    },

    availabilitySlots: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],

    uploadedDocuments: [documentSchema],

    verificationStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);