
const express = require('express');

const ordersController = require('../controllers/order');

const router = express.Router();

router.post('/create', ordersController.postOrder);
router.post('/', ordersController.getOrder);

module.exports = router;
