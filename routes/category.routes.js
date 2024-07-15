const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// GET categories
router.get('/categories', categoryController.getCategories);

// POST categories
router.post('/categories', categoryController.postCategory);



module.exports = router;