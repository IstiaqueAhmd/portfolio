import React from 'react';
import './About.css';

const About = () => {
  const aboutCards = [
    {
      icon: 'fas fa-chart-pie',
      title: 'Data Wizardry',
      description: 'I dive deep into messy data and emerge with crystal-clear insights! Using advanced analytics and statistical magic to uncover patterns that drive smart decisions.'
    },
    {
      icon: 'fas fa-robot',
      title: 'AI & Machine Learning',
      description: 'Building intelligent systems that learn and adapt! From predictive models to neural networks, I create AI solutions that solve real-world challenges.'
    },
    {
      icon: 'fas fa-palette',
      title: 'Data Storytelling',
      description: 'Transforming complex data into beautiful, engaging visualizations that anyone can understand. Making data accessible and actionable for everyone!'
    }
  ];

  return (
    <section id="about">
      <div className="section-decoration top-left"></div>
      <div className="container">
        <h2 className="section-title">What I Do</h2>
        <p className="section-subtitle">
          I'm passionate about turning data into stories and building AI solutions that make the world a little bit better!
        </p>
        <div className="about-grid">
          {aboutCards.map((card, index) => (
            <div key={index} className="about-card">
              <i className={card.icon}></i>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="section-decoration bottom-right"></div>
    </section>
  );
};

export default About;
