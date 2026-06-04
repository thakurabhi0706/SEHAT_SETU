const Advertisement = require("../../models/Advertisement");

const createAdvertisement = async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl,
      redirectLink,
      targetAudience,
      startDate,
      endDate,
    } = req.body;

    const ad = await Advertisement.create({
      title,
      description,
      imageUrl,
      redirectLink,
      targetAudience,
      startDate,
      endDate,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Advertisement created successfully",
      ad,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllAdvertisements = async (req, res) => {
  try {
    const ads = await Advertisement.find()
      .sort({ createdAt: -1 });

    res.status(200).json(ads);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const toggleAdvertisement = async (req, res) => {
  try {
    const ad = await Advertisement.findById(
      req.params.id
    );

    if (!ad) {
      return res.status(404).json({
        message: "Advertisement not found",
      });
    }

    ad.isActive = !ad.isActive;

    await ad.save();

    res.status(200).json({
      message: "Advertisement updated",
      ad,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteAdvertisement = async (req, res) => {
  try {
    await Advertisement.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Advertisement deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getActiveAdvertisements = async (req, res) => {
  try {
    const currentDate = new Date();

    const ads = await Advertisement.find({
      isActive: true,
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    })
    .select("-createdBy")
    .sort({ createdAt: -1 });
    res.status(200).json(ads);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createAdvertisement,
  getActiveAdvertisements,
  getAllAdvertisements,
  toggleAdvertisement,
  deleteAdvertisement,
};