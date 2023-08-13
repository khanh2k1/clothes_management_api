
const authenController = require('../controllers/authen.controller');
const AuthSchema = require('../validations/Authen.validation');
const validator = require('../middlewares/validator.middleware')
const express = require('express');
const jwtAuth = require('../middlewares/jwtAuth');
const router = express.Router();

router.post('/sign-up', validator(AuthSchema.signUp, 'body') ,authenController.signUp);
router.post('/sign-in', validator(AuthSchema.signIn, 'body'), authenController.signIn);
router.post('/verify', jwtAuth, validator(AuthSchema.isVerify), authenController.verifyUser)
router.post('/change-password', jwtAuth, validator(AuthSchema.changePassword), authenController.changePassword)
router.post('/forgot-password', validator(AuthSchema.forgotPassword), authenController.forgotPassword)
router.post('/reset-password', validator(AuthSchema.resetPassword), authenController.resetPassword)
module.exports = router;