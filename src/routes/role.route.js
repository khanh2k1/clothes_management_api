const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');

router.post('/makeOwner', roleController.makeOwner);

module.exports = router;