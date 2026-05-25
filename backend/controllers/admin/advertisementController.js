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

const getActiveAdvertisements = async (req, res) => {
  try {
    const currentDate = new Date();

    const ads = await Advertisement.find({
      isActive: true,
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    }).sort({ createdAt: -1 });

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
};