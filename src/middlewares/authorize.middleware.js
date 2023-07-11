const User = require('../models/User.model')
const { ErrorResponse } = require('../responses/error.Response')

const authorize = (...roles) => {
    return async (req, res, next) => {
        const { id } = req.user
        console.log('==> id: ', id)
        const user = await User.findByPk(id)
        // check user exist
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'not found'
            })
        }
        // check role of user
        console.log('=> role of user: ', user.role)
        console.log('=> roles: ', roles)
        if (!roles.includes(user.role)) {
            console.log('==> Unforbidden')
            return res.status(403).json({
                success: false,
                message: 'Unforbidden'
            }) 
        }
        next()
    }
}

module.exports = authorize

