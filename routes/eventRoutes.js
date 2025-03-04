const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require("../controllers/eventController");

// Event Routes
router.get("/events", getEvents);             // Get all events
router.get("/events/:id", getEventById);      // Get a single event by ID
router.post("/events", upload.single("image"), createEvent); // Create a new event
router.put("/events/:id", upload.single("image"), updateEvent); // Update an event by ID
router.delete("/events/:id", deleteEvent);    // Delete an event by ID

module.exports = router;
