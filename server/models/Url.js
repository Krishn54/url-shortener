const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: [true, "Original URL is required"],
      trim: true,
      maxlength: [2048, "URL cannot exceed 2048 characters"],
    },

    shortCode: {
      type: String,
      required: [true, "Short code is required"],
      unique: true,
      trim: true,
      minlength: [6, "Short code must be at least 6 characters"],
      maxlength: [20, "Short code cannot exceed 20 characters"],
    },

    clicks: {
      type: Number,
      default: 0,
      min: [0, "Clicks cannot be negative"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Url", urlSchema);
