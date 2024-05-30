const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const router = express.Router();
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Handle favicon request
app.get('/favicon.ico', (req, res) => res.status(204));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mateus88',
    database: 'cuckoo_db',
  });
  
  connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });
  // Endpoint to handle GET requests for retrieving the posted data
app.get('/submitted-data', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error('Error fetching data from MySQL:', err);
        res.status(500).json({ error: 'Error fetching data from MySQL' });
        return;
      }
      res.json(results); // Send the retrieved data in JSON format
    });
  });
  
  app.post('/submit-form', (req, res) => {
          const formData = req.body;
        
          connection.query('INSERT INTO users SET ?', formData, (err, results) => {
            if (err) {
              console.error('Error inserting data into MySQL:', err);
              res.status(500).json({ error: 'Error inserting data into MySQL' });
              return;
            }
            console.log('Data inserted successfully:', results);
            res.json({ success: true });
          });
        });
module.exports = router;