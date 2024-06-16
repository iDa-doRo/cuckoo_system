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

// Add a new product
router.post('/add', (req, res) => {
  const product = req.body;
  const sql = 'INSERT INTO cuckoo SET ?';
  db.query(sql, product, (err, result) => {
    if (err) throw err;
    res.send('Product added...');
  });
});

// Update a product
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const sql = 'UPDATE cuckoo SET ? WHERE id = ?';
  db.query(sql, [updatedProduct, id], (err, result) => {
    if (err) throw err;
    res.send('Product updated...');
  });
});

// Delete a product
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM cuckoo WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send('Product deleted...');
  });
});

module.exports = router;
