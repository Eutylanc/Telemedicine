// const { addPatient, getAllPatients, findPatientsByEmail } = require('../models/patients');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const {validationResult } = require('express-validator');

// register patient
exports.registerPatient = async (req, res) => {
    const errors = validationResult(req);
    // check if any errors present in validation
    if(!errors.isEmpty()){
        return res.status(400).json({ message: 'please correct input errors', errors: errors.array() });
    }

    // fetching input parametors from the request body
    const { email, password_hash } = req.body;

    try{
    // check if patient exists
    const [patients] = await db.execute('SELECT email FROM patients WHERE email = ?', [email]);
    if(patients.length > 0){
        return res.status(400).json({ message: 'The patient already exists'});
    }

    // prepare our data - hash the password
    const hashedPassword = await bcrypt.hash(password_hash, 10);

    // insert the record
    await db.execute('INSERT INTO patients (id, first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
         [id, first_name, last_name, email, password_hash, phone, date_of_birth, gender, address]);

     // response
    return res.status(201).json({ message: 'New patient registered successfully.'});
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'error'})

    }
}

// login
exports.loginPatient = async (req, res) => {
    // fetch email & password
    const { email, password } = req.body;

    try{
        // check if patient exists
        const[patients] = await db.execute('SELECT * FROM patients WHERE email = ?', [email]);
        if(patients.length === 0){
            return res.status(400).json({ message: 'The patient does not  exists'});          
       }

        // check the password
       const isMatch = await bcrypt.compare(password, patient[0].password);

       if(!isMatch){
        return res.status(400).json({ message: 'Invalid email/password combination.'});
    }
    // create a session
    req.session.patientId = patient[0].Id;
    req.session.name = patient[0].name;
    req.session.email = patient[0].email;

return res.status(201).json({ message: 'login successfull.'});
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'error occured during Login!', error: error.message });
    }
}

// Function for logout
exports.logoutPatient = (req, res) => {
    req.session.destroy( (err) => {
        if(err){
            console.error(err);
                return res.status(500).json({ message: 'An error occured.', error: err.message });
            
        }
        return res.status(200).json({ message: 'Successfully logged out.'});
    });
}

// Function to get patient edit infomation
exports.getPatient = async (req, res) => {
    // Check if patient is logged in / authorised
    if(!req.session.patientId){
        return res.status(401).json({ message: "Unauthorized!"});
    }

    try{
        // fetch Patients
        const [patients] = await db.execute('SELECT email FROM patients WHERE Id = ?', [req.session.PatientsId]);
        if(patients.length === 0){
            return res.status(400).json({ message: 'Patient not found.'})
        }

        return res.status(200).json({ message: ' Patients details fetched for editing,', patient: patient[0]})
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occured while fetching patients details.', erroe: error.message })
    }
}


