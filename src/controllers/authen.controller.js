const User = require('../models/User.model');
const asyncMiddleware = require('../middlewares/async.middleware')
const authUtils = require('../utils/authentication.utils')
const { ErrorResponse } = require('../responses/error.Response');
const Sequelize = require('../database/mysql/connect');
const MailService = require('../services/mail.service')
const RegisterOtpModel = require('../models/mongo/RegisterOtp.model')
const authenticationController = {

  signUp: asyncMiddleware(async (req, res) => {

    const t = await Sequelize.transaction()

    const { username, password, email, phone } = req.body
    console.log('req.body of signUp ')
    // check username and email exist
    try {
      const isExistedUser = await User.findOne({
        where:
        {
          username
        },
        transaction: t
      })

      if (isExistedUser) {
        console.log('isExistedUser: ', isExistedUser['dataValues'])
        throw new ErrorResponse(401, 'Unauthorized')
      }

      // create a new user

      const otp = authUtils.generateOtp().toString()
      const hashPassword = authUtils.hashPassword(password)
      await User.create({ username, password: hashPassword, email, phone, role: 'customer' }, { transaction: t })
        .then(() => {

          MailService.sendMail(
            {
              to: 'n19dccn089@student.ptithcm.edu.vn',
              subject: 'Sign up successfully',
              text: 'You have signed up successfully',
              html: `<h1>Your otp is ${otp}</h1>`
            }
          )
        }).then(() => {
          // const registerOtp = new RegisterOtpModel({ email, otp })
          RegisterOtpModel.create({ email, otp })
        })
      await t.commit()

      res.status(201).json({
        success: true,
      })

    } catch (error) {
      console.log('==> error: ', error)
      await t.rollback()
      throw new ErrorResponse(401, 'Unauthorized')
    }
  }),

  verifyUser: asyncMiddleware(async (req, res) => {
    let { email, otp } = req.body
    const isVerified = await RegisterOtpModel.findOne({ email, otp })
      
    if (!isVerified) {
      throw new ErrorResponse(401, 'Unauthorized')
    }
    console.log(isVerified)

    // // cach 1
    // await User.update({ isVerified: true }, { where: { email } })
    // // sau khi da verify thi xoa otp
    // await RegisterOtpModel.deleteOne({ email, otp }).then(() => {
    //   console.log('==> delete otp success')
    // }).catch((err) => {
    //   console.log('==> delete otp failed:', err)
    //   throw new ErrorResponse(500, 'Internal Server Error')
    // })

    // cach 2 
    const isVerifiedUser = RegisterOtpModel.updateOne({ where: { email } })
    const deleteOtp = RegisterOtpModel.deleteOne({ where: { email } })

    await Promise.all([isVerifiedUser, deleteOtp]).then(() => {
      console.log('==> User is verified and delete otp success')
    }).catch((err) => {
      console.log('==> User is verified but delete otp failed:', err)
      throw new ErrorResponse(500, 'Internal Server Error')
    })

    res.status(200).json({
      success: true,
    })
  }),

  signIn: asyncMiddleware(async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username } })
    if (!user) {
      throw new ErrorResponse(401, 'Unauthorized')
    }

    const isMatch = authUtils.comparePassword(password, user.password)
    if (!isMatch) {
      throw new ErrorResponse(401, 'Unauthorized')
    }
    const { id } = user
    console.log('==> id:', id, username)
    const token = authUtils.generateToken(id, username)

    res.status(200).json({
      success: true,
      token
    })
  })
}

module.exports = authenticationController