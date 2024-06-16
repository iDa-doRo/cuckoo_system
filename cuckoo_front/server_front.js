const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const catalogRoutes = require('./routes/catalog');
const statusRoutes = require('./routes/status');
const  {db, createUser} = require('./routes/users');
const requestRoutes = require('./routes/request');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/catalog', catalogRoutes);
app.use('/status', statusRoutes);
app.use('/request', requestRoutes);

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/catalog', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'catalog.html'));
});

app.get('/request', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'service-form.html'));
});


app.listen(port, () => {
  console.log(`Public app listening at http://localhost:${port}`);
});