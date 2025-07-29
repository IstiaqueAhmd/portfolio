import React from 'react';
import './Experience.css';

const Experience = () => {
  const techStack = [
    'Python', 'LLMs', 'RAG Pipelines', 'Chatbots', 'Gen AI', 'ML Automation', 'Deep Learning'
  ];

  return (
    <section id="experience">
      <div className="section-decoration top-left"></div>
      <div className="container">
        <h2 className="section-title">Professional Adventures</h2>
        <div className="experience-grid">
          <div className="experience-card">
            <i className="fas fa-briefcase"></i>
            <h3>
              <a 
                href="https://www.joinventureai.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="experience-link"
              >
                Join Venture AI
              </a>
            </h3>
            <h4 className="job-title">Data Scientist & AI Engineer</h4>
            <p>
              Creating cutting-edge AI magic! Building intelligent chatbots, RAG pipelines, 
              and generative AI applications that revolutionize how businesses operate. 
              Specializing in AI automation and end-to-end machine learning systems.
            </p>
            <div className="tech-stack">
              {techStack.map((tech, index) => (
                <span key={index} className="tech">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
