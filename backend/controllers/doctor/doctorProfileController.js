const Doctor = require("../../models/Doctor");

const getDoctorProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user._id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    doctor.fullName = req.body.fullName || doctor.fullName;
    doctor.age = req.body.age || doctor.age;
    doctor.gender = req.body.gender || doctor.gender;
    doctor.phone = req.body.phone || doctor.phone;
    doctor.profilePhoto = req.body.profilePhoto || doctor.profilePhoto;

    doctor.qualifications =
      req.body.qualifications || doctor.qualifications;

    doctor.certifications =
      req.body.certifications || doctor.certifications;

    doctor.specialization =
      req.body.specialization || doctor.specialization;

    doctor.yearsOfExperience =
      req.body.yearsOfExperience || doctor.yearsOfExperience;

    doctor.consultationFee =
      req.body.consultationFee || doctor.consultationFee;

    doctor.hospitalName =
      req.body.hospitalName || doctor.hospitalName;

    doctor.clinicAddress =
      req.body.clinicAddress || doctor.clinicAddress;

    doctor.availabilitySlots =
      req.body.availabilitySlots || doctor.availabilitySlots;

    doctor.uploadedDocuments =
      req.body.uploadedDocuments || doctor.uploadedDocuments;

    const updatedDoctor = await doctor.save();

    res.status(200).json({
      message: "Doctor profile updated successfully",
      updatedDoctor,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllApprovedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({
      verificationStatus: "Approved",
    }).select("-password");

    res.status(200).json(doctors);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDoctorsBySpecialization = async (req, res) => {
  try {
    const doctors = await Doctor.find({
      verificationStatus: "Approved",
      specialization: req.params.specialization,
    }).select("-password");

    res.status(200).json(doctors);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDoctorProfile,
  updateDoctorProfile,
  getAllApprovedDoctors,
  getDoctorsBySpecialization,
};