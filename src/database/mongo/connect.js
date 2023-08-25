
const { default: mongoose } = require('mongoose');
const { env_mongoDB } = require('../../configs/env');

const url = `mongodb://${env_mongoDB.DB_HOST}:${env_mongoDB.DB_PORT}`; // Thay đổi URL nếu cần thiết
const dbName = `${env_mongoDB.DB_NAME}`; // Thay đổi tên database nếu cần thiết

// Function để kết nối đến MongoDB


class MongoDB {
  static connect() {
    mongoose.connect(`${url}/${dbName}`)
    .then(() => {
      console.log('Connected to MongoDB.')  
    })

    const conn = mongoose.connection

    conn.once('open', () => {
      this.gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
      })
    })
  }
}

module.exports = MongoDB;
