const { MongoClient } = require('mongodb');
const { default: mongoose } = require('mongoose');

const url = 'mongodb://127.0.0.1:27017'; // Thay đổi URL nếu cần thiết
const dbName = 'nodejs-course'; // Thay đổi tên database nếu cần thiết

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
