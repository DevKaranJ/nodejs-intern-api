const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (_req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// File filter: Allow only images
const fileFilter = (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// Upload middleware
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limited to 5MB file size
    fileFilter
});

module.exports = upload;
