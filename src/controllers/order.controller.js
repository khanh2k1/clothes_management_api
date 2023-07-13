const Order = require('../models/Order.model')
const sequelize = require('../database/mysql/connect')
const asyncMiddleware = require('../middlewares/async.middleware')
const errorUtils = require('../utils/error.utils')
const OrderProduct = require('../models/OrderProduct.model')
const Product = require('../models/Product.model')
const { ErrorResponse } = require('../responses/error.Response')
const orderController = {

    create: asyncMiddleware(async (req, res) => {
        const t = await sequelize.transaction()
        try {

            const { id: orderedUserId } = req.user
            const { note, products } = req.body
            const newOrder = await Order.create({ orderedUserId, note }, { transaction: t })
            // lay ids tu products
            const prods = products.map((product) => {

                console.log('==> product = ', product)
                return {
                    orderId: newOrder.id,
                    productId: product.productId,
                    quantity: product.quantity

                }
            })
            console.log('prods = ', prods)
            // insert vao bang order_product
            await OrderProduct.bulkCreate(prods, { transaction: t })

            await t.commit()

            res.status(201).json({
                success: true,
            })

        } catch (error) {
            await t.rollback()
            errorUtils(error)

        }
    }),

    updateStatusOrder: asyncMiddleware(async (req, res) => {

    }),

    getAll: asyncMiddleware(async (req, res) => {
        const { id: orderedUserId } = req.user

        let orders = []

        if (req.user.role === 'customer') {
            orders = await Order.findAll({
                where: {
                    orderedUserId
                },
                include: [{
                    model: Product,
                    through: {
                        as: 'order_product',
                    }
                }]
            })
        }

        if (req.user.role === 'owner') {
            orders = await Order.findAll({
                include: {
                    model: Product,
                    through: {
                        as: 'order_product',
                    }
                }
            })
        }


        res.json({
            success: true,
            data: orders
        })
    }),

    getOrderDetail: asyncMiddleware(async (req, res) => {
        const { id: orderedUserId } = req.user
        const { id } = req.params

        const orderDetail = await Order.findOne({
            where: {
                id, orderedUserId
            },
            include: {
                model: Product,
                through: {
                    as: 'order_product',
                }
            }
        })

        if (!orderDetail) {
            throw new ErrorResponse(404, 'Order not found')
        }

        res.json({
            success: true,
            data: orderDetail
        })

    }),

    cancelOrder: asyncMiddleware(async (req, res) => {

    })

}

module.exports = orderController