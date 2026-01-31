const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // workify
  process.env.DB_USER, // postgres
  process.env.DB_PASSWORD, // to‘g‘ri nom
  {
    host: process.env.DB_HOST, // Render host
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // SSL Render/Postgres uchun
      },
    },
  }
);

module.exports = sequelize;
