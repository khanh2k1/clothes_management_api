const express = require('express');
const MongoDB = require('../database/mongo/connect');
const router = express.Router();
const { ErrorResponse } = require('../responses/error.Response');

router.get('/:filename', async (req, res, next) => {
    const { filename } = req.params

    console.log('filename:', filename)
    const file = await MongoDB.gfs.find({ filename }).toArray((err, files) => {
        if (!files || files.length === 0) {
            console.log(files)
        }
    })

    console.log('file:', file)

    // if (!file || !file.length) {
    //     return next(new ErrorResponse(404, 'File not found'))
    // }

    MongoDB.gfs.openDownloadStreamByName(filename).pipe(res)
})




module.exports = router