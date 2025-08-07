// server.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database
const db = require("./db"); // ✅ Using external db file

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("public"));

// Ensure uploads dir
if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

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

// Fetch resources
app.get("/resources", (req, res) => {
  db.query("SELECT * FROM learning_resources", (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch" });
    res.json(results);
  });
});

// ✅ You can now place test queries like this if needed
// db.query('SELECT * FROM your_table', (err, results) => {
//   if (err) console.error('Query error:', err);
//   else console.log('Query results:', results);
// });

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
