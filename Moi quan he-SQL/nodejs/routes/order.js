const express = require('express');
const orderController = require('../controllers/order')

const router = express.Router();

router.post('/order', orderController.checkoutCart);


// router.post('/order', cartController.addProductToCart)
// router.delete('/', cartController.deleteProductInCart)
module.exports = router;