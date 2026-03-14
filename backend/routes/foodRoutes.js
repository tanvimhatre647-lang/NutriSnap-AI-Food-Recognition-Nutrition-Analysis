const express = require('express');
const router = express.Router();
const { analyzeFood, getScanHistory } = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Route for analyzing food image
// Expects 'file' field in multipart/form-data
router.post('/analyze', protect, upload.single('file'), analyzeFood);

// Route to get scan history
router.get('/history', protect, getScanHistory);

module.exports = router;
