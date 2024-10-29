// routes/appointments.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// Get all appointments
router.get('/', (req, res) => {
    const query = 'SELECT * FROM appointments'; 

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching appontments');
        } else {
            res.json(results); // Send the results back as JSON
        }
    });
});

// Get a specific appointments by ID
router.get('/:id', (req, res) => {
    const appointmentsId = req.params.id;
    const query = 'SELECT * FROM appointments WHERE id = ?'; // Using a placeholder for the ID

    db.query(query, [appointmentsId], (err, results) => {
        if (err) {
            res.status(500).send('Error fetching appointments details');
        } else {
            res.json(results);
        }
    });
});

module.exports = router;

