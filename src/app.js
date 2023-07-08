const express = require('express')
const env = require('./configs/env')

const cors = require('cors')
const morgan = require('morgan')
const ErrorMiddleware = require('./middlewares/error.middleware')

// jwt middleware
const jwtAuth = require('./middlewares/jwtAuth')
const app = express()

// routes
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const addressRoute = require('./routes/address.route')

// middleware 
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
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync({force: true})
        console.log('All models were synchronized successfully.');
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectMysql()

// routes
app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/address', jwtAuth, addressRoute)


// Error middleware
app.use(ErrorMiddleware)

app.listen(env.port, () => {
    console.log(`Server is up on port ${env.port}.`)
})


