const express = require('express')
const env = require('./configs/env')

const cors = require('cors')
const morgan = require('morgan')
const ErrorMiddleware = require('./middlewares/error.middleware')

// jwt middleware
const jwtAuth = require('./middlewares/jwtAuth')
const app = express()

// roles 
const RoleModel = require('./models/Role.model')
const roles = require('./constant/Roles')

// status
const status = require('./constant/Status')
const StatusModel = require('./models/Status.model')

// upload file 
const upload = require('./middlewares/upload.middleware')

// routes
const roleRoute = require('./routes/role.route')
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const addressRoute = require('./routes/address.route')
const categoryRoute = require('./routes/category.route')
const productRoute = require('./routes/product.route')
const orderRoute = require('./routes/order.route')
const fileRoute = require('./routes/file.route')
// upload file


// middleware 
// authorize middleware
const authorize = require('./middlewares/authorize.middleware')
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan('dev'))

// connect to Database
const sequelize = require('./database/mysql/connect')
const { file } = require('googleapis/build/src/apis/file')
//==========================================
require('./models/relationships') // relationships
//==========================================

async function connectMysql() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        // await sequelize.sync({ alter: true })
        // await sequelize.sync({ force: false })
        // await sequelize.sync()
        // console.log('All models were synchronized successfully.');

        // await RoleModel.bulkCreate(roles, { ignoreDuplicates: true })
        // await StatusModel.bulkCreate(status, { ignoreDuplicates: true })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectMysql()

// connect mongo
const mongodb = require('./database/mongo/connect')

mongodb.connect()


const path = require('path')

const filePath = path.join(__dirname, 'uploads')
// routes   
app.use('/static', express.static(filePath))
app.use('/api/v1/role', jwtAuth, authorize('super_admin'), roleRoute)
app.use('/api/v1/user', jwtAuth, userRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/address', jwtAuth, addressRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/order', jwtAuth, orderRoute)
app.use('/api/v1/file', fileRoute)

// test upload 
// app.post('/upload', upload.single('avatar'), (req, res) => {
   
//     const file = req.file
//     console.log(JSON.stringify(file, null, 2))
//     res.json({
//         success: true,
//         files: req.file
//     })
// })

// // test upload 
// app.post('/uploads', upload.array('photos'), (req, res) => {
//     const { files } = req.files
//     res.json({
//         success: true,
//         files: files
//     })
// })

// Error middleware
app.use(ErrorMiddleware)

app.listen(env.port, () => {
    console.log(`Server is up on port ${env.port}.`)
})


