const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.controller');

router.post('/', addressController.create);

module.exports = router;