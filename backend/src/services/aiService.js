const { generateGeminiResponse } = require("../ai/geminiAi");

const extractBookingPrompt = require("../prompts/extractBookingPrompt");
const itineraryPrompt = require("../prompts/itineraryPrompt");

const cleanJson = (text) => {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};
const generateStructuredTravelData = async (rawText) => {
  const prompt = extractBookingPrompt(rawText);
  const response = await generateGeminiResponse(prompt);
  const cleanedResponse = cleanJson(response);
  return JSON.parse(cleanedResponse);
};

const generateTravelItinerary = async (travelData) => {
  const prompt = itineraryPrompt(travelData);

  const response = await generateGeminiResponse(prompt);

  const cleanedResponse = cleanJson(response); return JSON.parse(cleanedResponse);
};

module.exports = {
  generateStructuredTravelData,
  generateTravelItinerary,
};
