const joi = require('joi');

const ProductSchema = {
    create: joi.object().keys({
        name: joi.string().required(),
        price: joi.number().required(),
        description: joi.string().required(),
        categoryId: joi.number().required(),
        amount: joi.number().required(),
    }), 

    update: joi.object().keys({
        price: joi.number().required(),
        description: joi.string().required(),
        categoryId: joi.number().required(),
        amount: joi.number().required().min(0),
    }), 

}

module.exports = ProductSchema