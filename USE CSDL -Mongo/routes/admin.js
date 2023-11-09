const path = require('path');

const express = require('express');
const { check, body } = require('express-validator');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', [
  body('title', 'Title more than 3 degit ')
    .isLength({ min: 3 })
    .trim(),
  body('price')
    .isNumeric()
    .withMessage('Price is a number more than 1')
    .trim(),
  body('description')
    .isLength({ min: 5 })
    .withMessage('Description more than 5 degit')
    .trim(),
],
  adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', [
  body('title', 'Title more than 3 degit ')
    .isLength({ min: 3 })
    .trim(),
  body('price')
    // .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Price is a number more than 1')
    .trim(),
  body('description')
    .isLength({ min: 5 })
    .withMessage('Description more than 5 degit')
    .trim(),
], adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
