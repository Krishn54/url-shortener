const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema(
  {
    url: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
      required: [true, "URL reference is required"],
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },

    device: {
      type: String,
      default: "Unknown",
      maxlength: [50, "Device name is too long"],
    },

    browser: {
      type: String,
      default: "Unknown",
      maxlength: [50, "Browser name is too long"],
    },

    os: {
      type: String,
      default: "Unknown",
      maxlength: [50, "OS name is too long"],
    },

    referrer: {
      type: String,
      default: "Direct",
      maxlength: [2048, "Referrer is too long"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Click", clickSchema);