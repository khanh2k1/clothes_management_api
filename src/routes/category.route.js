const express = require('express');
const router = express.Router();
const CategorySchema = require('../validations/Category.validation');
const validator = require('../middlewares/validator.middleware');
const categoryController = require('../controllers/category.controller');
const authorize = require('../middlewares/authorize.middleware');
const jwtAuth = require('../middlewares/jwtAuth');

router.get('/', categoryController.getAll);
router.post('/', jwtAuth, authorize('owner'), validator(CategorySchema.create, 'body'), categoryController.create);
router.patch('/:id', jwtAuth, categoryController.update);
router.delete('/:id', jwtAuth, categoryController.delete);

module.exports = router;