const express = require('express');
const productController = require('../controllers/product')
const router = express.Router();

router.get('/products', productController.getAllProduct)

router.get('/admin/products', productController.getAllProduct)
router.get('/admin/product/:id', productController.getProductById)
router.post('/admin/product', productController.createProduct)
router.put('/admin/product', productController.updateProductById)
router.delete('/admin/product/:id', productController.deleteProduct)


module.exports = router;