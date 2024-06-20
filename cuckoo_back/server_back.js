// needed dependencies to run app
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const contentRoutes = require('./routes/content');
const requestRoutes = require('./routes/requests');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Admin routers
app.use('/content', contentRoutes);
app.use('/requests', requestRoutes);

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/content', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'content.html'));
});

app.get('/requests', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'adminReq.html'));
});
app.get('/requestDetail', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'adminReqDetail.html'));
});
app.listen(port, () => {
  console.log(`Admin app listening at http://localhost:${port}`);
});
