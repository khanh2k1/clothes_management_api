const validator = require('../middlewares/validator.middleware')
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const orderSchema = require('../validations/Order.validation')
const authorize = require('../middlewares/authorize.middleware')


router.post('/', authorize('customer', 'owner'), validator(orderSchema.create), orderController.create)

router.get('/:id', authorize('customer', 'owner'), orderController.getOrderDetail)

router.get('/', authorize('owner'), orderController.getAll)

router.patch('/:id/update',
    authorize('owner'),
    validator(orderSchema.updateStatus, 'body'),
    orderController.updateStatusOrder)

router.patch('/:id/cancel',
    authorize('customer', 'owner'),
    validator(orderSchema.cancelOrder, 'body'),
    orderController.cancelOrder)

router.patch('/:id/success',
    authorize('customer', 'owner'),
    orderController.successfulDelivery)


router.delete('/:id',
    authorize('owner'),
    orderController.deleteOrder)

module.exports = router;