const express = require('express');
const { db, createUser } = require('./users');
const router = express.Router();
// Multer required for file storage
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// FR2.2 The form shall allow users to add images to support their request. 
router.post('/submit-request', upload.array('attachments'), (req, res) => {
  const {name, surname, email, subject, message} = req.body;
  createUser(name, surname, email, (err, userId) => {
    if(err) {
      return res.status(500).json({success:false, message: 'Database error'});
    }
    const attachments = req.files.length > 0 ? req.files[0].buffer : null;
    const insertRequest = 'INSERT INTO request (reqSubject, reqMessage, reqPics, userId) VALUES (?, ?, ?, ?)';
    /* FR2.1 Request form shall allow users to input their name, email, 
       description of the restoration needed, and any specific requirements.  */
    db.query(insertRequest, [subject, message, attachments, userId], (err, result) => {
      if(err) {
        return res.status(500).json({success:false, message: 'database error'});
      }
      res.json({success: true, requestID: result.insertId});
    }); 
  });
});
module.exports = router;
