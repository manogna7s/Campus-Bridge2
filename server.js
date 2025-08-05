const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("public"));

// Multer config
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// MySQL setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Satya@1971",
  database: "lms"
});

db.connect(err => {
  if (err) throw err;
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
  db.query(sql, [values], (err, result) => {
    if (err) return res.status(500).send("Database insert failed.");
    res.status(200).send("Upload successful!");
  });
});

// Fetch all PDFs
app.get("/resources", (req, res) => {
  db.query("SELECT * FROM learning_resources", (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch" });
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
