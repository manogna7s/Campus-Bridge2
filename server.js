const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config(); // Load .env vars

// Middleware to parse JSON
app.use(express.json());

// Serve static files (PDFs will be in /public/uploads)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// MySQL DB connection
const connection = require('./db');

// API Routes
const resourceRoutes = require('./routes/resources');
app.use('/api/resources', resourceRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
