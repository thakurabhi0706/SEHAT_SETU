const Doctor = require("../../models/Doctor");
const Pharmacy = require("../../models/Pharmacy");

const getPendingDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({
      verificationStatus: "Pending",
    });

    res.status(200).json(doctors);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const approveDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    doctor.verificationStatus = "Approved";
    doctor.isVerified = true;

    await doctor.save();

    res.status(200).json({
      message: "Doctor approved successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const rejectDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    doctor.verificationStatus = "Rejected";
    doctor.isVerified = false;

    await doctor.save();

    res.status(200).json({
      message: "Doctor rejected",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPendingPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find({
      verificationStatus: "Pending",
    });

    res.status(200).json(pharmacies);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const approvePharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id);

    if (!pharmacy) {
      return res.status(404).json({
        message: "Pharmacy not found",
      });
    }

    pharmacy.verificationStatus = "Approved";
    pharmacy.isVerified = true;

    await pharmacy.save();

    res.status(200).json({
      message: "Pharmacy approved successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const rejectPharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id);

    if (!pharmacy) {
      return res.status(404).json({
        message: "Pharmacy not found",
      });
    }

    pharmacy.verificationStatus = "Rejected";
    pharmacy.isVerified = false;

    await pharmacy.save();

    res.status(200).json({
      message: "Pharmacy rejected",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPendingDoctors,
  approveDoctor,
  rejectDoctor,
  getPendingPharmacies,
  approvePharmacy,
  rejectPharmacy,
};