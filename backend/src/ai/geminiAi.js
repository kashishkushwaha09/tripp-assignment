
const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const key=process.env.GEMINI_API_KEY;
console.log("gemini key again",key);
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generateGeminiResponse = async (prompt) => {
  const result = await model.generateContent(prompt);

  return result.response.text();
};

module.exports = {
  generateGeminiResponse,
};

