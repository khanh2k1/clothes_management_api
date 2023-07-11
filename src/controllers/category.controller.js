
const asyncMiddleware = require('../middlewares/async.middleware');
const sequelize = require('../database/mysql/connect');
const Category = require('../models/Category.model');
const { ErrorResponse } = require('../responses/error.Response');

const categoryController = {

    create: asyncMiddleware(async (req, res) => {
        const { name, slug } = req.body
        await Category.create({ name, slug })
            .then((data) => {
                console.log('new category:', data)
                res.status(201).json({
                    success: true,
                })
            })
            .catch((err) => {
                const { errors } = err
                const { message } = errors[0]
                if (!errors[0]) {
                    throw new ErrorResponse(400, 'Cant create category')
                }
                throw new ErrorResponse(400, message)
            })
    }),

    getAll: asyncMiddleware(async (req, res) => {
        const categories = await Category.findAll()
        res.status(200).json({
            success: true,
            categories
        })
    }),

    update: asyncMiddleware(async (req, res) => {
        const { id } = req.params
        const { name, slug } = req.body
        const isUpdatedCategory = await Category.update({ name, slug }, { where: { id } })
        if (!isUpdatedCategory) throw new ErrorResponse(400, 'Category not updated')
        res.status(200).json({
            success: true,
        })
    }),

    delete: asyncMiddleware(async (req, res) => {
        const { id } = req.params
        // const isDeletedCategory = await Category.destroy({ where: { id } })

        const isRestoredCategory = await Category.restore({ where: { id } })

        if (!isRestoredCategory) throw new ErrorResponse(400, 'Category not deleted')
        res.status(200).json({
            success: true,
        })
    }),

}

module.exports = categoryController

