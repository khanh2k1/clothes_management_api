const { google } = require('googleapis')
const { env_nodemailer } = require('../configs/env')




const oAuth2Client = new google.auth.OAuth2(
    env_nodemailer.client_id,
    env_nodemailer.client_secret,
)


const generateOAuthAccessToken = async () => {
    // thiet lap thong tin xac thuc
    oAuth2Client.setCredentials({ refresh_token: env_nodemailer.refresh_token })
    const accesstoken = await oAuth2Client.getAccessToken()

    return accesstoken
}

module.exports = generateOAuthAccessToken