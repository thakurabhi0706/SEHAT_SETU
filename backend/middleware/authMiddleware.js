const jwt = require("jsonwebtoken");

const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Pharmacy = require("../models/Pharmacy");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role === "patient") {
        req.user = await Patient.findById(decoded.id).select("-password");
      }

      else if (decoded.role === "doctor") {
        req.user = await Doctor.findById(decoded.id).select("-password");
      }

      else if (decoded.role === "pharmacy") {
        req.user = await Pharmacy.findById(decoded.id).select("-password");
      }

      else if (decoded.role === "admin") {
        req.user = await Admin.findById(decoded.id).select("-password");
      }

      req.userRole = decoded.role;

      next();

    } catch (error) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.userRole === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Admin access only",
    });
  }
};

const patientOnly = (req, res, next) => {
  if (req.userRole === "patient") {
    next();
  } else {
    return res.status(403).json({
      message: "Patient access only",
    });
  }
};

const doctorOnly = (req, res, next) => {
  if (req.userRole === "doctor") {
    next();
  } else {
    return res.status(403).json({
      message: "Doctor access only",
    });
  }
};

const pharmacyOnly = (req, res, next) => {
  if (req.userRole === "pharmacy") {
    next();
  } else {
    return res.status(403).json({
      message: "Pharmacy access only",
    });
  }
};

module.exports = {
  protect,
  adminOnly,
  patientOnly,
  doctorOnly,
  pharmacyOnly,
};