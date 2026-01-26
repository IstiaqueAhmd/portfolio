// ─────────────────────────────────────────────────────────────────────────────
// Neural Network Background
// ─────────────────────────────────────────────────────────────────────────────

class NeuralNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.mouse = { x: null, y: null, radius: 200 };
        this.maxDistance = 180; // Connection distance

        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.resize();
        this.createNodes();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createNodes() {
        this.nodes = [];
        // More nodes for denser network
        const nodeCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);

        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2.5 + 1.5,
                opacity: Math.random() * 0.4 + 0.4,
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
    }

    updateNodes() {
        for (const node of this.nodes) {
            // Update position
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges with padding
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

            // Pulse animation
            node.pulsePhase += 0.02;
            const pulse = Math.sin(node.pulsePhase) * 0.2 + 0.8;
            node.currentOpacity = node.opacity * pulse;

            // Mouse interaction - nodes are attracted slightly
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = node.x - this.mouse.x;
                const dy = node.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    node.x += dx * force * 0.015;
                    node.y += dy * force * 0.015;
                }
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections between nearby nodes
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const nodeA = this.nodes[i];
                const nodeB = this.nodes[j];

                const dx = nodeA.x - nodeB.x;
                const dy = nodeA.y - nodeB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.maxDistance) {
                    // Calculate opacity based on distance
                    const opacity = (1 - distance / this.maxDistance) * 0.4;

                    // Draw connection line
                    this.ctx.beginPath();
                    this.ctx.moveTo(nodeA.x, nodeA.y);
                    this.ctx.lineTo(nodeB.x, nodeB.y);
                    this.ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.stroke();
                }
            }
        }

        // Draw connections to mouse
        if (this.mouse.x !== null && this.mouse.y !== null) {
            for (const node of this.nodes) {
                const dx = node.x - this.mouse.x;
                const dy = node.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const opacity = (1 - distance / this.mouse.radius) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(node.x, node.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }

        // Draw nodes
        for (const node of this.nodes) {
            // Node glow
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.radius * 4
            );
            gradient.addColorStop(0, `rgba(0, 229, 255, ${node.currentOpacity * 0.6})`);
            gradient.addColorStop(0.5, `rgba(0, 229, 255, ${node.currentOpacity * 0.2})`);
            gradient.addColorStop(1, 'rgba(0, 229, 255, 0)');

            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Node core
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 229, 255, ${node.currentOpacity})`;
            this.ctx.fill();
        }
    }

    animate() {
        this.updateNodes();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createNodes();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Floating Particles
// ─────────────────────────────────────────────────────────────────────────────

class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.particleCount = 20;
        this.init();
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle(i);
        }
    }

    createParticle(index) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = (Math.random() * 8) + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';

        // Random size
        const size = Math.random() * 3 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random glow intensity
        const glowIntensity = Math.random() * 10 + 5;
        particle.style.boxShadow = `0 0 ${glowIntensity}px rgba(0, 229, 255, 0.8)`;

        this.container.appendChild(particle);
    }
}



// ─────────────────────────────────────────────────────────────────────────────
// Typing Effect for Stats (Optional Enhancement)
// ─────────────────────────────────────────────────────────────────────────────

function animateStats() {
    const stats = document.querySelectorAll('.stat-value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'statPop 0.5s ease forwards';
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// ─────────────────────────────────────────────────────────────────────────────
// Button Ripple Effect
// ─────────────────────────────────────────────────────────────────────────────

function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();

            ripple.style.cssText = `
                position: absolute;
                width: 100px;
                height: 100px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${e.clientX - rect.left - 50}px;
                top: ${e.clientY - rect.top - 50}px;
                pointer-events: none;
            `;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation if not exists
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            @keyframes statPop {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Parallax Effect on Mouse Move
// ─────────────────────────────────────────────────────────────────────────────

function initParallax() {
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        if (heroContent) {
            heroContent.style.transform = `translate(${x * -5}px, ${y * -5}px)`;
        }
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarNav = document.getElementById('navbar-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Mobile menu toggle
    if (navbarToggle && navbarNav) {
        navbarToggle.addEventListener('click', () => {
            navbarToggle.classList.toggle('active');
            navbarNav.classList.toggle('active');
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarToggle.classList.remove('active');
                navbarNav.classList.remove('active');
            });
        });

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navbarNav.classList.contains('active')) {
                navbarToggle.classList.remove('active');
                navbarNav.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Update active nav link
    function updateActiveNavLink() {
        let current = '';
        const offset = 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Initial check
    updateActiveNavLink();
}

// ─────────────────────────────────────────────────────────────────────────────
// Smooth Scroll (Updated)
// ─────────────────────────────────────────────────────────────────────────────

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Form Handling
// ─────────────────────────────────────────────────────────────────────────────

function initFormHandling() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';

                // Reset form
                this.reset();

                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Section Reveal Animation
// ─────────────────────────────────────────────────────────────────────────────

function initSectionReveal() {
    const sections = document.querySelectorAll('.section:not(.hero)');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add revealed styles
    if (!document.querySelector('#reveal-style')) {
        const style = document.createElement('style');
        style.id = 'reveal-style';
        style.textContent = `
            .section.revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Initialize Everything
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Neural Network Background
    new NeuralNetwork('neural-network');

    // Initialize Floating Particles
    new ParticleSystem('particles');

    // Initialize Navigation
    initNavigation();

    // Initialize Smooth Scroll
    initSmoothScroll();

    // Initialize Stats Animation
    animateStats();

    // Initialize Button Ripple Effect
    initRippleEffect();

    // Initialize Parallax Effect
    initParallax();

    // Initialize Form Handling
    initFormHandling();

    // Initialize Section Reveal
    initSectionReveal();

    // Log initialization
    console.log('%c ORPHEUS AI ', 'background: #00e5ff; color: #021a24; font-weight: bold; padding: 4px 8px; border-radius: 4px;', 'Website initialized successfully');
});

