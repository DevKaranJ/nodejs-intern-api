const { ObjectId } = require("mongodb");

// Get all events
const getEvents = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const events = await db.collection("events").find().toArray();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events" });
    }
};

// Get event by ID
const getEventById = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const event = await db.collection("events").findOne({ _id: new ObjectId(req.params.id) });
        if (!event) return res.status(404).json({ error: "Event not found" });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch event" });
    }
};

// Create new event
const createEvent = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const newEvent = req.body;
        const result = await db.collection("events").insertOne(newEvent);
        res.status(201).json({ message: "Event created successfully", eventId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: "Failed to create event" });
    }
};

// Update event by ID
const updateEvent = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const updatedEvent = req.body;
        const result = await db.collection("events").updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedEvent });

        if (result.modifiedCount === 0) return res.status(404).json({ error: "Event not found or no changes made" });

        res.status(200).json({ message: "Event updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update event" });
    }
};

// Delete event by ID
const deleteEvent = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const result = await db.collection("events").deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) return res.status(404).json({ error: "Event not found" });

        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete event" });
    }
};

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent };
