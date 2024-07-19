const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller');

// GET locations
router.get('/locations', locationController.getLocations);

// GET location by id
router.get('/locations/:id', locationController.getLocationById);

// POST location
router.post('/locations', locationController.postLocation);

module.exports = router;