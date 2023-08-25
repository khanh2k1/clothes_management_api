const RateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
const { env_mongoDB } = require('../configs/env')


const allowList = ['::1']

const limiterMongo = ({ minute, max = 50 }) => {
    return RateLimit({
        store: new MongoStore({
            uri: `mongodb://${env_mongoDB.DB_HOST}:${env_mongoDB.DB_PORT}/${env_mongoDB.DB_NAME}`,
            // should match windowMs
            expireTimeMs: 15 * 60 * 1000,
            errorHandler: console.error.bind(null, 'rate-limit-mongo')
            // see Configuration section for more options and details
        }),
        // allow list ip can request
        skip: (req, res) => {
            console.log(req.ip)
            console.log(allowList.includes(req.ip))
        },
        windowMs: minute * 60 * 1000,
        max,
        message: `Too many request from this IP, please try again after ${minute} minute`,
        handler: (req, res, next, options) => {
            res.status(options.statusCode).json({
                success: false,
                message: options.message
            })
        }
    })
};

//  apply to all requests
module.exports = limiterMongo