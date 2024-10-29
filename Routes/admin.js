// routes/admin.js
const express = require('express');
const router = express.Router();
const db = require('../connections/db'); // Import the db.js file for the MySQL connection

// Get all doctors
router.get('/', (req, res) => {
    const query = 'SELECT * FROM admin'; 

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching admin');
        } else {
            res.json(results); // Send the results back as JSON
        }
    });
});

// Get a specific doctor by ID
router.get('/:id', (req, res) => {
    const adminId = req.params.id;
    const query = 'SELECT * FROM admin WHERE id = ?'; // Using a placeholder for the ID

    db.query(query, [adminId], (err, results) => {
        if (err) {
            res.status(500).send('Error fetching admin details');
        } else {
            res.json(results);
        }
    });
});

module.exports = router;

