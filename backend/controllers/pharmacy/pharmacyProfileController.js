const Pharmacy = require("../../models/Pharmacy");

const getPharmacyProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updatePharmacyProfile = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.user._id);

    if (!pharmacy) {
      return res.status(404).json({
        message: "Pharmacy not found",
      });
    }

    pharmacy.pharmacyName =
      req.body.pharmacyName || pharmacy.pharmacyName;

    pharmacy.ownerName =
      req.body.ownerName || pharmacy.ownerName;

    pharmacy.phone =
      req.body.phone || pharmacy.phone;

    pharmacy.address =
      req.body.address || pharmacy.address;

    pharmacy.gstNumber =
      req.body.gstNumber || pharmacy.gstNumber;

    pharmacy.operatingHours =
      req.body.operatingHours || pharmacy.operatingHours;

    pharmacy.medicinesAvailable =
      req.body.medicinesAvailable || pharmacy.medicinesAvailable;

    pharmacy.uploadedDocuments =
      req.body.uploadedDocuments || pharmacy.uploadedDocuments;

    const updatedPharmacy = await pharmacy.save();

    res.status(200).json({
      message: "Pharmacy profile updated successfully",
      updatedPharmacy,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPharmacyProfile,
  updatePharmacyProfile,
};