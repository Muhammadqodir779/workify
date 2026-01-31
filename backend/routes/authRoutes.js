const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authController = require('../controllers/authController');

// Rasmlarni saqlash sozlamalari
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Yo'nalishlar (Routes)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile/:id', authController.getProfile);

// Avatar yuklash uchun
router.post(
  '/upload-avatar',
  upload.single('avatar'),
  authController.uploadAvatar // Endi bu controllerda bor!
);

module.exports = router;
