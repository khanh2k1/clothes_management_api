
const { ErrorResponse } = require('../responses/error.Response');
const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      // Xử lý lỗi validation
      console.log(`${schema} validation error: ${error}`)
      throw new ErrorResponse(400, error.details[0].message);
      // return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}

module.exports = validator;