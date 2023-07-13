const validator = require('../middlewares/validator.middleware')
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const orderSchema = require('../validations/Order.validation')

router.post('/', validator(orderSchema.create), orderController.create)
router.get('/:id', orderController.getOrderDetail)
router.get('/', orderController.getAll)

module.exports = router;