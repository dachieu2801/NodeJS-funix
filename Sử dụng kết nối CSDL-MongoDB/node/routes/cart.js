const path = require('path');

const express = require('express');

const cartController = require('../controllers/cart');

const router = express.Router();

router.delete('/', cartController.deleteCart);
router.get('/', cartController.getCart);
router.post('/', cartController.postAddCart);

module.exports = router;
