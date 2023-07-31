const User = require('../models/User.model');
const asyncMiddleware = require('../middlewares/async.middleware')
const authUtils = require('../utils/authentication.utils')
const { ErrorResponse } = require('../responses/error.Response');
const { Sequelize } = require('../database/mysql/connect');
const authenticationController = {

    signUp: asyncMiddleware(async (req, res) => {
        const { username, password, email, phone } = req.body
        console.log('req.body of signUp ')
        // check username and email exist
        try {
            const isExistedUser = await User.findOne({
                where:
                {
                    [Sequelize.Op.or]: [{ username }, { email }]
                }
            })

            if (isExistedUser) {
                console.log('isExistedUser: ', isExistedUser['dataValues'])
                throw new ErrorResponse(401, 'Unauthorized')
            }

            // create a new user
            const hashPassword = authUtils.hashPassword(password)
            const user = await User.create({ username, password: hashPassword, email, phone, role: 'customer' })

            console.log('new user:', user)
            res.status(201).json({
                success: true,
            })

        } catch (error) {
            console.log('==> error: ', error)
            throw new ErrorResponse(401, 'Unauthorized')
        }


    }),

    signIn: asyncMiddleware(async (req, res) => {
        const { username, password } = req.body
        const user = await User.findOne({ where: { username } })
        if (!user) {
            throw new ErrorResponse(401, 'Unauthorized')
        }
        
        const isMatch = authUtils.comparePassword(password, user.password)
        if (!isMatch) {
            throw new ErrorResponse(401, 'Unauthorized')
        }
        const { id } = user
        console.log('==> id:', id, username)
        const token = authUtils.generateToken(id, username)

        res.status(200).json({
            success: true,
            token
        })
    })
}

module.exports = authenticationController