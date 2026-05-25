const Patient = require("../../models/Patient");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");

const registerPatient = async (req, res) => {
  try {
    const {
      fullName,
      age,
      gender,
      phone,
      email,
      password,
    } = req.body;

    const patientExists = await Patient.findOne({ email });

    if (patientExists) {
      return res.status(400).json({
        message: "Patient already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = await Patient.create({
      fullName,
      age,
      gender,
      phone,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Patient registered successfully",
      token: generateToken(patient._id, "patient"),
      patient,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    const isMatch = await bcrypt.compare(password, patient.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      message: "Login successful",
      token: generateToken(patient._id, "patient"),
      patient,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerPatient,
  loginPatient,
};