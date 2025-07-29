import React from 'react';
import './Education.css';

const Education = () => {
  return (
    <section id="education">
      <div className="container">
        <h2 className="section-title">My Learning Journey</h2>
        <div className="education-grid">
          <div className="education-card">
            <i className="fa-solid fa-university"></i>
            <h3>
              <a 
                href="https://www.bracu.ac.bd/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="education-link"
              >
                Brac University
              </a>
            </h3>
            <p>
              Bachelor of Science in Computer Science<br/>
              Specialized in Data Science, Machine Learning, and Software Engineering. 
              Built a strong foundation in algorithms, statistics, and intelligent systems!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
