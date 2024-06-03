const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const catalogRoutes = require('./routes/catalog');
const serviceRoutes = require('./routes/service')

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


// Catalog routes
app.use('/catalog', catalogRoutes);
app.use('/service', serviceRoutes);

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/catalog', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'catalog.html'));
});

app.get('/service', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'service.html'));
});

app.listen(port, () => {
  console.log(`Public app listening at http://localhost:${port}`);
});