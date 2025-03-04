const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB().then((db) => {
    app.locals.db = db;
    console.log("📌 Database connection stored in app.locals");
});

// Use event routes
const eventRoutes = require("./routes/eventRoutes");
app.use("/api/v3/app", eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
