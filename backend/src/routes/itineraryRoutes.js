
const express = require("express");

const router = express.Router();

const { protect } = require(
  "../middleware/authMiddleware"
);



const {
  getUserItineraries,
  getSingleItinerary,
  deleteItinerary,
  getSharedItinerary,
} = require(
  "../controllers/itineraryController"
);

// User history
router.get(
  "/",
  protect,
  getUserItineraries
);

// Single itinerary
router.get(
  "/:id",
  protect,
  getSingleItinerary
);

// Delete itinerary
router.delete(
  "/:id",
  protect,
  deleteItinerary
);

// Public share route
router.get(
  "/share/:shareId",
  getSharedItinerary
);

module.exports = router;

