//  import necessary packages
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const doctorRoutes = require('./Routes/doctors');  // Patient routes
const db = require('./config/db'); 
const dotenv = require('dotenv');
const MySQLStore = require ('express-mysql-session')(session);
const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain')
    res.end('Hello, the server is on');
});

// initialize env managemnt
dotenv.config();

// initialize app
const app = express();

// Middleware
app.use(express.static(('public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Session Configuration
app.use(session({
    secret: process.env,  
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60}  // Set to 1 hr
}));

// Routes
app.use('/api/patients', require('./Routes/patients'));
app.use('/api/doctors', require('./Routes/doctors'));

const createTableQuery = `
CREATE TABLE IF NOT EXISTS Appointments (
    appointments_id INT AUTO_INCREMENT PRIMARY KEY,
    appointments_date DATE,
    appointments_time TIME,
    status VARCHAR(15),
    patient_id INT,
    id INT,
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id),
    FOREIGN KEY (id) REFERENCES Doctors(id)
);

`;



db.query(createTableQuery, (err, results) => {
    if (err) {
        console.error("Error executing query:", err);
        throw err;
    }
    console.log("Table created:", results);
});


// Start the server
const PORT = process.env.PORT ||3000;
app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost/${PORT}`);
});

