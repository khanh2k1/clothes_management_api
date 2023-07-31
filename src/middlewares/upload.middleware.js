const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // noi luu file
        // dirname: thu muc hien tai
        cb(null, path.join(__dirname, "..", "uploads"))
    },
    filename: function (req, file, cb) {
        // avatar-Date.now().png
        const { fieldname, originalname } = file
        // extension
        const ext = path.extname(originalname) // .png
        cb(null, `${fieldname}-${Date.now()}${ext}`)
    }

})

/* 
    middleware upload file có các field sau: 
        file:
        {
            fieldname: 'photo',
            originalname: 'graffiti-typos-dh-1920x1080.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
        }, 

    file upload đầy đủ : 
=>  file that you uploaded: {
        fieldname: 'photo',
        originalname: 'music-quotes-3000x1734.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: 'E:\\nodejs\\nodejs_thay_bui_nhat_mysql\\src\\uploads',
        filename: 'photo-1690263928462.jpg',
        path: 'E:\\nodejs\\nodejs_thay_bui_nhat_mysql\\src\\uploads\\photo-1690263928462.jpg',
        size: 320453
    }
*/


const fileFilter = (req, file, cb) => {
    console.log('file:', file)
    const { originalname } = file
    // regex for extension 
    if (!originalname.match(/\.(jpg|jpeg|png)$/)) {
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


const upload = multer({ storage, fileFilter, limits })


// Override hàm xử lý lỗi khi vượt quá giới hạn kích thước tệp
upload._handleFile = function _handleFile(req, file, cb) {

    console.log('custom by Dang Khanh')
    // Tùy chỉnh việc xử lý lỗi ở đây
    if (file.size > this.opts.limits.fileSize) {
        const error = new Error(`File size limit ${FILE_LIMIT}MB`);
        error.code = 'LIMIT_FILE_SIZE by Dang Khanh';
        return cb(error);
    }

    // Gọi lại hàm xử lý tệp mặc định của Multer nếu không có lỗi
    multer.Storage.prototype._handleFile.call(this, req, file, cb);

};

module.exports = upload