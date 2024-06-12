const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mateus88',
  database: 'cuckoo_db',
  port: 3306
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

router.get('/', (req, res) => {
    const query = 'SELECT DISTINCT cuckooStatus FROM cuckoo';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching status', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});
module.exports = router;