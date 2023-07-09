const joi = require('joi');

const userSchema = {

    updateProfile: joi.object().keys({
        phone: joi.string().required().length(13).min(10).max(13),
        email: joi.string().required(),
        avatar: joi.string().required(),
    })
}

module.exports = userSchema