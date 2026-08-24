/**
 * Istiaque Ahmed - Portfolio Scripts
 * Warm-minimalist interactivity, navigation spy, modal controls, and micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScroll();
    initSkillsToggle();
    initContactModal();
    initEmailCopy();
    initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. Navigation & Scroll Spying
   -------------------------------------------------------------------------- */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero-section, .footer-section');

    // Mobile Menu Toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isActive = mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active', isActive);
            mobileToggle.setAttribute('aria-expanded', isActive);
        });

        // Close on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Scroll state & Active Spy
    const handleScroll = () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Nav Link Spy
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 160;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = id;
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${currentSectionId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/* --------------------------------------------------------------------------
   2. Smooth Scroll Anchor Links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 76;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   3. Skills Extended Drawer Toggle
   -------------------------------------------------------------------------- */
function initSkillsToggle() {
    const moreBtn = document.getElementById('btn-more-skills');
    const extendedDrawer = document.getElementById('skills-extended');

    if (moreBtn && extendedDrawer) {
        moreBtn.addEventListener('click', () => {
            extendedDrawer.classList.toggle('active');
            if (extendedDrawer.classList.contains('active')) {
                moreBtn.querySelector('.skill-name').textContent = 'Less';
                extendedDrawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                moreBtn.querySelector('.skill-name').textContent = 'More';
            }
        });
    }
}

/* --------------------------------------------------------------------------
   4. Contact Modal Dialog
   -------------------------------------------------------------------------- */
function initContactModal() {
    const modal = document.getElementById('contact-modal');
    const openBtn = document.getElementById('btn-open-contact');
    const closeBtn = document.getElementById('modal-close');
    const backdrop = document.getElementById('modal-backdrop');
    const form = document.getElementById('modal-contact-form');

    if (!modal) return;

    const openModal = (e) => {
        if (e) e.preventDefault();
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    // Escape key listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Form Submission Handling
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnContent = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
                    submitBtn.style.backgroundColor = '#16A34A';
                    form.reset();
                    showToast('Message sent successfully!');
                    setTimeout(() => {
                        closeModal();
                        submitBtn.innerHTML = originalBtnContent;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.disabled = false;
                    }, 2000);
                } else {
                    throw new Error('Form submission error');
                }
            } catch (err) {
                // Fallback simulation or mailto
                submitBtn.innerHTML = '<span>Opening Mail Client...</span>';
                const name = formData.get('name') || '';
                const message = formData.get('message') || '';
                window.location.href = `mailto:istiaque.inbox@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
                setTimeout(() => {
                    closeModal();
                    submitBtn.innerHTML = originalBtnContent;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
}

/* --------------------------------------------------------------------------
   5. Email Copy to Clipboard & Toast
   -------------------------------------------------------------------------- */
function initEmailCopy() {
    const emailLink = document.getElementById('copy-email-btn');

    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = 'istiaque.inbox@gmail.com';

            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showToast('Copied istiaque.inbox@gmail.com to clipboard! 📋');
                }).catch(() => {
                    window.location.href = `mailto:${email}`;
                });
            } else {
                window.location.href = `mailto:${email}`;
            }
        });
    }
}

function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3200);
}

/* --------------------------------------------------------------------------
   6. Subtle Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.trait-card, .skill-card, .project-card, .exp-card, .process-step, .contact-card-banner');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        animatedElements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i % 3 * 0.08}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i % 3 * 0.08}s`;
            observer.observe(el);
        });
    }
}
