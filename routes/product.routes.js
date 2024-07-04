const express = require('express');
const router = express.Router();

// GET products
router.get('/products', (req, res) => {
    res.send('GET products');
});


module.exports = router;