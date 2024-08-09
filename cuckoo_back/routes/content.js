const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const upload = multer();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mateus88',
  database: 'cuckoo_db',
  port: 3306
});

connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Add a new product
router.post('/add', upload.single('cuckooPic'),(req, res) => {
const product = {
  cuckooName: req.body.cuckooName,
  cuckooDesc: req.body.cuckooDesc,
  cuckooStatus: req.body.cuckooStatus,
  cuckooPrice: req.body.cuckooPrice,
  restorer_id: Array.isArray(req.body.restorer_id) ? req.body.restorer_id[0]: req.body.restorer_id,
  cuckooPic: req.file ? req.file.buffer: null
};
const sql = 'INSERT INTO cuckoo (cuckooName, cuckooPrice, cuckooDesc, cuckooPic, cuckooStatus, restorer_id) VALUES (?, ?, ?, ?, ?, ?)';

console.log('executing SQL:', sql, product);

connection.query(sql, [product.cuckooName, product.cuckooPrice, product.cuckooDesc, product.cuckooPic, product.cuckooStatus, product.restorer_id], (err, result) => {
  if (err) {
    console.error('Error inserting product', err);
    res.status(500).send('Error inserting product');
    return;
  }
  res.send('Product added');
});
});



// Update a product
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const sql = 'UPDATE cuckoo SET ? WHERE id = ?';
  connection.query(sql, [updatedProduct, id], (err, result) => {
    if (err) throw err;
    res.send('Product updated...');
  });
});

// Delete a product
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM cuckoo WHERE id = ?';
  connection.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send('Product deleted...');
  });
});

// get all products
router.get('/getAll', (req, res) => {
  const sql = 'SELECT * FROM cuckoo';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;
