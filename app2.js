const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = 4000;

// Handle favicon request
app.get('/favicon.ico', (req, res) => res.status(204));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // Serve the HTML file of your second app
  res.sendFile(__dirname + '/cuckoo_back/public/index2.html');
});
// Serve static files from the 'cuckoo_front/public' directory
app.use(express.static(path.join(__dirname, 'cuckoo_back', '/public'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.woff2')) {
        res.setHeader('Content-Type', 'font/woff2');
      }
    },
  }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mateus88',
  database: 'tm470back',
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'none'; font-src 'self' http://localhost:4000;");
  next();
});

// Handle GET requests to retrieve posted data in JSON format
app.get('/submitted-data', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Error fetching data from MySQL' });
      return;
    }
    res.json(results);
  });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});