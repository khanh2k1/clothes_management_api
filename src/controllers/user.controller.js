const User = require('../models/User.model');
const asyncMiddleware = require('../middlewares/async.middleware');
const Address = require('../models/Address.model');
const authUtils = require('../utils/authentication.utils');
const userController = {

    getProfile: asyncMiddleware(async (req, res) => {
        const { id } = req.user
        const user = await User.findOne({
            where: {
                id
            },
            include: {
                model: Address,
                attributes: ['city', 'province', 'address', 'zip']
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        if (!user) throw new ErrorResponse(400, 'User not found')

        const { password, ...rest } = user.dataValues
        res.status(200).json({
            success: true,
            data: rest
        })
    }),

    updateProfile: asyncMiddleware(async (req, res) => {
        const { id } = req.user
        const user = await User.findOne({
            where: { id }
        })

        if (!user) throw new ErrorResponse(404, 'User not found')

        // update user
        const { phone, email, avatar } = req.body
        const isUpdatedUser = await User.update({ phone, email, avatar}, { where: { id } })

        if (!isUpdatedUser) throw new ErrorResponse(400, 'User not updated')

        res.status(200).json({
            success: true,
        })
    }),

    delete: async (req, res) => {
    },
}

module.exports = userController