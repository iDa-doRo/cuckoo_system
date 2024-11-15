const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mateus88',
  database: 'cuckoo_db',
  port: 3306
});
// testing the filtering option when restored items are the only ones to show
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
  // select only items marked as restored
  const sql = "SELECT cuckooName, cuckooPrice, cuckooDesc, cuckooPic, cuckooStatus FROM cuckoo WHERE cuckooStatus = 'Restored'";
  console.log('Executing SQL query:', sql);

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error while fetching restored products', err);
      return;
    }

    console.log('Restored products query results:', results);
  });
});
