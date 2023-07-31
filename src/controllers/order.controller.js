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

            console.log('==> created new order ')

            // cach 1
            const productIds = products.map((product) => product.productId)
            const productQuantites = products.map((product) =>  product.quantity)
            console.log('==> productIds: ', productIds, ' productQuantites: ', productQuantites)
            
            productIds.forEach(async (productId, index) => {
                await newOrder.addProduct(productId, {
                    through: {quantity: productQuantites[index]}
                })
            })

            // // cach 2  
            // // insert vao bang order_product
            // // lay ids tu products
            // const prods = products.map((product) => {

            //     return {
            //         orderId: newOrder.id,
            //         productId: product.productId,
            //         quantity: product.quantity

            //     }
            // })
            // await OrderProduct.bulkCreate(prods, { transaction: t })

            await t.commit()

            res.status(201).json({
                success: true,
            })

        } catch (error) {
            await t.rollback()
            console.log(error)
            errorUtils('ERROR')

        }
    }),

    getAll: asyncMiddleware(async (req, res) => {
        const { id: userId } = req.user
        let orders = []
        if (req.user.role === 'customer') {
            orders = await Order.findAll({
                where: { userId },
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

    updateStatusOrder: asyncMiddleware(async (req, res) => {
        const { id } = req.params

        const { status } = req.body

        console.log('==> status: ', status)

        const order = await Order.findByPk(id)
        if (!order) {
            throw new ErrorResponse(404, 'Order not found')
        }
        await order.update({ status }, { where: { id } })

        console.log('==> order: ', order.dataValues)

        res.status(200).json({
            success: true,
            status
        })
    }),

    cancelOrder: asyncMiddleware(async (req, res) => {
        const { id } = req.params
        const role = req.user.role
        const { id: userId } = req.user
        const { cancelledReason } = req.body
        // get order
        const order = await Order.findByPk(id)
        if (!order) {
            console.log('==> order not found')
            throw new ErrorResponse(404, 'Order not found')
        }
        console.log('==> order:', order.dataValues.status)
        // check status 
        if (!['pending', 'approved'].includes(order.dataValues.status)) {
            throw new ErrorResponse(403, 'Forbidden')
        }
        if (role === 'customer' && order.status !== 'pending') {
            throw new ErrorResponse(403, 'U cant cancel this order')
        }
        if (role === 'customer' && order.orderedUserId !== userId) {
            throw new ErrorResponse(403, 'U are not allow to cancel this order')
        }
        await order.update({
            status: 'cancelled',
            cancelled_at: Date.now(),
            cancelledUserId: userId,
            cancelledReason
        })

        res.json({
            success: true,
            message: 'cancelled delivery'
        })
    }),

    successfulDelivery: asyncMiddleware(async (req, res) => {
        const { id } = req.params

        // update status order
        const order = await Order.update({ status: 'Done', received_at: Date.now() }, {
            where: {
                id
            }
        })
        if (!order) {
            throw new ErrorResponse(500, 'Order not found')
        }
        res.json({
            success: true,
            message: 'Successful delivery'
        })
    }),

    deleteOrder: asyncMiddleware(async (req, res) => {
        const { id } = req.params
        const order = await Order.findByPk(id)
        if (!order) {
            throw new ErrorResponse(404, 'Order not found')
        }
        if (!['pending', 'approved', 'done'].includes(order.dataValues.status)) throw new ErrorResponse(403, 'Forbidden')

        // // cach 1
        // await order.destroy({ where: { id }, cascade: true })

        // // cach 2
        // await OrderProduct.destroy({ where: { orderId: id } })
        // await order.destroy({ where: { id } })

        // cach 3
        // Xóa liên kết giữa Order và Product thông qua ProductOrder
        await order.setProducts([]); // Ghi đè các sản phẩm liên kết trong mảng rỗng

        res.json({
            success: true,
            message: 'Delete order successfully'
        })
    })
}

module.exports = orderController