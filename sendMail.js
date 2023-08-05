const { google } = require('googleapis')
const { env_nodemailer } = require('./src/configs/env')

const nodemailer = require('nodemailer')


console.log('refreshToken:', env_nodemailer.refresh_token)

const oAuth2Client = new google.auth.OAuth2(
    env_nodemailer.client_id,
    env_nodemailer.client_secret,
)

// thiet lap thong tin xac thuc
oAuth2Client.setCredentials({ refresh_token: env_nodemailer.refresh_token })



oAuth2Client.getAccessToken()
    .then((accessToken) => {
        console.log('accessToken:', accessToken)

        const tranporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tanle6378@gmail.com',
                type: 'OAuth2',
                clientId: env_nodemailer.client_id,
                clientSecret: env_nodemailer.client_secret,
            }
        })


        tranporter.sendMail({
    
            from: 'tanle6378@gmail.com',
            to: 'n19dccn089@student.ptithcm.edu.vn',
            subject: 'Tap gui mail cho quen',
            text: 'Hello Khanh',
            auth: {
                refreshToken: env_nodemailer.refresh_token,
                accessToken
            },
            html: `<!DOCTYPE html> 
        <html>
        <head>
          <title>Mời Thiệp Cưới</title>
          <style>
            body {
              background-color: #f3f3f3;
              font-family: Arial, sans-serif;
              text-align: center;
            }
        
            .invitation-card {
              max-width: 500px;
              margin: 0 auto;
              background-color: #fff;
              border: 1px solid #ccc;
              border-radius: 10px;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
        
            h1 {
              font-size: 30px;
              color: #e91e63;
            }
        
            p {
              font-size: 16px;
              color: #333;
            }
        
            .names {
              font-size: 24px;
              font-weight: bold;
              color: #e91e63;
            }
        
            .date-time {
              font-size: 20px;
              color: #333;
            }
        
            .venue {
              font-size: 18px;
              color: #333;
              margin-bottom: 30px;
            }
        
            .rsvp-button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #e91e63;
              color: #fff;
              border: none;
              border-radius: 5px;
              text-decoration: none;
              font-size: 18px;
              margin-top: 20px;
              transition: background-color 0.2s ease;
            }
        
            .rsvp-button:hover {
              background-color: #c2185b;
            }
        
            .footer {
              margin-top: 30px;
              font-size: 14px;
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="invitation-card">
            <h1>Mời bạn đến dự đám cưới</h1>
            <p class="names">Nguyễn Văn A & Trần Thị B</p>
            <p class="date-time">Thứ 7, ngày 10 tháng 8, 2023 - 10:00 AM</p>
            <p class="venue">Nhà hàng Hoa Cúc - 123 Đường Hoa Cúc, Quận 1, TP. HCM</p>
            <a href="#" class="rsvp-button">Xác nhận tham dự</a>
            <p class="footer">Được gửi từ trang web Mời Thiệp Cưới</p>
          </div>
        </body>
        </html>`
        }).then(() => {
            console.log('==> send mail success')
        }).catch((error) => {
            console.log('==> send mail failed:', error)
        })

    })






