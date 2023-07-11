const express = require('express')
const router = express.Router()
const jwtAuth = require('../middlewares/jwtAuth')
const productController = require('../controllers/product.controller')
const validator = require('../middlewares/validator.middleware')
const ProductSchema = require('../validations/Product.validation')


router.get('/:id', productController.getProductById)
router.post('/', validator(ProductSchema.create, 'body'), jwtAuth, productController.create)

module.exports = router