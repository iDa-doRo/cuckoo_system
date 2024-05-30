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

// Retrieve all products
router.get('/all', (req, res) => {
  const sql = 'SELECT cuckooName, cuckooPrice, cuckooDesc, cuckooPic, cuckooStatus FROM cuckoo';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Retrieve a single product by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT cuckooName, cuckooPrice, cuckooDesc, cuckooPic, cuckooStatus FROM cuckoo WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;

