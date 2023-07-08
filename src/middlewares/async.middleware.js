const asyncMiddleware = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
}

module.exports = asyncMiddleware