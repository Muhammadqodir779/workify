import React from 'react';
import './Features.css';
import {
  FiUserPlus,
  FiBriefcase,
  FiMessageSquare,
  FiSearch,
} from 'react-icons/fi';

const Features = () => {
  const featuresData = [
    {
      icon: <FiUserPlus />,
      title: 'Professional recruiter',
      desc: 'Finding the best candidate is always hard.',
    },
    {
      icon: <FiBriefcase />,
      title: 'Find the right job you want fast',
      desc: 'Launch your career on Workify.',
    },
    {
      icon: <FiMessageSquare />,
      title: 'All professionals need some help',
      desc: 'As a pro recruiter, you need various skills to hire a great talent.',
    },
    {
      icon: <FiSearch />,
      title: 'Searching a job may be long and boring',
      desc: 'Landing a good gig can be hard, when you have a strong competition.',
    },
  ];

  return (
    <section className="features-section">
      <div className="features-grid">
        {featuresData.map((item, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
