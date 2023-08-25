
const blackListMiddleware = (blackList) => {
    // tra ve 1 middleware
    return (req, res, next) => {
        if(blackList.includes(req.ip)) {
            console.log(`Error: the ip: '${req.ip}' can not permiss request this server !`)
            return res.status(403).json({
                success:false,
                message:`the ip '${req.ip}' can not permiss request this server !`
            })
        }else next()
    }
}

module.exports = blackListMiddleware                 