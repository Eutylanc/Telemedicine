const db = require('../config/db')
const bcrypt = require('bcrypt')

// Adding patient to the sustem
const addPatient = async (patientData) => {
    const { first_name, last_name, email, password_hash, phone, date_of_birth, gender, address } = patientData;
    // Password information in the system
    const hashedpassword = await bcrypt.hash(password_hash, 10);

    // Adding patient to the system
    const query = `INSERT INTO patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

    const values = [first_name, last_name, email, password_hash, phone, date_of_birth, gender, address];

    const result = await db.query(query, values);

    return result.rows[0];
}

// Getting patients from the system
const getAllPatients = async () => {
    const result = await db.query('SELECT * FROM patients');
    return result.rows;
}

// Serching patients by email
const findPatientsByEmail = async (email) => {
    const query = 'SELECT * FROM patients WHERE email - $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
}

module.exports = { addPatient, getAllPatients, findPatientsByEmail };