const joi = require('joi');

const CategorySchema = {
    create: joi.object().keys({
        name: joi.string().required(),
        slug: joi.string().required(),
    })
}

module.exports = CategorySchema