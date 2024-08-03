import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL ?? '';

class MongooseConnection {
  private static instance: MongooseConnection;
  private connection: mongoose.Connection | null = null;

  private constructor() {}

  public static getInstance(): MongooseConnection {
    if (!MongooseConnection.instance) {
      MongooseConnection.instance = new MongooseConnection();
    }
    return MongooseConnection.instance;
  }

  public async connect(): Promise<mongoose.Connection> {
    if (this.connection) {
      return this.connection;
    }

    try {
      const mongooseInstance = await mongoose.connect(MONGO_URL);
      this.connection = mongooseInstance.connection;
      console.log('Successfully connected to MongoDB');
      return this.connection;
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      throw error;
    }
  }
}

export default MongooseConnection;
