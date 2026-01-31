import React from 'react';
import './Hero.css';
import { FiBriefcase } from 'react-icons/fi';
// Rasmni import qilamiz
import heroImg from '../../assets/Group.png';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Find aspiring talents and great employers</h1>
        <p className="hero-description">
          Finding the best candidate is always hard. Tell us what you are
          looking for and choose one from among the best.
        </p>

        <div className="search-box">
          <div className="search-input-group">
            <label>Hire a talent</label>
            <div className="input-with-icon">
              <FiBriefcase className="input-icon" />
              <input type="text" placeholder="Who are you looking for?" />
            </div>
          </div>

          <div className="search-divider"></div>

          <div className="search-input-group">
            <label>Find a job</label>
            <div className="input-with-icon">
              <FiBriefcase className="input-icon" />
              <input type="text" placeholder="What job are you looking for?" />
            </div>
          </div>

          <button className="btn-search">Search</button>
        </div>
      </div>

      <div className="hero-image-container">
        <img src={heroImg} alt="Workify Hero" className="hero-illustration" />
      </div>
    </section>
  );
};

export default Hero;
