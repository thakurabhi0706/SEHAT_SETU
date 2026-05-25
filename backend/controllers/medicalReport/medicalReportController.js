const MedicalReport = require("../../models/MedicalReport");

const uploadMedicalReport = async (req, res) => {
  try {
    const {
      reportType,
      reportName,
      fileUrl,
      notes,
    } = req.body;

    const report = await MedicalReport.create({
      patient: req.user._id,
      uploadedBy: "Patient",
      reportType,
      reportName,
      fileUrl,
      notes,
    });

    res.status(201).json({
      message: "Medical report uploaded successfully",
      report,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPatientReports = async (req, res) => {
  try {
    const reports = await MedicalReport.find({
      patient: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(reports);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getReportsByPatient = async (req, res) => {
  try {
    const reports = await MedicalReport.find({
      patient: req.params.patientId,
    }).sort({ createdAt: -1 });

    res.status(200).json(reports);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadMedicalReport,
  getPatientReports,
  getReportsByPatient,
};