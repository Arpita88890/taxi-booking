const express = require('express');
const router = express.Router();
const taxiController = require('../controllers/taxiController');
const authController = require('../controllers/authController');

// Protect routes using JWT middleware
router.post('/book', authController.protect, taxiController.createBooking);
router.get('/history', authController.protect, taxiController.getBookingHistory);

module.exports = router;
