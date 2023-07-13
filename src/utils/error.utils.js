
const { ErrorResponse } = require('../responses/error.Response')
const errorUtils = (err) => {


    console.log('err = ', err)
    // const { sqlMessage: error } = err.parent
    // throw new ErrorResponse(500, error)
}

module.exports = errorUtils