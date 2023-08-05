const mongoose = require('mongoose');

const registerOtpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
        unique: true
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
registerOtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 180 });


module.exports = mongoose.model('RegisterOtp', registerOtpSchema);