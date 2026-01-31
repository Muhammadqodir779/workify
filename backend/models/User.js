const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define(
  'User',
  {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    userType: {
      type: DataTypes.ENUM('talent', 'company'),
      defaultValue: 'talent',
    },
    gender: { type: DataTypes.STRING },
    dob: { type: DataTypes.DATEONLY },
    location: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    // Step 2 ma'lumotlari
    occupation: { type: DataTypes.STRING },
    specialty: { type: DataTypes.STRING },
    skills: { type: DataTypes.JSON }, // Massiv ko'rinishida saqlash uchun
    experience: { type: DataTypes.JSON },
    languages: { type: DataTypes.JSON },
    // Step 3 ma'lumotlari
    employmentType: { type: DataTypes.STRING },
    workplaceType: { type: DataTypes.STRING },
    minSalary: { type: DataTypes.DECIMAL },
    city: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
