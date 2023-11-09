const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);
// router.get('/add-product', productsController.postAddProduct);

module.exports = router;
