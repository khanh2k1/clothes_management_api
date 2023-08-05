const joi = require('joi');

const CouponSchema = {
    create: joi.object().keys({
        name: joi.string().required(),
        code: joi.string().required(),
        type: joi.string().valid('percent', 'money').required(),
        discount: joi.number().required(),
        start_date: joi.date().required(),
        end_date: joi.date().required(),
    }), 

    update: joi.object().keys({
        name: joi.string().required(),
        code: joi.string().required(),
        type: joi.string().valid('percent', 'money').required(),
        discount: joi.number().required(),
        start_date: joi.date().required(),
        end_date: joi.date().required(),
    }),
}

module.exports = CouponSchema

