const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

router.get('/products', productController.fetchAllProduct);

router.get('/product', productController.getProductById);

module.exports = router;