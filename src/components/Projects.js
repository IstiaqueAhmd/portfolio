import React from 'react';
import './Projects.css';

function Projects() {
  const projects = [
    {
      id: 1,
      title: "Project One",
      description: "A brief description of your first project. Explain what technologies you used and what problem it solves.",
      technologies: ["React", "JavaScript", "CSS"],
      githubLink: "https://github.com/yourusername/project-one",
      liveLink: "https://project-one-demo.com",
      image: "/images/project1.jpg"
    },
    {
      id: 2,
      title: "Project Two",
      description: "A brief description of your second project. Highlight the key features and your role in development.",
      technologies: ["Node.js", "Express", "MongoDB"],
      githubLink: "https://github.com/yourusername/project-two",
      liveLink: "https://project-two-demo.com",
      image: "/images/project2.jpg"
    },
    {
      id: 3,
      title: "Project Three",
      description: "A brief description of your third project. Mention any challenges you overcame and lessons learned.",
      technologies: ["Python", "Django", "PostgreSQL"],
      githubLink: "https://github.com/yourusername/project-three",
      liveLink: "https://project-three-demo.com",
      image: "/images/project3.jpg"
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      GitHub
                    </a>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
