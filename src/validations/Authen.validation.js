const joi = require('joi');


const username = joi.string().length(6).required()
const password = joi.string().min(6).required()

const authSchema = {
    signUp: joi.object().keys({
        username: username,
        email: joi.string().email().required(),
        avatar: joi.string(),
        phone: joi.string().min(10).max(13),
        password: password,
    }), 

    signIn: joi.object().keys({
        username: username,
        password: password
    }),

    isVerify: joi.object().keys({
        email: joi.string().email().required(),
        otp: joi.string().length(6).required()
    })
}

module.exports = authSchema