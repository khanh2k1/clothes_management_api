const express = require('express')
const router = express.Router()
const jwtAuth = require('../middlewares/jwtAuth')
const productController = require('../controllers/product.controller')
const validator = require('../middlewares/validator.middleware')
const ProductSchema = require('../validations/Product.validation')
const authorize = require('../middlewares/authorize.middleware')
const upload = require('../middlewares/upload.middleware')
const uploadMongo = require('../middlewares/mongoUpload.middleware')
router.get('/:id', productController.getProductById)

router.get('/', productController.getAll)

router.post('/',
    jwtAuth,
    authorize('owner'),
    uploadMongo.single('photo'),    
    validator(ProductSchema.create, 'body'),
    productController.create
)

router.patch('/:id',
    jwtAuth,
    authorize('owner'),
    validator(ProductSchema.update, 'body'),
    productController.update)

router.delete('/:id',
    jwtAuth,
    authorize('owner'),
    productController.delete)

module.exports = router