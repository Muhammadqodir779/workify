const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1. REGISTER
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu email band' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: 'Muvaffaqiyatli ro‘yxatdan o‘tdingiz', user: newUser });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Serverda xatolik', error: error.message });
  }
};

// 2. LOGIN
exports.login = async (req, res) => {
  console.log('--- LOGIN BOSHLANDI ---');
  console.log("Kelgan ma'lumot:", req.body); // Frontenddan nima kelayotganini ko'ramiz

  try {
    const { email, password } = req.body;

    // 1. Foydalanuvchini qidirish
    const user = await User.findOne({ where: { email } });
    console.log('Foydalanuvchi topildimi?:', user ? 'HA' : "YO'Q");

    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    // 2. Parolni tekshirish (BCRYPT tekshiruvi)
    console.log('Bcrypt tekshirilmoqda...');
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Parol to'g'rimi?:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Parol noto‘g‘ri' });
    }

    // 3. JWT yaratish
    console.log('JWT yaratilmoqda...');
    const token = jwt.sign({ id: user.id }, 'SECRET_KEY_123', {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Xush kelibsiz',
      token,
      user: { id: user.id, firstName: user.firstName, lastName: user.lastName },
    });
  } catch (error) {
    console.error('!!! LOGINDA XATO !!!');
    console.error('Xato turi:', error.name);
    console.error('Xato xabari:', error.message);
    console.error('Stack:', error.stack); // Xato aynan qaysi qatorda ekanini ko'rsatadi

    res.status(500).json({
      message: 'Serverda xatolik',
      error: error.message,
    });
  }
};

// 3. GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User topilmadi' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi' });
  }
};

// 4. UPLOAD AVATAR (Xatoni to'g'irlash uchun qo'shildi)
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Rasm yuklanmadi' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;

    // Agar userId kelsa bazani yangilaymiz
    if (req.body.userId) {
      const user = await User.findByPk(req.body.userId);
      if (user) {
        user.avatar = imageUrl;
        await user.save();
      }
    }

    res.status(200).json({
      message: 'Rasm yuklandi',
      imageUrl: imageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};
