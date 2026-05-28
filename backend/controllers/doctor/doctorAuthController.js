const Doctor = require("../../models/Doctor");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");

const registerDoctor = async (req, res) => {
  try {
    const {
      fullName,
      age,
      gender,
      phone,
      email,
      password,
      doctorId,
      medicalLicenseNumber,
      specialization,
    } = req.body;

    const doctorExists = await Doctor.findOne({ email });

    if (doctorExists) {
      return res.status(400).json({
        message: "Doctor already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
      fullName,
      age,
      gender,
      phone,
      email,
      password: hashedPassword,
      doctorId,
      medicalLicenseNumber,
      specialization,
    });

    res.status(201).json({
  message: "Doctor registered successfully",

  token: generateToken(doctor._id, "doctor"),

  user: {
    _id: doctor._id,
    fullName: doctor.fullName,
    email: doctor.email,
    role: "doctor",
    profileCompleted: doctor.profileCompleted,
    verificationStatus: doctor.verificationStatus,
  },
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
    return res.status(404).json({
        message: "Doctor not found",
    });
    }

    // if (doctor.verificationStatus !== "Approved") {
    // return res.status(403).json({
    //     message: "Doctor account is not verified by admin yet",
    // });
    // }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
  message: "Doctor login successful",

  token: generateToken(doctor._id, "doctor"),

  user: {
    _id: doctor._id,
    fullName: doctor.fullName,
    email: doctor.email,
    role: "doctor",
    profileCompleted: doctor.profileCompleted,
    verificationStatus: doctor.verificationStatus,
  },
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerDoctor,
  loginDoctor,
};