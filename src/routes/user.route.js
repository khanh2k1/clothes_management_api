const userController = require('../controllers/user.controller')

const express = require('express')
const router = express.Router()



router.get('/profile', userController.getProfile)
router.patch('/profile/:id', userController.updateProfile)

module.exports = router 