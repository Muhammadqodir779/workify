import React, { useState, useEffect } from 'react';
import './Register.css';
import {
  FiUser,
  FiMail,
  FiLock,
  FiCalendar,
  FiMapPin,
  FiPhone,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('talent');
  const [gender, setGender] = useState('male');
  const [showPassword, setShowPassword] = useState(false);

  // LocalStorage dan ma'lumotlarni yuklash yoki default qiymat
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('registerStep1');
    return savedData
      ? JSON.parse(savedData)
      : {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          dob: '',
          location: '',
          phone: '+998 ', // Default boshlanishi
        };
  });

  // Har safar formData o'zgarganda LocalStorage ga saqlash
  useEffect(() => {
    localStorage.setItem('registerStep1', JSON.stringify(formData));
  }, [formData]);

  // Telefon raqamini formatlash (+998 (77)-800-26-11)
  const formatPhoneNumber = (value) => {
    if (!value.startsWith('+998 ')) return '+998 ';

    const numbers = value.slice(5).replace(/\D/g, ''); // Faqat raqamlarni olish
    let result = '+998 ';

    if (numbers.length > 0) {
      result += '(' + numbers.substring(0, 2);
    }
    if (numbers.length >= 3) {
      result += ')-' + numbers.substring(2, 5);
    }
    if (numbers.length >= 6) {
      result += '-' + numbers.substring(5, 7);
    }
    if (numbers.length >= 8) {
      result += '-' + numbers.substring(7, 9);
    }
    return result.substring(0, 19); // Maksimal uzunlik
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, phone: formatPhoneNumber(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, dob, location, phone } =
      formData;

    // Tekshirish
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !dob ||
      !location ||
      phone.length < 19
    ) {
      toast.error("Iltimos, barcha maydonlarni to'g'ri to'ldiring!", {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      return;
    }

    toast.success("Ma'lumotlar saqlandi!", { autoClose: 1000 });
    setTimeout(() => navigate('/registerStep2'), 1500);
  };

  return (
    <div className="register-page">
      <ToastContainer />
      <div className="register-card">
        <div className="type-switcher">
          <button
            className={`type-btn ${userType === 'talent' ? 'active' : ''}`}
            onClick={() => setUserType('talent')}
          >
            <FiUser className="btn-icon" /> Talent
          </button>
          <button
            className={`type-btn ${userType === 'company' ? 'active' : ''}`}
            onClick={() => setUserType('company')}
          >
            <HiOutlineOfficeBuilding className="btn-icon" /> Company
          </button>
        </div>

        <form className="register-form" onSubmit={handleNext}>
          <div className="form-grid">
            <div className="input-group">
              <label>First name</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Last name</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Email</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
            </div>

            <div className="input-group">
              <label>Gender</label>
              <div className="gender-switcher">
                <button
                  type="button"
                  className={`gender-btn ${gender === 'male' ? 'active' : ''}`}
                  onClick={() => setGender('male')}
                >
                  <FiUser className="btn-icon" /> Male
                </button>
                <button
                  type="button"
                  className={`gender-btn ${
                    gender === 'female' ? 'active' : ''
                  }`}
                  onClick={() => setGender('female')}
                >
                  <FiUser className="btn-icon" style={{ color: '#ff7eb3' }} />{' '}
                  Female
                </button>
              </div>
            </div>

            <div className="input-group">
              <label>Date of birth</label>
              <div className="input-wrapper">
                <FiCalendar className="input-icon" />
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Location</label>
              <div className="input-wrapper">
                <FiMapPin className="input-icon" />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Phone</label>
              <div className="input-wrapper">
                <FiPhone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+998 (__) ___-__-__"
                />
              </div>
            </div>
          </div>

          <div className="form-footer">
            <Link className="btn-back" to="/">
              Back
            </Link>
            <button type="submit" className="btn-next">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
