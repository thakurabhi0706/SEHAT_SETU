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
      
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      
    },

    phone: {
  type: String,
  unique: true,
  sparse: true,
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
  unique: true,
  sparse: true,
},

    medicalLicenseNumber: {
      type: String,
      
      unique: true,
      sparse: true
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

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    availabilitySlots: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    
    
    ],

    uploadedDocuments: [
  {
    documentType: String,
    fileName: String,
    fileUrl: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
],

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