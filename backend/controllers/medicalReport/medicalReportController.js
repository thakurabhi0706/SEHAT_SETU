const MedicalReport = require("../../models/MedicalReport");
const cloudinary =
  require("../../config/cloudinary");

const uploadMedicalReport =
  async (req, res) => {

    try {

      const {
        reportType,
        reportName,
        notes,
      } = req.body;

      if (!req.file) {
        return res.status(400).json({
          message:
            "No report uploaded",
        });
      }

      const uploadedFile =
        await new Promise(
          (resolve, reject) => {

            const stream =
              cloudinary.uploader.upload_stream(
                {
                  folder:
                    "sehat-setu/reports",
                },
                (
                  error,
                  result
                ) => {

                  if (error)
                    reject(error);
                  else
                    resolve(result);

                }
              );

            stream.end(
              req.file.buffer
            );

          }
        );

      const report =
        await MedicalReport.create({

          patient:
            req.user._id,

          uploadedBy:
            "Patient",

          reportType,

          reportName,

          fileUrl:
            uploadedFile.secure_url,

          notes,
        });

      res.status(201).json({
        message:
          "Medical report uploaded successfully",
        report,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };


  const deleteMedicalReport = async (req, res) => {
  try {
    const report = await MedicalReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    if (
      report.patient.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await MedicalReport.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Report deleted successfully",
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
  deleteMedicalReport,
};