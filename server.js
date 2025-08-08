const express = require('express');
const path = require('path');
const app = express();

// Serve static fiiles from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded PDFs
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// API route for PDFs
app.get('/api/resources/pdfs', (req, res) => {
  const pdfs = [
    { title: "Lecture 1 - Data Structures", pdf_url: "/uploads/DSA.pdf" },
    { title: "Lecture 2 - Operating Systems", pdf_url: "/uploads/OS.pdf" },
    { title: "Lecture 3 - Database Management Systems", pdf_url: "/uploads/DBMS.pdf" },
    { title: "Lecture 4 - Computer Networks", pdf_url: "/uploads/CN.pdf" }
  ];
  res.json(pdfs);
});

// Catch-all for SPA/frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
