const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'mateus88',
    database: 'cuckoo_db',
    port: 3306                  // Replace with your actual DB port if different
});

function testQuery() {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error during DB connection test:', err);
        return;
      }
      console.log('Connected to the database');
  
      const query = 'SELECT * FROM restorer WHERE restorerName = ?';
      connection.query(query, ['Antonio'], (err, results) => { // Replace with an actual username
        if (err) {
          console.error('Error during DB test:', err);
          connection.release();
          return;
        }
  
        if (results.length > 0) {
          const user = results[0];
          bcrypt.compare('Capone2024', user.restorerPasswordHash, (err, isValidPassword) => { // Replace with the actual password
            if (err) {
              console.error('Error during password validation:', err);
            } else {
              console.log('Password valid:', isValidPassword);
            }
            connection.release();
          });
        } else {
          console.log('No user found');
          connection.release();
        }
      });
    });
  }
  
  testQuery();