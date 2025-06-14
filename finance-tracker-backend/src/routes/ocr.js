const express = require('express');
const multer = require('multer');
const path = require('path');
const { extractExpenseFromImage } = require('../controllers/ocrController');

const router = express.Router();

// Storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), extractExpenseFromImage);

module.exports = router;
