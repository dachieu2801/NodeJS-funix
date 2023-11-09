const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/edit/:_id', productsController.getToEdit);
router.put('/edit', productsController.editProduct);
router.get('/', productsController.getProducts);

module.exports = router;
