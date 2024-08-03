const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const catalogRoutes = require('./routes/catalog');
const statusRoutes = require('./routes/status');
const requestRoutes = require('./routes/request');
const loginRoutes = require('./routes/login');
const featureRoutes = require('./routes/featured');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/res', express.static(path.join(__dirname, 'res')));

app.use((req, res, next) => {
  console.log(`Received request for ${req.method} ${req.url}`);
  next();
})

//routes
app.use('/catalog', catalogRoutes);
app.use('/status', statusRoutes);
app.use('/request', requestRoutes);
app.use('/login', loginRoutes);

app.use('/featured', (req, res, next) => {
  console.log('Received request for /featured');
  next();
}, featureRoutes);

// Serve HTML files middleware
app.get('/', (req, res) => {
  console.log('serving home.html');
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});


app.get('/catalog', (req, res) => {
  console.log('serving catalog.html');
  res.sendFile(path.join(__dirname, 'public', 'catalog.html'));
});

app.get('/request', (req, res) => {
  console.log('serving request.html');
  res.sendFile(path.join(__dirname, 'public', 'service-form.html'));
}); 

app.get('/cuckoo-detail/:id', (req, res) => {
  console.log('serving cuckoo-detail.html');

  res.sendFile(path.join(__dirname, 'public', 'cuckoo-detail.html'));
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
});


app.listen(port, () => {
  console.log(`Public app listening at http://localhost:${port}`);
});