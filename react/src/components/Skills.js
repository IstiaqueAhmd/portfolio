import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      icon: 'fab fa-python',
      title: 'Programming Languages',
      skills: ['Python', 'R', 'SQL', 'Java', 'JavaScript']
    },
    {
      icon: 'fas fa-brain',
      title: 'AI & Machine Learning',
      skills: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'Keras', 'XGBoost']
    },
    {
      icon: 'fas fa-database',
      title: 'Data Tools',
      skills: ['Pandas', 'NumPy', 'Jupyter', 'Apache Spark', 'Hadoop']
    },
    {
      icon: 'fas fa-chart-bar',
      title: 'Visualization Magic',
      skills: ['Matplotlib', 'Seaborn', 'Plotly', 'Tableau', 'Power BI']
    },
    {
      icon: 'fas fa-cloud',
      title: 'Cloud & DevOps',
      skills: ['AWS', 'Azure', 'Docker', 'Git', 'Linux']
    },
    {
      icon: 'fas fa-code',
      title: 'Web Development',
      skills: ['HTML/CSS', 'React', 'Node.js', 'Spring Boot', 'MySQL']
    }
  ];

  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">My Superpowers</h2>
        <p className="section-subtitle">
          A magical toolkit for conquering data challenges and building amazing AI solutions!
        </p>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>
                <i className={category.icon}></i>
                {category.title}
              </h3>
              <div className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
