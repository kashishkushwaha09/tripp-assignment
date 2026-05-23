const express = require("express");
const { upload } = require("../config/multer");
const { uploadDocument } = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, upload.single("document"), uploadDocument);

module.exports = router;
