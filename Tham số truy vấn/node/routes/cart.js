const path = require('path');

const express = require('express');

const cartController = require('../controllers/cart');

const router = express.Router();

router.post('/cart', cartController.postAddCart);
router.get('/cart', cartController.getCart);

module.exports = router;
