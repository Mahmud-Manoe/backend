require("dotenv").config(); // this is important!
module.exports = {
  "development": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_DATABASE,
    "host": process.env.DATABASE_HOST,
    "dialect": process.env.DATABASE_DIALECT
  },
  "test": {
    "username": "postgres",
    "password": "060820",
    "database": "database",
    "host": "127.0.0.1",
    "dialect": "postgress"
  },
  "production": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_DATABASE,
    "host": process.env.DATABASE_HOST,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false,
      },
    }
  }
}
