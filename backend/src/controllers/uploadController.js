const Itinerary = require("../models/Itinerary");
const {
  generateStructuredTravelData,
  generateTravelItinerary,
} = require("../services/aiService");
const { extractDocumentText } = require("../services/extractionService");

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    const { rawText, fileType } = await extractDocumentText(req.file);
    console.log("rawText", rawText);

    const extractedData = await generateStructuredTravelData(rawText);
    console.log("EXTRACTED DATA:");
    console.log(extractedData);
    // STEP 3 → Generate itinerary
    const itinerary = await generateTravelItinerary(extractedData);
    console.log("ITINERARY:");
    console.log(itinerary);
    const savedItinerary = await Itinerary.create({
      userId: req.user._id,
      uploadedFiles: [req.file.path],
      extractedData,
      itinerary,
      destination: extractedData.destination || "",
      title: itinerary.title || `${extractedData.destination} Trip`,
    });
    return res.status(201).json({
      success: true,
      message: "Travel data extracted successfully",
      data: savedItinerary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { uploadDocument };
