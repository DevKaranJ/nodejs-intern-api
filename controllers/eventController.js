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
        const {
            uid, name, tagline, schedule, description, moderator,
            category, sub_category, rigor_rank, attendees
        } = req.body;

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
            rigor_rank: parseInt(rigor_rank),
            attendees: attendees ? attendees.split(",") : []
        };

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

        // Validate MongoDB ObjectId
        if (!ObjectId.isValid(id)) {
            console.error("❌ Invalid MongoDB ObjectId");
            return res.status(400).json({ error: "Invalid event ID" });
        }

        // Fetch the existing event
        const existingEvent = await db.collection("events").findOne({ _id: new ObjectId(id) });
        if (!existingEvent) {
            console.error("❌ Event Not Found in Database");
            return res.status(404).json({ error: "Event not found" });
        }

        const image = req.file ? req.file.filename : existingEvent.files?.image;

        // Create an update object that only includes fields that were sent in the request
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

        // If no valid fields are being updated, return an error
        if (Object.keys(updatedFields).length === 0) {
            console.error("❌ No valid fields to update");
            return res.status(400).json({ error: "No valid fields provided for update" });
        }

        const result = await db.collection("events").updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedFields }
        );

        if (result.modifiedCount === 0) {
            console.error("❌ No changes detected");
            return res.status(404).json({ error: "No changes made" });
        }

        res.status(200).json({ message: "Event updated successfully" });
    } catch (error) {
        console.error("❌ Error updating event:", error);
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
