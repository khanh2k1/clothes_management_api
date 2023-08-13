const User = require('../models/User.model');
const asyncMiddleware = require('../middlewares/async.middleware')
const authUtils = require('../utils/authentication.utils')
const { ErrorResponse } = require('../responses/error.Response');
const Sequelize = require('../database/mysql/connect');
const MailService = require('../services/mail.service')
const RegisterOtpModel = require('../models/mongo/RegisterOtp.model');
const ForgotTokenModel = require('../models/mongo/ForgotToken.model');

const authenticationController = {

  signUp: asyncMiddleware(async (req, res) => {

    const t = await Sequelize.transaction()

    const { username, password, email, phone } = req.body
    console.log('req.body of signUp ')
    // check username and email exist
    try {
      const isExistedUser = await User.findOne({ where: { username }, transaction: t })

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
  }),

  changePassword: asyncMiddleware(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const { id: userId } = req.user

    const isExistedUser = await User.findByPk(userId)

    if (!isExistedUser) {
      console.log('==> user not existed')
      throw new ErrorResponse(401, 'Unauthorized')
    }

    // check old password
    const isMatch = authUtils.comparePassword(oldPassword, isExistedUser.password)

    if (!isMatch) {
      console.log('==> old password not match')
      throw new ErrorResponse(401, 'Unauthorized')
    }

    // update new password
    const hashedNewPassword = authUtils.hashPassword(newPassword)
    await isExistedUser.update({ password: hashedNewPassword })

    res.status(200).json({
      success: true,
    })
  }),

  forgotPassword: asyncMiddleware(async (req, res) => {
    const { email } = req.body
    const isExistedUser = await User.findOne({ where: { email } })

    if (!isExistedUser) {
      console.log('==> user not existed')
      throw new ErrorResponse(401, 'Unauthorized')
    }

    // generate token forgot password
    const tokenForgetPassword = authUtils.randomBytes()

    await MailService.sendMail({
      to: 'tanle6378@gmail.com',
      subject: 'Forgot password',
      html: `<a href='http://abc.com/forget-password/${tokenForgetPassword}'>Click here to reset password</a>`
    })

    // save to mongoDB 
    const forgotTokenModel = new ForgotTokenModel({ email, token: tokenForgetPassword })
    await forgotTokenModel.save()


    res.status(200).json({
      success: true,
      message: "please check email to reset password"
    })
  }),

  resetPassword: asyncMiddleware(async (req, res) => {
    const { email, token, newPassword } = req.body

    // check email and token in mongoDB has expire time
    const isExistedToken = await ForgotTokenModel.findOne({ email, token })

    if (!isExistedToken) {
      throw new ErrorResponse(400, 'invalid token')
    }

    // neu dung thi cho update password
    const hashedNewPassword = authUtils.hashPassword(newPassword)
    
    await Promise.all([
      await User.update({ password: hashedNewPassword }, { where: { email } }),
      ForgotTokenModel.deleteOne({ email, token })
    ]).then(() => {
      res.status(200).json({
        success: true,
      })
    }).catch((err) => {
      console.log('==> reset password failed:', err)
      throw new ErrorResponse(500, 'Internal Server Error')
    })
    
    
  })
}

module.exports = authenticationController