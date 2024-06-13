const express = require('express');
const { db, createUser } = require('./users');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');


//storing files with multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/submit-request', upload.array('attachments'), (req, res) => {
  const {name, surname, email, subject, message} = req.body;
  createUser(name, surname, email, (err, userId) => {
    if(err) {
      return res.status(500).json({success:false, message: 'Database error'});
    }
    const attachments = req.files.length > 0 ? req.files[0].buffer : null;
    const insertRequest = 'INSERT INTO request (reqSubject, reqMessage, reqPics, userId) VALUES (?, ?, ?, ?)';
    db.query(insertRequest, [subject, message, attachments, userId], (err, result) => {
      if(err) {
        return res.status(500).json({success:false, message: 'database error'});
      }
      res.json({success: true, requestID: result.insertId});
    }); 
  });
});
module.exports = router;
