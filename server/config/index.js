require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  mongo: {
    DB_URI: process.env.MONGO_DB_URI
  },
  JWT_ISSUER: process.env.JWT_ISSUER,
  JWT_SECRET: process.env.JWT_SECRET
};
