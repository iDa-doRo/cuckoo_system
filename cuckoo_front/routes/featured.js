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


// retrieve only restored products
router.get('/', (req,res) => {
  console.log('Received request for restored products');
  const sql = "SELECT cuckooName, cuckooPrice, cuckooPic, cuckooStatus FROM cuckoo WHERE cuckooStatus = 'Restored'";
  console.log('Executing sql query', sql);

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error while fetching restored products', err);
      res.status(500).send('server error');
      return;
    }
    results.forEach((result) => {
      if (result.cuckooPic) {
        result.cuckooPic = `data:image/jpeg;base64,${result.cuckooPic.toString('base64')}`;
      }
    });
    console.log('Raw query resutls:', results);
    res.json(results);
  });
});

router.get('/test', (req,res) => {
  console.log('test route');
  res.send('test route working');
});

module.exports = router;