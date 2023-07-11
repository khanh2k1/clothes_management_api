const express = require('express');
const router = express.Router();
const CategorySchema = require('../validations/Category.validation');
const validator = require('../middlewares/validator.middleware');
const categoryController = require('../controllers/category.controller');
const authorize = require('../middlewares/authorize.middleware');

router.get('/', categoryController.getAll);
router.post('/', authorize('owner'), validator(CategorySchema.create, 'body'), categoryController.create);
router.patch('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

module.exports = router;