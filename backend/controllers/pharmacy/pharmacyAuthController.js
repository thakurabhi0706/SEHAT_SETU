const Pharmacy = require("../../models/Pharmacy");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");

const registerPharmacy = async (req, res) => {
  try {
    const {
      pharmacyName,
      ownerName,
      phone,
      email,
      password,
      address,
      pharmacyLicenseNumber,
    } = req.body;

    const pharmacyExists = await Pharmacy.findOne({ email });

    if (pharmacyExists) {
      return res.status(400).json({
        message: "Pharmacy already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const pharmacy = await Pharmacy.create({
      pharmacyName,
      ownerName,
      phone,
      email,
      password: hashedPassword,
      address,
      pharmacyLicenseNumber,
    });

    res.status(201).json({
      message: "Pharmacy registered successfully",
      token: generateToken(pharmacy._id, "pharmacy"),
      pharmacy,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginPharmacy = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pharmacy = await Pharmacy.findOne({ email });

    if (!pharmacy) {
    return res.status(404).json({
        message: "Pharmacy not found",
    });
    }

    if (pharmacy.verificationStatus !== "Approved") {
    return res.status(403).json({
        message: "Pharmacy account is not verified by admin yet",
    });
    }

    const isMatch = await bcrypt.compare(password, pharmacy.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      message: "Pharmacy login successful",
      token: generateToken(pharmacy._id, "pharmacy"),
      pharmacy,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerPharmacy,
  loginPharmacy,
};