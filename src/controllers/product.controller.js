const Product = require('../models/Product.model');
const asyncMiddleware = require('../middlewares/async.middleware');
const { ErrorResponse } = require('../responses/error.Response')

const productController = {
    create: asyncMiddleware(async (req, res) => {
        const { name, price, description, categoryId, amount } = req.body

        await Product.create(
            { name, price, description, categoryId, amount },
        ).then((result) => {
            console.log('new product:', result)
            res.status(201).json({
                success: true,
            })
        }).catch((err) => {
            const { errors } = err
            if (!errors) throw new ErrorResponse(400, 'Product not created')
            const { message } = errors[0]
            throw new ErrorResponse(400, message)
        })
    }),

    getProductById: asyncMiddleware(async (req, res) => {
        const { id } = req.params
        const product = await Product.findOne({ where: { id } })
        if (!product) throw new ErrorResponse(404, 'Product not found')
        res.status(200).json({
            success: true,
            data: product
        })
    }),

    getAll: asyncMiddleware(async (req, res) => {
        const products = await Product.findAll()
        res.status(200).json({
            success: true,
            data: products
        })
    }),

    update: asyncMiddleware(async (req, res) => {
        const { id } = req.params
        const { price, description, categoryId, amount } = req.body
        await Product.update({ price, description, categoryId, amount }, { where: { id } })
            .then(() => {
                res.status(200).json({
                    success: true,
                })
            })
            .catch((err) => {
                const { errors } = err

                if (!errors) {
                    throw new ErrorResponse(400, 'Cant create category')
                }
                const { message } = errors[0]
                throw new ErrorResponse(400, message)
            })
    }),

    delete: asyncMiddleware(async (req, res) => {
        const { id } = req.params
        const isDeletedProduct = await Product.destroy({ where: { id } })
        if (!isDeletedProduct) throw new ErrorResponse(400, 'Product not deleted')
        res.status(200).json({
            success: true,
        })
    })
}

module.exports = productController  