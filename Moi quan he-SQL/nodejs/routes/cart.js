const express = require('express');
const cartController = require('../controllers/cart')

const router = express.Router();

router.get('/cart', cartController.getProductInCart)

router.post('/cart', cartController.addProductToCart)
router.delete('/cart/:proId', cartController.deleteProductInCart)
module.exports = router;