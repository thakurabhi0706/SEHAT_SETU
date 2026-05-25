const Patient = require("../../models/Patient");

const getPatientProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updatePatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    patient.fullName = req.body.fullName || patient.fullName;
    patient.age = req.body.age || patient.age;
    patient.gender = req.body.gender || patient.gender;
    patient.phone = req.body.phone || patient.phone;
    patient.address = req.body.address || patient.address;
    patient.bloodGroup = req.body.bloodGroup || patient.bloodGroup;
    patient.emergencyContact =
      req.body.emergencyContact || patient.emergencyContact;
    patient.pastMedicalHistory =
      req.body.pastMedicalHistory || patient.pastMedicalHistory;
    patient.allergies = req.body.allergies || patient.allergies;
    patient.currentMedications =
      req.body.currentMedications || patient.currentMedications;
    patient.chronicDiseases =
      req.body.chronicDiseases || patient.chronicDiseases;

    const updatedPatient = await patient.save();

    res.status(200).json({
      message: "Patient profile updated successfully",
      updatedPatient,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPatientProfile,
  updatePatientProfile,
};