const express = require('express');
const router = express.Router();
const { addToCart, updateCart, deleteFromCart } = require('../Controllers/cartController');
const { authenticate } = require('../Middleware/authenticate');

router.post('/cart', authenticate, addToCart);
router.put('/cart', authenticate, updateCart);
router.delete('/cart/:id', authenticate, deleteFromCart);

module.exports = router;
