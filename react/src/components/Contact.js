import React from 'react';
import './Contact.css';

const Contact = () => {
  const contactLinks = [
    {
      href: "https://www.linkedin.com/in/istiak-ahmd/",
      className: "contact-link linkedin",
      icon: "fab fa-linkedin"
    },
    {
      href: "https://github.com/IstiakAhmd",
      className: "contact-link github",
      icon: "fab fa-github"
    },
    {
      href: "https://www.facebook.com/share/15C1qPXbrS/",
      className: "contact-link facebook",
      icon: "fa-brands fa-facebook"
    },
    {
      href: "https://www.instagram.com/istiak.ahmd/",
      className: "contact-link instagram",
      icon: "fa-brands fa-instagram"
    },
    {
      href: "https://www.kaggle.com/istiakahmd",
      className: "contact-link kaggle",
      icon: "fa-brands fa-kaggle"
    },
    {
      href: "mailto:istiak6000@gmail.com",
      className: "contact-link email",
      icon: "fas fa-envelope"
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Let's Connect!</h2>
        <div className="contact-content">
          <p className="section-subtitle">
            Ready to collaborate on something amazing? Let's chat about data science, AI, 
            and all the cool things we can build together!
          </p>
        </div>
        <div className="contact-links">
          {contactLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href} 
              className={link.className}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
