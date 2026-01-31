import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiBriefcase,
  FiCalendar,
  FiGlobe,
  FiAward,
  FiStar,
  FiCheckCircle,
  FiMessageSquare,
  FiTrendingUp,
  FiUser,
} from 'react-icons/fi';
import { SiReact } from 'react-icons/si';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          const userId = storedUser.id || storedUser._id;
          const res = await axios.get(
            `http://localhost:5000/api/auth/profile/${userId}`
          );
          setUser(res.data);
        }
      } catch (err) {
        console.error('Profil yuklashda xato:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="profile-loading">Yuklanmoqda...</div>;
  if (!user) return <div className="profile-error">Ma'lumot topilmadi</div>;

  return (
    <div className="profile-page-container">
      {/* Sidebar uchun joy tashlangan asosiy wrapper */}
      <div className="profile-content-wrapper">
        {/* CHAP USTUN - Kichik karta */}
        <div className="profile-card-left">
          <div className="profile-image-box">
            <FiUser size={60} color="#94a3b8" />
          </div>
          <div className="profile-info-header">
            <h2>
              {user.firstName} {user.lastName}{' '}
              <FiCheckCircle className="v-icon" />
            </h2>
            <p>{user.specialty || 'Generalist'}</p>
            <div className="profile-price">${user.minSalary || '0.00'}</div>
            <div className="profile-stars">
              <FiStar className="s-fill" /> <FiStar className="s-fill" />
              <FiStar className="s-fill" /> <FiStar className="s-fill" />
              <FiStar /> <span>(4.0) | 1K reviews</span>
            </div>
          </div>

          <div className="profile-divider"></div>

          <div className="personal-info-block">
            <h4>Personal info:</h4>
            <div className="info-line">
              <span>
                <FiCalendar /> Age:
              </span>{' '}
              <b>{user.dob || '2010-01-21'}</b>
            </div>
            <div className="info-line">
              <span>
                <FiMapPin /> City:
              </span>{' '}
              <b>{user.city || 'Namangan'}</b>
            </div>
            <div className="info-line">
              <span>
                <FiGlobe /> Country:
              </span>{' '}
              <b>Uzbekistan</b>
            </div>
            <div className="info-line">
              <span>
                <FiPhone /> Phone:
              </span>{' '}
              <b>{user.phone}</b>
            </div>
            <div className="info-line">
              <span>
                <FiMail /> Email:
              </span>{' '}
              <b>{user.email}</b>
            </div>
            <div className="info-line">
              <span>
                <FiBriefcase /> Workplace:
              </span>{' '}
              <b>{user.workplaceType}</b>
            </div>
          </div>
        </div>

        {/* O'NG USTUN - Katta kartalar */}
        <div className="profile-cards-right">
          <div className="info-card">
            <h3>
              <FiAward /> Skills
            </h3>
            <div className="badge-grid">
              {user.skills && Array.isArray(user.skills) ? (
                user.skills.map((s, i) => (
                  <span key={i} className="p-badge">
                    <SiReact />{' '}
                    {typeof s === 'object' ? `${s.skill} (${s.exp})` : s}
                  </span>
                ))
              ) : (
                <span className="p-badge">
                  <SiReact /> React (1-year)
                </span>
              )}
            </div>
          </div>

          <div className="info-card">
            <h3>
              <FiTrendingUp /> Languages
            </h3>
            <div className="badge-grid">
              {user.languages && Array.isArray(user.languages) ? (
                user.languages.map((l, i) => (
                  <span key={i} className="p-badge">
                    {typeof l === 'object' ? `${l.language} (${l.level})` : l}
                  </span>
                ))
              ) : (
                <span className="p-badge">Uzbek (Beginner)</span>
              )}
            </div>
          </div>

          <div className="info-card about-card">
            <h3>
              <FiMessageSquare /> About
            </h3>
            <p>{user.about || 'Please tell us something about yourself...'}</p>
          </div>

          <button className="likes-btn">
            <FiCheckCircle /> View Likes / Dislikes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
