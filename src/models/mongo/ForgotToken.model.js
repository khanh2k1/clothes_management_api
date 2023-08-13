const mongoose = require('mongoose');

const forgotTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
})

// danh index cho otp
// danh index cho createdAt, chi hoat dong khi luc dau chua co data, 
forgotTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 180 });


module.exports = mongoose.model('ForgotToken', forgotTokenSchema);