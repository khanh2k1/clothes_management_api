const User = require('../models/User.model')
const { ErrorResponse } = require('../responses/error.Response')

const authorize = (...roles) => {
    return async (req, res, next) => {
        const { id } = req.user
        console.log('==> id: ', id)
        await User.findByPk(id, {
            attributes: ['role']
        }).then((user) => {

            if (!user || !roles.includes(user.role)) {
                console.log('==> Unforbidden')
                return res.status(403).json({
                    success: false,
                    message: 'Unforbidden'
                }) 
            }

            console.log('==> user role = ', user.role)
            req.user.role = user.role
            next()
        }).catch(() => {
            throw new ErrorResponse(403, 'Unforbidden')
        })        
    }
}

module.exports = authorize

