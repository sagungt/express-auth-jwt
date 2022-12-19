module.exports = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: +process.env.DB_PORT,
  db: process.env.DB_NAME,
  dialect: process.env.DB_DRIVER,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
