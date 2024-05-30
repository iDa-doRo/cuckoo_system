const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const catalogRoutes = require('./routes/catalog');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Catalog routes
app.use('/catalog', catalogRoutes);

// Serve HTML files
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/content', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'content.html'));
});

app.get('/requests', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'adminReq.html'));
});

app.listen(port, () => {
  console.log(`Admin app listening at http://localhost:${port}`);
});
