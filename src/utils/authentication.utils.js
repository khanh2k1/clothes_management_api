
const jwt = require('jsonwebtoken');
const {env_jwt} = require('../configs/env');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const authUtils = {
    generateToken: (id, email) => {
        // create jwt
        const token = jwt.sign({ id, email }, 
            env_jwt.JWT_SECRET_KEY, 
            { expiresIn: env_jwt.JWT_EXPIRES_IN })

        return token
    },

    verifyToken: (token) => {
        const decoded = jwt.verify(token, env.jwt.JWT_SECRET_KEY);
        return decoded
    }, 

    hashPassword: (password) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash
    },

    comparePassword: (passwordInClient, passwordInDB) => {
        // khong can phai hash passwordInCLient vi bcrypt.compareSync da lam viec nay
        const isMatch = bcrypt.compareSync(passwordInClient, passwordInDB);
        return isMatch
    },

    generateOtp: () => {

        const otp = Math.floor(Math.random() * 1000000);
        return otp
    }, 

    randomBytes: () => {
        const randomBytes = crypto.randomBytes(32).toString('hex');
        return randomBytes
    }
}

module.exports = authUtils