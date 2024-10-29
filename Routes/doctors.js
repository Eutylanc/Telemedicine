// routes/doctors.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// Get all doctors
router.get('/', (req, res) => {
    const query = 'SELECT * FROM doctors'; 

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching doctors');
        } else {
            res.json(results); // Send the results back as JSON
        }
    });
});

// Get a specific doctor by ID
router.get('/:id', (req, res) => {
    const doctorsId = req.params.id;
    const query = 'SELECT * FROM doctors WHERE id = ?'; // Using a placeholder for the ID

    db.query(query, [doctorsId], (err, results) => {
        if (err) {
            res.status(500).send('Error fetching doctors details');
        } else {
            res.json(results);
        }
    });
});

module.exports = router;

