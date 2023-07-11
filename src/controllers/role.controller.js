
const User = require('../models/User.model');

const asyncMiddleware = require('../middlewares/async.middleware')
const { ErrorResponse } = require('../responses/error.Response')

const roleController = {

    makeOwner: asyncMiddleware(async (req, res) => {
        const { userId } = req.body
        console.log('id of user to make owner: ', userId)
        await User.update({ role: 'owner' }, { where: { id: userId } }).
        then(()=> {
            console.log('==> update role of user success')
            res.status(200).json({
                success: true
            })
        }).catch((err)=> {
            console.log('==> update role of user fail')
            throw new ErrorResponse(400, err.message)
        })
    }),   

    makeSuperAdmin: asyncMiddleware(async (req, res) => {
        const { id: userId } = req.body

        await User.update({ role: 'super_admin' }, { where: { id: userId } }).
        then(()=> {
            console.log('==> update role of user success')
        }).catch((err)=> {
            console.log('==> update role of user fail')
            throw new ErrorResponse(400, err.message)
        })
    }),   
}

module.exports = roleController