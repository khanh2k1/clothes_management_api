
const asyncMiddleware = require('../middlewares/async.middleware');
const sequelize = require('../database/mysql/connect');
const Category = require('../models/Category.model');
const { ErrorResponse } = require('../responses/error.Response');

const categoryController = {

    create: asyncMiddleware(async (req, res) => {
        const { name, slug } = req.body
        console.log(name, slug)
        const newCategory = await Category.create(
            { name, slug }
        ).then(() => {
                console.log('new category:', newCategory)
                // await t.commit();
                res.status(201).json({
                    success: true,
                })
            }).catch((err) => {
                const { errors } = err
                const { message, path} = errors[0]

                throw new ErrorResponse(400, {message, path})
            })
    }),

    getAll: asyncMiddleware(async (req, res) => {
        const categories = await Category.findAll()
        res.status(200).json({
            success: true,
            data: categories
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

