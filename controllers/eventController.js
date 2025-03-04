const { ObjectId } = require("mongodb");

// Helper function to validate event fields
const validateEvent = (eventData) => {
    const errors = [];

    if (!eventData.uid || isNaN(eventData.uid)) errors.push("User ID (uid) is required and must be a valid number.");
    if (!eventData.name || eventData.name.length < 3 || eventData.name.length > 100) errors.push("Event name must be between 3 and 100 characters.");
    if (eventData.tagline && eventData.tagline.length > 200) errors.push("Tagline must be under 200 characters.");
    if (!eventData.schedule || isNaN(Date.parse(eventData.schedule))) errors.push("Schedule is required and must be a valid date.");
    if (!eventData.description || eventData.description.length < 10) errors.push("Description must be at least 10 characters.");
    if (!eventData.moderator) errors.push("Moderator is required.");
    if (!eventData.category) errors.push("Category is required.");
    if (!eventData.sub_category) errors.push("Sub-category is required.");
    if (!eventData.rigor_rank || isNaN(eventData.rigor_rank)) errors.push("Rigor rank is required and must be a valid integer.");
    if (eventData.attendees && !Array.isArray(eventData.attendees)) errors.push("Attendees must be an array of user IDs.");

    return errors;
};

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

// Create new event with validation & prevent duplicates
const createEvent = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const {
            uid, name, tagline, schedule, description, moderator,
            category, sub_category, rigor_rank, attendees
        } = req.body;

        const rigorRankInt = parseInt(rigor_rank);
        const image = req.file ? req.file.filename : null;

        const newEvent = {
            type: "event",
            uid,
            name,
            tagline,
            schedule,
            description,
            files: { image },
            moderator,
            category,
            sub_category,
            rigor_rank: rigorRankInt,
            attendees: attendees ? attendees.split(",") : []
        };

        // Validate input
        const validationErrors = validateEvent(newEvent);
        if (validationErrors.length > 0) {
            return res.status(400).json({ error: "Validation failed", details: validationErrors });
        }

        // Prevent duplicate events (same name, schedule, and moderator)
        const existingEvent = await db.collection("events").findOne({ name, schedule, moderator });
        if (existingEvent) {
            return res.status(409).json({ error: "Event with the same name, schedule, and moderator already exists." });
        }

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
        const { id } = req.params;
        const { uid, name, tagline, schedule, description, moderator, category, sub_category, rigor_rank, attendees } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid event ID" });
        }

        // Fetch existing event
        const existingEvent = await db.collection("events").findOne({ _id: new ObjectId(id) });
        if (!existingEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        const image = req.file ? req.file.filename : existingEvent.files?.image;

        // Fields to update
        const updatedFields = {};
        if (uid) updatedFields.uid = uid;
        if (name) updatedFields.name = name;
        if (tagline) updatedFields.tagline = tagline;
        if (schedule) updatedFields.schedule = schedule;
        if (description) updatedFields.description = description;
        if (moderator) updatedFields.moderator = moderator;
        if (category) updatedFields.category = category;
        if (sub_category) updatedFields.sub_category = sub_category;
        if (rigor_rank) updatedFields.rigor_rank = parseInt(rigor_rank);
        if (attendees) updatedFields.attendees = attendees.split(",");
        if (req.file) updatedFields.files = { image };

        // Validate updated fields before saving
        const validationErrors = validateEvent({ ...existingEvent, ...updatedFields });
        if (validationErrors.length > 0) {
            return res.status(400).json({ error: "Validation failed", details: validationErrors });
        }

        const result = await db.collection("events").updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedFields }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "No changes made" });
        }

        res.status(200).json({ message: "Event updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update event", details: error.message });
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
