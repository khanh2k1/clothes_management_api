const errorMiddleware = (err, req, res, next) => {

    const { code, message } = err;
    console.log('=> errorMiddleware:',JSON.stringify({code , message}, null, 2));

    res.status(code).json({ message }); 
}

module.exports = errorMiddleware