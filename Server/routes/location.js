const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location');

router.get('/:address',locationController.suggestAddress)
router.post('/distance',locationController.calculateDistance)

module.exports = router;
