const joi = require('joi');

const addressSchema = {
    create: joi.object({
        city: joi.string().required(),
        province: joi.string().required(),
        address: joi.string().required(),
        zip: joi.string().required(),
        
    }), 

    update: joi.object().keys({
        city: joi.string().required(),
        province: joi.string().required(),
        address: joi.string().required(),
        zip: joi.string().required(),
    })
}


module.exports = addressSchema