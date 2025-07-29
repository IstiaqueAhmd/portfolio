import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={isScrolled ? 'scrolled' : ''}>
      <div className="nav-container">
        <a href="#" className="logo">Istiaque</a>
        <button 
          className="menu-toggle"
          onClick={handleMenuToggle}
          style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          <i className="fas fa-bars"></i>
        </button>
        <ul className={isMobileMenuOpen ? 'active' : ''}>
          <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
          <li><a href="#education" onClick={(e) => handleNavClick(e, '#education')}>Education</a></li>
          <li><a href="#experience" onClick={(e) => handleNavClick(e, '#experience')}>Experience</a></li>
          <li><a href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a></li>
          <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
