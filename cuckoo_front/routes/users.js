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
const createUser = (userName, userSurname, userEmail, callback) => {
    const userQuery = 'SELECT id FROM users WHERE userEmail = ?';
    db.query(userQuery, [userEmail], (err, result) => {
        if (err) return callback(err);
        if (result.length > 0) {
            const userId = result[0].id;
            const updateUserQuery = 'UPDATE users SET userName = ?, userSurname = ? WHERE id = ?';
            db.query(updateUserQuery, [userName, userSurname, userId], (err, result) => {
                if (err) return callback(err);
                callback(null, userId);
            });

        } else {
            const insertUserQuery = 'INSERT INTO users (userName, userSurname, userEmail) VALUES (?, ?, ?)';
            db.query(insertUserQuery, [userName, userSurname, userEmail], (err, result) => {
                if (err) return callback(err);
                callback(null, result.insertId);
            });
        }
    });
};
module.exports = {db, createUser};