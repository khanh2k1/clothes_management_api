const errorMiddleware = (err, req, res, next) => {

    const { code=500, message } = err;
    console.log('=> errorMiddleware:',JSON.stringify({code , message}, null, 2));

    res.status(code).json({ 
        success:false,
        message
     }); 
}

module.exports = errorMiddleware