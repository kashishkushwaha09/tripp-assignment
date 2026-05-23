const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const itinerarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    uploadedFiles: [
      {
        type: String,
      },
    ],

    extractedData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    itinerary: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    shareId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Itinerary", itinerarySchema);
