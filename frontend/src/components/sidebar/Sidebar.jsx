import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [userData, setUserData] = useState({
    firstName: 'User',
    lastName: '',
    location: 'Namangan city',
  });

  useEffect(() => {
    const storedData = localStorage.getItem('user');
    if (storedData && storedData !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedData);
        setUserData({
          firstName: parsedUser.firstName || 'User',
          lastName: parsedUser.lastName || '',
          location: parsedUser.location || 'Namangan city',
        });
      } catch (e) {
        console.error('Sidebar parse error');
      }
    }
  }, []);

  const initials = `${userData.firstName.charAt(0)}${userData.lastName.charAt(
    0
  )}`.toUpperCase();

  return (
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
        <Link to="/job-alerts" className="menu-item">
          <FiBell /> Job alerts
        </Link>
        <Link to="/job-matches" className="menu-item">
          <FiBriefcase /> Job matches
        </Link>
        <Link to="/settings" className="menu-item">
          <FiSettings /> Settings
        </Link>
        <Link to="/faq" className="menu-item">
          <FiHelpCircle /> FAQ
        </Link>
        <Link to="/contacts" className="menu-item">
          <FiPhone /> Contacts
        </Link>
      </nav>

      <div className="sidebar-footer">
        <Link to="/login" className="menu-item logout-link">
          <FiLogOut /> Log out
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
