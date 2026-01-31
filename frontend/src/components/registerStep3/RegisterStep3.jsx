import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 1. Axiosni import qilish shart!
import './RegisterStep3.css';
import {
  FiBriefcase,
  FiClock,
  FiFileText,
  FiUserCheck,
  FiHome,
  FiAirplay,
  FiDollarSign,
  FiMapPin,
} from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterStep3 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('registerStep3');
    return saved
      ? JSON.parse(saved)
      : {
          employmentType: 'Full time',
          workplaceType: 'Onsite',
          minSalary: '',
          city: '',
        };
  });

  useEffect(() => {
    localStorage.setItem('registerStep3', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validatsiya: Bo'sh maydonlarni tekshirish
    if (!formData.city || !formData.minSalary) {
      toast.warning('Iltimos, shahar va kutilayotgan maoshni kiriting');
      return;
    }

    try {
      // Barcha qadamlardagi ma'lumotlarni yig'ish
      const step1 = JSON.parse(localStorage.getItem('registerStep1')) || {};
      const step2 = JSON.parse(localStorage.getItem('registerStep2')) || {};
      const step3 = formData;

      const finalUserData = {
        ...step1,
        ...step2,
        ...step3,
        // Backend kutayotgan qo'shimcha maydonlar (agar bo'lsa)
        userType: step1.userType || 'talent',
      };

      // Backendga so'rov yuborish
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        finalUserData
      );

      if (response.status === 201 || response.status === 200) {
        toast.success('Ro‘yxatdan muvaffaqiyatli o‘tdingiz!');

        // Ro'yxatdan o'tgach localStorageni tozalash
        localStorage.removeItem('registerStep1');
        localStorage.removeItem('registerStep2');
        localStorage.removeItem('registerStep3');

        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      // Xatolik xabarini aniqroq ko'rsatish
      const errorMsg =
        err.response?.data?.message || 'Server bilan bog‘lanishda xatolik';
      toast.error(errorMsg);
      console.error('Register Error:', err);
    }
  };

  return (
    <div className="step3-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="register-card wide">
        <h2 className="step-title">How do you imagine your dream job?</h2>

        <div className="progress-container">
          <div className="progress-line">
            <div className="dot completed"></div>
            <div className="dot completed"></div>
            <div className="dot active"></div>
          </div>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="selection-group">
            <label className="group-label">Employment type</label>
            <div className="tab-switcher">
              {[
                { label: 'Full time', icon: <FiBriefcase /> },
                { label: 'Part time', icon: <FiClock /> },
                { label: 'Contract', icon: <FiFileText /> },
                { label: 'Freelance', icon: <FiUserCheck /> },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`tab-btn ${
                    formData.employmentType === item.label ? 'active' : ''
                  }`}
                  onClick={() => handleTypeChange('employmentType', item.label)}
                >
                  <span className="tab-icon">{item.icon}</span> {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="selection-group">
              <label className="group-label">Workplace type</label>
              <div className="tab-switcher small">
                {[
                  { label: 'Onsite', icon: <HiOutlineOfficeBuilding /> },
                  { label: 'Remote', icon: <FiHome /> },
                  { label: 'Hybrid', icon: <FiAirplay /> },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className={`tab-btn ${
                      formData.workplaceType === item.label ? 'active' : ''
                    }`}
                    onClick={() =>
                      handleTypeChange('workplaceType', item.label)
                    }
                  >
                    <span className="tab-icon">{item.icon}</span> {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label className="group-label">Minimum salary</label>
              <div className="input-wrapper salary-input">
                <FiDollarSign className="input-icon" />
                <input
                  type="number"
                  name="minSalary"
                  placeholder="0"
                  required
                  value={formData.minSalary}
                  onChange={handleChange}
                />
                <span className="currency-label">$</span>
              </div>
            </div>
          </div>

          <div className="input-group single-col">
            <label className="group-label">City</label>
            <div className="input-wrapper">
              <FiMapPin className="input-icon" />
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                required
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-footer mt-60">
            <Link to="/registerStep2" className="btn-back">
              Back
            </Link>
            <button type="submit" className="btn-next">
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterStep3;
