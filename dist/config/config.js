"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    "define": {
      "charset": "utf8",
      "freezeTableName": true
    },
    // "dialectOptions": {
    //     "useUTC": false
    // },
    "timezone": "-04:00",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  mail: {
    service: 'gmail',
    auth: {
      //se indica el usuario y password
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  },
  expiratejwt: {
    expiresIn: '1h'
  }
};