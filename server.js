const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config(); // Load .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("public"));

// Ensure uploads directory exists
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// MySQL setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL");
});

// Upload endpoint
app.post("/upload", upload.array("file", 10), (req, res) => {
  const { title, type } = req.body;
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  const values = files.map(file => [title, type, `uploads/${file.filename}`]);

  const sql = "INSERT INTO learning_resources (title, type, file_path) VALUES ?";
  db.query(sql, [values], (err) => {
    if (err) return res.status(500).send("Database insert failed.");
    res.status(200).send("Upload successful!");
  });
});

// Get resources
app.get("/resources", (req, res) => {
  db.query("SELECT * FROM learning_resources", (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch" });
    res.json(results);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
