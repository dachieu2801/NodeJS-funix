const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

router.get('/admin/products', productController.fetchAllProduct);

router.get('/admin/product/:id', productController.getProductById);

router.post('/admin/product', productController.createProduct)

router.put('/admin/product', productController.updateProduct);

router.delete('/admin/product/:id', productController.deleteProduct)

module.exports = router;