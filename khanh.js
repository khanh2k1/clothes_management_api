const jwt = require('jsonwebtoken');
const env = require('./src/configs/env');

const authUtils = {
    generateToken: (id, email) => {
        // create jwt
        const token = jwt.sign({ id, email }, 
            env.jwt.JWT_SECRET_KEY, 
            { expiresIn: env.jwt.JWT_EXPIRES_IN })

        return token
    }
}

console.log(authUtils.generateToken(1, 'dangkhanh2k1@gmail.com'))