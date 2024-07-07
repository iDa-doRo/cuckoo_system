const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mysql = require('mysql');

const pool = mysql.createPool ({
  connectionLimit: 10, 
  host: 'localhost',
  user: 'root',
  password: 'mateus88',
  database: 'cuckoo_db',
  port: 3306
});

// endpoint for login logic
router.post('/', (req,res)=>{
    const { username, password } = req.body;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('error while DB connection', err);
            return res.status(500).json({ success: false, message: 'Internal server error'});
        }

        const query = 'SELECT * FROM restorer WHERE restorerName = ?';
        connection.query(query, [username], (err, results) => {
            if (err) {
            console.error('error while DB query:', err);
            connection.release();
            return res.status(500).json({succcess: false, message: 'Internal server error'});
        }
        if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.restorerPasswordHash, (err, isValidPassword) => {
                connection.release();
                if (err) {
                    console.error('Error whuile validating password:', err);
                    return res.status(500).json({succcess: false, message: 'Internal server error'});
                }
                if (isValidPassword) {
                    return res.json({ success: true });
                } else {
                    return res.json({succcess: false, message: 'No valid credentials'});
                }
            });
        } else {
            connection.release();
            return res.json({succcess: false, message: 'User not found'});
        }
        });
    });
});

    
module.exports = router;