const fs = require("fs");
const { PDFParse } = require("pdf-parse");
const Tesseract = require("tesseract.js");

const extractTextFromPdf = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const parser = new PDFParse({ data: dataBuffer });
  const result = await parser.getText();
  return result.text;
};

const extractTextFromImage = async (filePath) => {
  const result = await Tesseract.recognize(filePath, "eng");

  return result.data.text;
};

const extractDocumentText = async (file) => {
  const fileType = file.mimetype;

  let rawText = "";

  if (fileType === "application/pdf") {
    rawText = await extractTextFromPdf(file.path);
  } else {
    rawText = await extractTextFromImage(file.path);
  }

  return {
    rawText,
    fileType,
  };
};

module.exports = {
  extractDocumentText,
};
