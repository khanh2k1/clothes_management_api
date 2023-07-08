
const authenController = require('../controllers/authen.controller');

const express = require('express');
const router = express.Router();

router.post('/sign-up', authenController.signUp);
router.post('/sign-in', authenController.signIn);

module.exports = router;