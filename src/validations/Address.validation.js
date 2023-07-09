const joi = require('joi');

const addressSchema = {
    create: joi.object({
        id: joi.number().integer().required(),
        city: joi.string().required(),
        province: joi.string().required(),
        address: joi.string().required(),
        zip: joi.string().required(),

    })
}


module.exports = addressSchema