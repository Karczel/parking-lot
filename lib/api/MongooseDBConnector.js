import mongoose from 'mongoose';

class MongooseDBConnector {
  constructor() {
    if (MongooseDBConnector._instance) {
      return MongooseDBConnector._instance;
    }

    this.MONGODB_URI = process.env.MONGODB_URI;
    if (!this.MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }

    this.cached = global.mongoose;
    if (!this.cached) {
      this.cached = global.mongoose = { conn: null, promise: null };
    }

    MongooseDBConnector._instance = this;
  }

  async dbConnect() {
    if (this.cached.conn) {
      return this.cached.conn;
    }

    if (!this.cached.promise) {
      this.cached.promise = mongoose.connect(this.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((mongoose) => mongoose);
    }

    this.cached.conn = await this.cached.promise;
    return this.cached.conn;
  }
}

const mongoInstance = new MongooseDBConnector();
export default mongoInstance.dbConnect.bind(mongoInstance);
