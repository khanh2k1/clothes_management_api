const errorMiddleware = (err, req, res, next) => {
    const { code ,message } = err
    
    console.log('==> errorMiddleware:', JSON.stringify(message, null, 2))


    res.status(typeof code === 'number' ? code : 500).json({
        success: false,
        message: message || 'Internal Server Error'
    });
}

module.exports = errorMiddleware