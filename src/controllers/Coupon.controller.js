const asyncMiddleware = require('../middlewares/async.middleware')
const Coupon = require('../models/Coupon.model')
const { ErrorResponse } = require('../responses/error.Response')

const couponController = {
    create: asyncMiddleware(async (req, res) => {
        const { name, code, type, discount, start_date, end_date } = req.body
        await Coupon.create({ name, code, type, discount, start_date, end_date })
            .then((result) => {
                console.log('new coupon:', result)
                res.status(201).json({
                    success: true,
                })
            })
            .catch((err) => {
                const { errors } = err
                const { message } = errors[0]
                if (!errors[0]) {
                    throw new ErrorResponse(400, 'Cant create coupon')
                }
                throw new ErrorResponse(400, message)
            })
    }),

    getCouponById: asyncMiddleware(async (req, res) => {
        const { id } = req.params
        const coupon = await Coupon.findOne({ where: { id } })
        if (!coupon) throw new ErrorResponse(404, 'Coupon not found')
        res.status(200).json({
            success: true,
            data: coupon
        })
    }), 

    getAll: asyncMiddleware(async (req, res) => {
        const coupons = await Coupon.findAll()
        res.status(200).json({
            success: true,
            data: coupons
        })
    }), 

    update: asyncMiddleware(async (req, res) => {
        const { id } = req.params
        const { name, code, type, discount, start_date, end_date } = req.body
        await Coupon.update({ name, code, type, discount, start_date, end_date }, { where: { id } })
        .then(() => {
            res.status(200).json({
                success: true,
            })
        })
        .catch((err) => {
            throw new ErrorResponse(500, err.message)
        })
    }), 

    delete: asyncMiddleware(async (req, res) => {
        const { id } = req.params
        await Coupon.destroy({ where: { id } })
        .then(() => {
            res.status(200).json({
                success: true,
            })
        })
        .catch((err) => {
            throw new ErrorResponse(500, err.message)
        })
    })
}

module.exports = couponController