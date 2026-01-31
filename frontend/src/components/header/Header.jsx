import React from 'react';
import { Link } from 'react-router-dom'; // Link-ni import qilamiz
import './Header.css';
import { FiUsers, FiBriefcase, FiChevronDown } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="header">
      {/* Logoni Link qildik */}
      <Link to="/" className="logo">
        workify
      </Link>

      <nav className="nav">
        <a href="#">
          <FiUsers className="nav-icon" /> Talents
        </a>
        <a href="#">
          <FiBriefcase className="nav-icon" /> Jobs
        </a>
      </nav>

      <div className="header-actions">
        {/* Sign in tugmasini Link qildik */}
        <Link to="/login" className="btn-signin-link">
          Sign in
        </Link>

        <Link to="/register" className="btn-join">
          Join Now
        </Link>

        <div className="lang-selector">
          Eng <FiChevronDown size={14} />
          {/* <div className="dropdown">
            <div>Uzbek</div>
            <div>Russian</div>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
