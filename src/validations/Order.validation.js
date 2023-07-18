const joi = require('joi')
const Status = require('../constant/Status')

const statusSlug = Status.map(item => item.slug)

const orderSchema = {
    create: joi.object().keys({
        note: joi.string().allow(null, ''),
        products: joi.array().items(joi.object().keys({
            productId: joi.number().required(),
            quantity: joi.number().required()
        }))
    }),

    updateStatus: joi.object().keys({
        status: joi.string().valid(...statusSlug).required()
    }),

    cancelOrder: joi.object().keys({
        cancelledReason: joi.string().required(),
    })
}


module.exports = orderSchema