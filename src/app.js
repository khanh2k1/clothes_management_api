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


// routes
const roleRoute = require('./routes/role.route')
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const addressRoute = require('./routes/address.route')
const categoryRoute = require('./routes/category.route')
const productRoute = require('./routes/product.route')

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
require('./models/relationships') // relationships
async function connectMysql() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        // await sequelize.sync({ alter: true })
        // await sequelize.sync({ force: false })
        await sequelize.sync({force: true})
        console.log('All models were synchronized successfully.');

        await RoleModel.bulkCreate(roles, { ignoreDuplicates: true })
        await StatusModel.bulkCreate(status, { ignoreDuplicates: true })

        console.log('all roles were inserted successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectMysql()

// routes
app.use('/api/v1/role', jwtAuth, authorize('super_admin'), roleRoute)
app.use('/api/v1/user', jwtAuth, userRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/address', jwtAuth, addressRoute)
app.use('/api/v1/category', jwtAuth, categoryRoute)
app.use('/api/v1/product', jwtAuth, productRoute)
// Error middleware
app.use(ErrorMiddleware)

app.listen(env.port, () => {
    console.log(`Server is up on port ${env.port}.`)
})


