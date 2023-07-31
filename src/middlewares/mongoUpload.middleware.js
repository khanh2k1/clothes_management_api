const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')
const crypto = require('crypto')
const mongodb = require('../database/mongo/connect')
const path = require('path')
const connectToMongo = require('../database/mongo/connect')

const url = "mongodb://127.0.0.1:27017/nodejs-course"

const storage = new GridFsStorage(
    {       
       url: url,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(20, (err, buf) => {
                    if (err) {
                        return reject(err)
                    }
                    const filename = buf.toString('hex') + path.extname(file.originalname)
                    const fileInfo = {
                        filename, 
                        bucketName: 'uploads' // MONGO_BUCKET // 
                        /* 
                            trong mongo se co 2 table la uploads.files va uploads.chunks
                        */
                    }
                    resolve(fileInfo)
                })
            })
        }
    }
)


const fileFilter = (req, file, cb) => {
    console.log('file:', file)
    const { originalname } = file
    // regex for extension 
    if (!originalname.match(/\.(jpg|jpeg|png|mp4)$/)) {
        // p1: throw ra error
        // p2: true/false: save-not save
        return cb(new Error(`Not support file extension ${path.extname(originalname)}`), false)
    }

    const { size } = file
    console.log('size of photo: ', size)
    cb(null, true)

}

const FILE_LIMIT = 1


const limits = {
    fileSize: FILE_LIMIT * 1024 * 1024,
}

const mongoUpload = multer({ storage, fileFilter, limits })


module.exports = mongoUpload