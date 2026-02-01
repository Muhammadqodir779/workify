require('dotenv').config();
const { Sequelize } = require('sequelize');

// PostgreSQL bilan ulanish
const sequelize = new Sequelize(
  process.env.DB_NAME, // workify
  process.env.DB_USER, // postgres
  process.env.DB_PASSWORD, // 2010
  {
    host: process.env.DB_HOST, // localhost
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false, // ortiqcha loglarni o‘chiradi
  }
);

// Test uchun bazaga ulanishni tekshirish
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Ma'lumotlar bazasiga muvaffaqiyatli ulanildi.");
  } catch (error) {
    console.error('❌ Bazaga ulanishda xatolik:', error.message);
  }
})();

module.exports = sequelize;
