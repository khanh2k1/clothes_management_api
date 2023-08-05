

const generateOAuthAccessToken = require('../utils/generateOAuthAccessToken.util')
const {env_nodemailer} = require('../configs/env')

const nodemailer = require('nodemailer')

class MailService {

  constructor() {
    this.initTransporter()
  }

  initTransporter() {
    this.tranporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tanle6378@gmail.com',
        type: 'OAuth2',
        clientId: env_nodemailer.client_id,
        clientSecret: env_nodemailer.client_secret,
      }
    })
  }

  async sendMail({ to, subject, text, html }) {
    const accessToken = await generateOAuthAccessToken()
    this.tranporter.sendMail({
      from: 'tanle6378@gmail.com',
      to,
      subject,
      text,
      auth: {
        refreshToken: env_nodemailer.refresh_token,
        accessToken
      },
      html}).then(() => {
        console.log('==> send mail success')
      }).catch((error) => {
        console.log('==> send mail failed:', error)
      })

  }
}


module.exports = new MailService()






