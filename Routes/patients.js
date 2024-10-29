// routes/patients.js
const express = require('express');
const router = express.Router();
// Import the db.js file for the MySQL connection
const db = require('../config/db'); 
const { registerUser, loginUser, logoutUser, getUser } = require('../controllers/patientsControllers');
// Get all patients
router.get('/', (req, res) => {
    const query = 'SELECT * FROM patients'; 

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching patients');
        } else {
            res.json(results); // Send the results back as JSON
        }
    });
});

// Get a specific patient by ID
router.get('/:id', (req, res) => {
    const patientId = req.params.id;
    const query = 'SELECT * FROM patients WHERE id = ?'; // Using a placeholder for the ID

    db.query(query, [patientId], (err, results) => {
        if (err) {
            res.status(500).send('Error fetching patient details');
        } else {
            res.json(results);
        }
    });
});

module.exports = router;

