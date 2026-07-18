const Url = require("../models/Url");
const { nanoid } = require("nanoid");

// Create Short URL
const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        message: "URL is required",
      });
    }

    const shortCode = nanoid(6);

    const newUrl = await Url.create({
      originalUrl,
      shortCode,
    });

    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Redirect to Original URL
const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({
        message: "Short URL not found",
      });
    }
    

    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find();

    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;

    const url = await Url.findByIdAndDelete(id);

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    res.status(200).json({
      message: "URL deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createShortUrl,
  redirectUrl,
  getAllUrls,
  deleteUrl,
};