const joi = require('joi');

const ProductSchema = {
    create: joi.object().keys({
        name: joi.string().required(),
        price: joi.number().required(),
        description: joi.string().required(),
        categoryId: joi.number().required(),
        amount: joi.number().required(),
    })
}

module.exports = ProductSchema