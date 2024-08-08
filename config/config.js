module.exports = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  mongoose: {
    url: process.env.MONGODB_URL || "mongodb://localhost:27017/test",
    options: {},
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    accessExpirationMinutes: 30,
  },
};
