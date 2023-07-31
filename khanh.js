// const { DataTypes, Sequelize } = require('sequelize')

// const sequelize = new Sequelize(
//     'test', 'root', '25032001',
//     {
//         host: 'localhost',
//         port: '3306',
//         dialect: 'mysql'
//     }
// )

// // through is required!

// // user.addProject(project, { through: { role: 'manager' } });
// const User = sequelize.define('User', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     role: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// }, {
//     freezeTableName: true,
// })

// const Project = sequelize.define('Project', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     role: {
//         type: DataTypes.STRING,
//         unique: true,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     }
// })

// UserProject = sequelize.define('user_project', {
//     role: Sequelize.STRING
// });

// User.belongsToMany(Project, { through: UserProject });
// Project.belongsToMany(User, { through: UserProject });

// console.log('all roles were inserted successfully.');

// async function connectMysql() {
//     try {
//         await sequelize.authenticate()
//         console.log('Connection has been established successfully.')
//         // await sequelize.sync({ alter: true })
//         // await sequelize.sync({ force: false })

//         const Project = sequelize.define('project', {
//             name: DataTypes.STRING
//         });

//         const User = sequelize.define('user', {
//             name: DataTypes.STRING
//         });

//         const ProjectUser = sequelize.define('project_user', {
//             // Các trường khác (nếu có)
//             role: Sequelize.STRING
//         });

//         User.belongsToMany(Project, { through: ProjectUser });
//         Project.belongsToMany(User, { through: ProjectUser });

//         sequelize.sync({ force: true })

//         const t = await sequelize.transaction();

//         try {
//             const user = await User.create({ name: 'Dang Khanh' }, { transaction: t });
//             const project = await Project.create({ name: 'project1' }, { transaction: t });
//             user.addProject(project, { through: { role: 'manager' } }, { transaction: t });

//             t.commit();
//         } catch (err) {
//             await t.rollback();
//             throw err;
//         }



//         console.log('All models were synchronized successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
// connectMysql()



const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const { env_nodemailer } = require('./src/configs/env')
const OAuth2 = google.auth.OAuth2

const oAuth2_client = new OAuth2(
    env_nodemailer.client_id,
    env_nodemailer.client_secret,
)


async function setCredentials() {
    try {

        oAuth2_client.setCredentials({ refresh_token: env_nodemailer.refresh_token })
        const accessToken = await oAuth2_client.getAccessToken()
        console.log('==> access_token:', accessToken)
    } catch (error) {
        console.log('==> error setCredentials:', error)
    }
}



async function sendMail(name, recipient) {

    try {

        setCredentials()

        const accessToken = await oAuth2_client.getAccessToken()

        console.log('==> access_token:', accessToken)

        const transport = nodemailer.createTransport({

            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'tanle6378@gmail.com',
                clientId: env_nodemailer.client_id,
                clientSecret: env_nodemailer.client_secret,
                refreshToken: env_nodemailer.refresh_token,
                accessToken: accessToken
            }
        })

        const mail_options = {
            from: 'DANG KHANH <tanle6378@gmail.com>',
            to: recipient,
            subject: 'Test send mail',
            Text: 'Hello ' + name,
            html: '<h1>Hello ' + name + '</h1>'
        }

        await transport.sendMail(mail_options)
            .then(() => {
                console.log('==> send mail success')
                transport.close()
            })
    } catch (error) {
        console.log('==> send mail failed:', error)
    }
}

//sendMail('Dang Khanh', 'n19dccn089@student.ptithcm.edu.vn')


let createCounter = function (n) {
    return function () {
        n += 1
        return n
    }
}

// const counter = createCounter(10)
// counter() // 10
// counter() // 11
// counter() // 12

// console.log('==> counter:', counter())


console.log('==> counter:', typeof createCounter(10))

