const itineraryPrompt = (travelData) => {
  return `
Generate a structured travel itinerary.

Travel Details:
${JSON.stringify(travelData)}

Return JSON format:

{
  "title": "",
  "days": [
    {
      "day": 1,
      "activities": []
    }
  ]
}
`;
};

module.exports = itineraryPrompt;