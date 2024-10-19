const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/', feedbackController.createFeedback);
router.get('/', feedbackController.getAllFeedback);

module.exports = router;
