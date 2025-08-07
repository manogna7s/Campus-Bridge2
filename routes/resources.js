const express = require('express');
const router = express.Router();
const connection = require('../db');

// GET all resources
router.get('/', (req, res) => {
  const query = 'SELECT * FROM lms';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error fetching resources:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }

    // Add full URL to file_path
    const updatedResults = results.map(resource => ({
      ...resource,
      file_url: `${req.protocol}://${req.get('host')}/uploads/${resource.file_path.split('/').pop()}`
    }));

    res.json(updatedResults);
  });
});

module.exports = router;
