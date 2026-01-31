import React, { useState, useEffect } from 'react';
import './RegisterStep2.css';
import {
  FiBriefcase,
  FiZap,
  FiAward,
  FiGlobe,
  FiSliders,
  FiX,
} from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterStep2 = () => {
  const navigate = useNavigate();

  // LocalStorage dan ma'lumotlarni yuklash
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('registerStep2');
    return saved
      ? JSON.parse(saved)
      : {
          occupation: '',
          specialty: '',
          skills: [{ id: Date.now(), skill: 'Figma', exp: '1-year' }],
          languages: [{ id: Date.now(), lang: 'English', level: 'Beginner' }],
        };
  });

  // Har bir o'zgarishda LocalStorage ga saqlash
  useEffect(() => {
    localStorage.setItem('registerStep2', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Skill qo'shish va yangilash
  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [
        ...formData.skills,
        { id: Date.now(), skill: 'Figma', exp: '1-year' },
      ],
    });
  };

  const updateSkill = (id, field, value) => {
    const newSkills = formData.skills.map((s) =>
      s.id === id ? { ...s, [field]: value } : s
    );
    setFormData({ ...formData, skills: newSkills });
  };

  const removeSkill = (id) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s.id !== id),
    });
  };

  // Til qo'shish va yangilash
  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [
        ...formData.languages,
        { id: Date.now(), lang: 'English', level: 'Beginner' },
      ],
    });
  };

  const updateLang = (id, field, value) => {
    const newLangs = formData.languages.map((l) =>
      l.id === id ? { ...l, [field]: value } : l
    );
    setFormData({ ...formData, languages: newLangs });
  };

  const removeLanguage = (id) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((l) => l.id !== id),
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.occupation || !formData.specialty) {
      toast.error("Asosiy yo'nalishlarni tanlang!");
      return;
    }
    toast.success('Muvaffaqiyatli saqlandi!');
    setTimeout(() => navigate('/registerStep3'), 1000);
  };

  return (
    <div className="step2-container">
      <ToastContainer />
      <div className="register-card wide">
        <h2 className="step-title">Show us what you got</h2>

        <div className="progress-container">
          <div className="progress-line">
            <div className="dot completed"></div>
            <div className="dot active"></div>
            <div className="dot"></div>
          </div>
        </div>

        <form className="register-form" onSubmit={handleNext}>
          <div className="form-grid">
            <div className="input-group">
              <label>Occupation</label>
              <div className="input-wrapper">
                <FiBriefcase className="input-icon" />
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="custom-select"
                >
                  <option value="" disabled>
                    Select occupation
                  </option>
                  <option>Designer</option>
                  <option>Programmer</option>
                  <option>Businessman</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Specialty</label>
              <div className="input-wrapper">
                <FiZap className="input-icon" />
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="custom-select"
                >
                  <option value="" disabled>
                    Select specialty
                  </option>
                  <option>Generalist</option>
                  <option>Specialist</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="section-header">
            <h3 className="section-subtitle">Skills & Experience</h3>
          </div>
          {formData.skills.map((item, index) => (
            <div key={item.id} className="dynamic-row">
              <div className="input-group">
                {index === 0 && <label>Skills</label>}
                <div className="input-wrapper">
                  <FiAward className="input-icon" />
                  <select
                    value={item.skill}
                    onChange={(e) =>
                      updateSkill(item.id, 'skill', e.target.value)
                    }
                    className="custom-select"
                  >
                    <option>Figma</option>
                    <option>React</option>
                    <option>Python</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                {index === 0 && <label>Experience</label>}
                <div className="input-wrapper">
                  <FiSliders className="input-icon" />
                  <select
                    value={item.exp}
                    onChange={(e) =>
                      updateSkill(item.id, 'exp', e.target.value)
                    }
                    className="custom-select"
                  >
                    <option>1-year</option>
                    <option>3-years</option>
                    <option>5+ years</option>
                  </select>
                </div>
              </div>
              {formData.skills.length > 1 && (
                <button
                  type="button"
                  className="remove-circle"
                  onClick={() => removeSkill(item.id)}
                >
                  <FiX />
                </button>
              )}
            </div>
          ))}
          <div className="btn-container-right">
            <button type="button" className="add-btn-v2" onClick={addSkill}>
              Add skill
            </button>
          </div>

          {/* Languages Section */}
          <h3 className="section-subtitle mt-40">Languages</h3>
          {formData.languages.map((item, index) => (
            <div key={item.id} className="dynamic-row">
              <div className="input-group">
                {index === 0 && <label>Language</label>}
                <div className="input-wrapper">
                  <FiGlobe className="input-icon" />
                  <select
                    value={item.lang}
                    onChange={(e) =>
                      updateLang(item.id, 'lang', e.target.value)
                    }
                    className="custom-select"
                  >
                    <option>English</option>
                    <option>Uzbek</option>
                    <option>Russian</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                {index === 0 && <label>Level</label>}
                <div className="input-wrapper">
                  <FiSliders className="input-icon" />
                  <select
                    value={item.level}
                    onChange={(e) =>
                      updateLang(item.id, 'level', e.target.value)
                    }
                    className="custom-select"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Native</option>
                  </select>
                </div>
              </div>
              {formData.languages.length > 1 && (
                <button
                  type="button"
                  className="remove-circle"
                  onClick={() => removeLanguage(item.id)}
                >
                  <FiX />
                </button>
              )}
            </div>
          ))}
          <div className="btn-container-right">
            <button
              type="button"
              className="add-btn-v2 green"
              onClick={addLanguage}
            >
              Add language
            </button>
          </div>

          <div className="form-footer mt-60">
            <Link to="/register" className="btn-back">
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

export default RegisterStep2;
