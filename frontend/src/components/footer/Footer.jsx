import React from 'react';
import './Footer.css';
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTelegramPlane,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2 className="footer-logo">workify</h2>
          <p>Job posting platform</p>
          <button className="footer-contact-btn">Contacts</button>
        </div>

        <div className="footer-column">
          <h4>General</h4>
          <ul>
            <li>Sign up</li>
            <li>Contacts</li>
            <li>About</li>
            <li>FAQ</li>
            <li>Partners</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>Post a job</li>
            <li>Search talents</li>
            <li>Company login</li>
            <li>Company advice</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Talents</h4>
          <ul>
            <li>Search jobs</li>
            <li>Talent login</li>
            <li>Talent advice</li>
          </ul>
        </div>
      </div>
      {/* Footer komponenti ichidagi bottom qismi */}
      <div className="footer-bottom">
        <div className="copyright">All rights reserved 2021</div>
        <div className="footer-socials">
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="#" aria-label="Telegram">
            <FaTelegramPlane />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
