const express = require('express');
const router = express.Router();
const connection = require('../db');

// Get all PDF links
router.get('/pdfs', (req, res) => {
    connection.query('SELECT * FROM pdf_links', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

module.exports = router;
