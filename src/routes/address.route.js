const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.controller');
const authorize = require('../middlewares/authorize.middleware');


router.post('/', authorize('customer', 'owner'), addressController.create);
router.patch('/', authorize('customer', 'owner'), addressController.update);
router.get('/', authorize('owner'), addressController.getAll);
router.get('/:id', authorize('customer', 'owner') ,addressController.getAddressByUserId);
module.exports = router;