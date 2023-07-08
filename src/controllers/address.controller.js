const asyncMiddleware = require('../middlewares/async.middleware');
const Address = require('../models/Address.model');
const { ErrorResponse } = require('../responses/error.Response')

const addressController = {

    getAll: async (req, res) => {

    },

    create: asyncMiddleware(async (req, res) => {
        const { id: userId } = req.user
            console.log('=> userId:', userId)
            const { city, province, address, zip } = req.body
            // check duplicate address of user
            //
            await Address.create
                ({ city, province, address, zip, userId:10 }).then((data) => {
                    res.status(201).json({
                        success: true,
                    })
                }).catch((err) => {
                    console.log('err: ', err)
                    throw new ErrorResponse(400, err.message)
                })
    }),

    update: async (req, res) => {
    },

    delete: async (req, res) => {

    },
}



module.exports = addressController