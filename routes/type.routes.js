const express = require('express');
const router = express.Router();
const typeController = require('../controllers/type.controller');

// GET categories
router.get('/types', typeController.getTypes);

// POST categories
router.post('/types', typeController.postType);


module.exports = router;