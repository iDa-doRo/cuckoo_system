const express = require('express');
const axios = require('axios');

const router = express.Router();

// endpoint for login logic
router.post('/', async (req, res) => {
    try {
      const response = await axios.post('http://localhost:3001/login', req.body);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error prcesing login request', error);
      res.status(500).json({ succcess: false, message: 'Internal server Error'});
    }
  });
module.exports = router;