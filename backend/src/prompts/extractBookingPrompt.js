
const extractBookingPrompt = (rawText) => {
  return `
You are an AI travel booking extraction assistant.

Extract travel booking details from the text below.

Return ONLY valid JSON.

Required JSON format:

{
  "source": "",
  "destination": "",
  "departureDate": "",
  "arrivalDate": "",
  "airline": "",
  "hotelName": "",
  "checkInDate": "",
  "checkOutDate": "",
  "travelType": ""
}

Booking Text:
${rawText}
`;
};

module.exports = extractBookingPrompt;

