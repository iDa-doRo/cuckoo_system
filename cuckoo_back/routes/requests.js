const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const router = express.Router();
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mateus88',
    database: 'cuckoo_db',
    port: 3306
  });
  
  connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });
// get data from database and join users and request table based on userID
  router.get('/', (req,res) =>{
    const query =`SELECT r.id, r.reqDate, r.reqSubject, u.userName, u.userEmail FROM request r JOIN users u ON r.userID =u.id`;
    connection.query(query, (error, results) =>{
      if(error){
        res.status(500).json({ error: error.message });
        return;
      }
      res.json(results);
    });
  });

  // count new requests received in the last 2 days
router.get('/count', (req,res) =>{
  const query = `SELECT COUNT(*) AS requestCount FROM request WHERE reqDate >= DATE_SUB(NOW(), INTERVAL 2 DAY)`;
  connection.query(query, (error, results) =>{
    if(error){
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(results[0]);
  });
});
// get only requests from the last 2 days
router.get('/new', (req,res) =>{
  const query = `SELECT r.id, r.reqDate, r.reqSubject, u.userName, u.userEmail FROM request r JOIN users u ON r.userID = u.id WHERE reqDate >= DATE_SUB(NOW(), INTERVAL 2 DAY)`;
  connection.query(query, (error, results) =>{
    if(error){
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(results);
  });
});
module.exports = router;
