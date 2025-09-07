document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navUl = document.querySelector('nav ul');

    mobileMenu.addEventListener('click', () => {
        navUl.classList.toggle('active');
    });

    // Smooth scrolling for navigation links (only for # links)
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only handle in-page links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();

                // Close mobile menu if open
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                }

                const targetId = this.hash.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll-triggered fade-in animation for sections, cards, and gallery
    const fadeEls = document.querySelectorAll('section, .class-item, .trainer-item, .service-item, .testimonial-item, .article-card, .pricing-card, .why-item, .faq-item, .gallery-thumb, .animated-fade-in');
    fadeEls.forEach(el => {
        if (el.classList.contains('gallery-thumb') || el.classList.contains('animated-fade-in')) {
            el.classList.remove('visible');
        } else {
            el.classList.add('hidden');
        }
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('gallery-thumb') || entry.target.classList.contains('animated-fade-in')) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.add('visible');
                        entry.target.classList.remove('hidden');
                    }
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        fadeEls.forEach(el => observer.observe(el));
    } else {
        // Fallback for browsers without IntersectionObserver
        fadeEls.forEach(el => {
            if (el.classList.contains('gallery-thumb') || el.classList.contains('animated-fade-in')) {
                el.classList.add('visible');
            } else {
                el.classList.add('visible');
                el.classList.remove('hidden');
            }
        });
    }
});
