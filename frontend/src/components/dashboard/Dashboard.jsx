import React, { useState, useEffect } from 'react';
// Link va useLocation hooklarini import qilish shart!
import { Link, useLocation } from 'react-router-dom';
import './Dashboard.css';
import {
  FiGrid,
  FiUser,
  FiBell,
  FiBriefcase,
  FiSettings,
  FiHelpCircle,
  FiPhone,
  FiLogOut,
} from 'react-icons/fi';

const Dashboard = () => {
  // Sahifa manzilini aniqlash (Linklar 'active' bo'lishi uchun)
  const location = useLocation();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    location: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. LocalStorage'dan login payti saqlangan user obyektini olamiz
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && (storedUser.id || storedUser._id)) {
          const userId = storedUser.id || storedUser._id;

          // 2. Backenddan profil ma'lumotlarini so'raymiz
          const res = await fetch(
            `http://localhost:5000/api/auth/profile/${userId}`
          );
          const data = await res.json();

          if (res.ok) {
            setUserData({
              firstName: data.firstName || 'User',
              lastName: data.lastName || '',
              location: data.city || 'Location not set',
            });
          }
        }
      } catch (err) {
        console.error('Dashboard data error:', err);
      }
    };

    fetchUserData();
  }, []);

  const initials = `${userData.firstName.charAt(0)}${userData.lastName.charAt(
    0
  )}`.toUpperCase();

  return (
    <div className="dashboard-layout">
      {/* Sidebar - Chap tomon */}
      <aside className="sidebar">
        <div className="sidebar-profile">
          <div className="avatar-circle">{initials}</div>
          <div className="profile-info">
            <h3 className="profile-name">
              {userData.firstName} {userData.lastName}
            </h3>
            <p className="profile-location">{userData.location}</p>
          </div>
        </div>

        <nav className="sidebar-menu">
          <Link
            to="/dashboard"
            className={`menu-item ${
              location.pathname === '/dashboard' ? 'active' : ''
            }`}
          >
            <FiGrid /> Dashboard
          </Link>

          <Link
            to="/profile"
            className={`menu-item ${
              location.pathname === '/profile' ? 'active' : ''
            }`}
          >
            <FiUser /> My profile
          </Link>

          <Link
            to="/job-alerts"
            className={`menu-item ${
              location.pathname === '/job-alerts' ? 'active' : ''
            }`}
          >
            <FiBell /> Job alerts
          </Link>

          <Link
            to="/job-matches"
            className={`menu-item ${
              location.pathname === '/job-matches' ? 'active' : ''
            }`}
          >
            <FiBriefcase /> Job matches
          </Link>

          <Link
            to="/settings"
            className={`menu-item ${
              location.pathname === '/settings' ? 'active' : ''
            }`}
          >
            <FiSettings /> Settings
          </Link>

          <Link
            to="/faq"
            className={`menu-item ${
              location.pathname === '/faq' ? 'active' : ''
            }`}
          >
            <FiHelpCircle /> FAQ
          </Link>

          <Link
            to="/contacts"
            className={`menu-item ${
              location.pathname === '/contacts' ? 'active' : ''
            }`}
          >
            <FiPhone /> Contacts
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link to="/login" className="menu-item logout-link">
            <FiLogOut /> Log out
          </Link>
        </div>
      </aside>

      {/* Main Content - O'ng tomon */}
      <main className="dashboard-main-content">
        <header className="content-header">
          <div className="header-title-box">
            <h2>Dashboard</h2>
          </div>
        </header>

        <div className="stats-grid">
          {/* Profile Completed Card */}
          <div className="card profile-status-card">
            <h3>Profile completed</h3>
            <div className="progress-container">
              <div className="circular-progress">
                <div className="inner-circle">
                  <span className="percent">85%</span>
                  <span className="complete-text">COMPLETE</span>
                </div>
              </div>
            </div>
            <p>
              Complete all parts of your profile and increase your chances of
              finding a job
            </p>
          </div>

          {/* Profile Views Card */}
          <div className="card chart-card">
            <div className="card-header">
              <h3>Profile Views</h3>
              <div className="chart-tabs">
                <button className="active">This week</button>
                <button>This year</button>
              </div>
            </div>
            <div className="date-range">26 Jan - 1 Feb 2026</div>
            <div className="chart-placeholder">
              <div className="chart-axis-y">
                <span>1</span>
                <span>1</span>
                <span>0</span>
              </div>
              <div className="bars-container">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day) => (
                  <div key={day} className="bar-group">
                    <div className="empty-bar"></div>
                    <span className="day-label">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Job Offers Card */}
        <div className="card job-offers-card">
          <div className="card-header centered">
            <h3>Job Offers</h3>
            <div className="chart-tabs">
              <button className="active">This Week</button>
              <button>This Year</button>
            </div>
            <div className="date-range">Jan 26 - Feb 1 (Current Week)</div>
          </div>
          <div className="empty-chart-msg">Ma'lumotlar mavjud emas</div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
