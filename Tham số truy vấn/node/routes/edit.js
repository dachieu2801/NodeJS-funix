
const express = require('express');

const editController = require('../controllers/edit');

const router = express.Router();

router.put('/edit', editController.putEdit);

module.exports = router;
