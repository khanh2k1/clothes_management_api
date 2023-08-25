const rateLimit = require("express-rate-limit")


const limiter = ({minute=1, max}) => {
    return rateLimit({
        windowMs: minute*60*1000,
        max,
        message: `Too many request from this IP, please try again after ${minute} minute`,
        handler: (req, res, next, options) => {
            res.status(options.statusCode).json({
                success: false,
                message: options.message
            })
        }
    })
}

module.exports = limiter