import React, { useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  useEffect(() => {
    // Create floating decorative shapes
    const createFloatingShapes = () => {
      const shapes = ['circle', 'triangle', 'square'];
      const colors = ['var(--gradient-1)', 'var(--gradient-2)', 'var(--gradient-3)'];
      
      for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        shape.className = `floating-shape ${shapeType}`;
        
        // Random positioning
        shape.style.top = Math.random() * 100 + '%';
        shape.style.left = Math.random() * 100 + '%';
        shape.style.animationDelay = Math.random() * 6 + 's';
        shape.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(shape);
      }
    };

    createFloatingShapes();

    // Cleanup function to remove shapes when component unmounts
    return () => {
      const shapes = document.querySelectorAll('.floating-shape');
      shapes.forEach(shape => shape.remove());
    };
  }, []);

  const handleButtonClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Hi, I'm Istiaque!</h1>
        <p className="hero-subtitle">Data Scientist | ML Engineer | AI Enthusiast</p>
        <p className="hero-description">
          I transform complex data into beautiful insights and build intelligent systems that make a difference in the world!
        </p>
        <div className="cta-buttons">
          <a 
            href="#about" 
            className="btn btn-primary"
            onClick={(e) => handleButtonClick(e, '#about')}
          >
            <i className="fas fa-rocket"></i>
            Explore My Work
          </a>
          <a 
            href="#contact" 
            className="btn btn-secondary"
            onClick={(e) => handleButtonClick(e, '#contact')}
          >
            <i className="fas fa-coffee"></i>
            Let's Chat!
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Discover more below</span>
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  );
};

export default Hero;
