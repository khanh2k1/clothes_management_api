const joi = require('joi');


const username = joi.string().length(6).required()
const password = joi.string().min(6).required()
const email = joi.string().email().required()

const authSchema = {
    signUp: joi.object().keys({
        username: username,
        email: email,
        avatar: joi.string(),
        phone: joi.string().min(10).max(13),
        password: password,
    }), 

    signIn: joi.object().keys({
        username: username,
        password: password
    }),

    isVerify: joi.object().keys({
        email: email,
        otp: joi.string().length(6).required()
    }),

    changePassword: joi.object().keys({
        oldPassword: password,
        newPassword: password
    }), 

    forgotPassword: joi.object().keys({
        email: email
    }), 

    resetPassword: joi.object().keys({
        email: email,
        token: joi.string().required(),
        newPassword: password
    })
}

module.exports = authSchema