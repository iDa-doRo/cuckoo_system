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
// function to convert plain text password into hashed password
async function updatePasswords() {
    pool.getConnection((err, connection) =>{
        if (err) {
            console.error('Error tryingo to connect to database:', err);
            return;
        }
        const selectQuery = 'SELECT id, restorerName, restorerPasswordHash FROM restorer';
        connection.query(selectQuery, async (err, results) => {
            if (err) {
                console.error('Error fetching users:', err);
                connection.release();
                return;
            }
          // the alghoritm used for conversion is bcrypt 
            for (const user of results) {
                if (!user.restorerPasswordHash.startsWith('$2a$')) {
                    const hashedPass = await bcrypt.hash(user.restorerPasswordHash, 10);
                    const updateQuery = 'UPDATE restorer SET restorerPasswordHash = ? WHERE id = ?';
                    // associates hashed password to user 
                    connection.query(updateQuery, [hashedPass, user.id], (err) => {
                        if (err) {
                            console.error(`error updating ${user.restorerName} password`, err);
                        } else {
                            console.log(`updated password for user: ${user.restorerName}`);
                        }
                    });
                }
            }
            connection.release();
        });
    });
}
updatePasswords();
