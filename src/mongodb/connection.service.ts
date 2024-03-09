import { Logger } from '@nestjs/common';
import mongoose from 'mongoose';

const logger = new Logger('MongoConnection');

const DB_URL = process.env['MONGO'];

const initDB = () => {
  mongoose.connect(DB_URL).then(() => logger.log('DB connection successful'));
};

export { initDB };
