// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/db'); // Baza ulanishini import qilish
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik papka - rasmlar ko'rinishi uchun shart!
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API yo'llari
app.use('/api/auth', authRoutes);

// Baza bilan ulanishni tekshirish va serverni yoqish
const PORT = 5000;

sequelize
  .sync({ alter: true }) // Model va jadvalni moslashtiradi
  .then(() => {
    console.log("Ma'lumotlar bazasi bilan aloqa o'rnatildi.");
    app.listen(PORT, () => console.log(`Server ${PORT}-portda ishlamoqda`));
  })
  .catch((err) => {
    console.error('Bazaga ulanishda xatolik:', err);
  });
