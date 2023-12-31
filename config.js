require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'production',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-key',
  mongodbUrl: process.env.MONGODB_URL || 'mongodb://127.0.0.1/bitfilmsdb',
};

module.exports = config;
