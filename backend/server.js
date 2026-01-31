const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik papka - rasmlar ko'rinishi uchun
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API yo'llari
app.use('/api/auth', authRoutes);

// ------------------------------
// React frontend bilan birlashtirish
// ------------------------------
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// ------------------------------
// Baza bilan ulanish va serverni ishga tushirish
// ------------------------------
const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Ma'lumotlar bazasi bilan aloqa o'rnatildi.");
    app.listen(PORT, () => console.log(`Server ${PORT}-portda ishlamoqda`));
  })
  .catch((err) => {
    console.error('Bazaga ulanishda xatolik:', err);
  });
