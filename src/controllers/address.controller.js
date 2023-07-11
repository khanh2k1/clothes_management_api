const asyncMiddleware = require('../middlewares/async.middleware');
const Address = require('../models/Address.model');
const { ErrorResponse } = require('../responses/error.Response')

const addressController = {

    getAll: asyncMiddleware(async (req, res) => {
        
        const address = await Address.findAll({
            include: {
                model: User,
                attributes: ['id', 'name', 'email', 'phone']
            }
        })
        res.status(200).json({
            success: true,
            address
        })
    }),

    getAddressByUserId: asyncMiddleware(async (req, res) => {
        const { id: userId } = req.user
        const address = await Address.findAll({ where: { userId } })
        res.status(200).json({
            success: true,
            address
        })
    }),


    create: asyncMiddleware(async (req, res) => {
        const { id: userId } = req.user
        console.log('=> userId:', userId)
        const { city, province, address, zip } = req.body
        // check duplicate address of user
        //
        await Address.create({ city, province, address, zip, userId })
            .then((data) => {
                res.status(201).json({
                    success: true,
                })
            }).catch((err) => {
                console.log('err: ', err)
                throw new ErrorResponse(400, err.message)
            })
    }),

    update: asyncMiddleware(async (req, res) => {
        // id of user
        const { id: userId } = req.user
        // id of address
        const { city, province, address, zip } = req.body

        // check right of address that user created
        const isExistedAddress = await Address.findOne({ where: { userId } })

        if (!isExistedAddress) throw new ErrorResponse(400, 'Address not found')

        const isUpdatedAddress = await Address.update({ city, province, address, zip }, { where: { id, userId } })

        if (!isUpdatedAddress) throw new ErrorResponse(400, 'Address not updated')

        res.status(200).json({
            success: true,
        })
    }),
}



module.exports = addressController