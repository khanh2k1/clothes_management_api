
const authenController = require('../controllers/authen.controller');
const AuthSchema = require('../validations/Authen.validation');
const validator = require('../middlewares/validator.middleware')
const express = require('express');
const router = express.Router();

router.post('/sign-up', validator(AuthSchema.signUp, 'body') ,authenController.signUp);
router.post('/sign-in', validator(AuthSchema.signIn, 'body'), authenController.signIn);

module.exports = router;