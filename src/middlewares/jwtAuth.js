const jwt = require('jsonwebtoken');
const {env_jwt} = require('../configs/env');


const { ErrorResponse } = require('../responses/error.Response')
const asyncMiddleware = require('../middlewares/async.middleware')

const jwtAuth = asyncMiddleware(async (req, res, next) => { 
    const headerToken = req.headers['authorization'];
    if(!headerToken || !headerToken.startsWith('Bearer ')) {
        throw new ErrorResponse(401, 'Unauthorized');
    }
    const token = headerToken.split(' ')[1];

    if(!token) {
        throw new ErrorResponse(422, 'invalid token');
    }

    console.log('=> secret key:', env_jwt.JWT_SECRET_KEY)
    const user = jwt.verify(token, env_jwt.JWT_SECRET_KEY);

    req.user = user

    console.log('=> decoded:', user);
    next()
})

module.exports = jwtAuth;