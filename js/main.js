/**
 * Clientist Website - Main JavaScript
 * Handles smooth scrolling, mobile menu, scroll animations, and interactions
 */

document.addEventListener('DOMContentLoaded', function () {
    // ============================================
    // NAVIGATION
    // ============================================

    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Run on load

    // Mobile menu toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // SMOOTH SCROLLING
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // SCROLL ANIMATIONS (Fade In)
    // ============================================

    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserverOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // ============================================
    // ACTIVE NAVIGATION LINK
    // ============================================

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav a:not(.navbar-cta)');

    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ============================================
    // DYNAMIC YEAR IN FOOTER
    // ============================================

    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
    }

    // ============================================
    // PRICING CARD HOVER EFFECTS
    // ============================================

    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            pricingCards.forEach(c => c.style.transform = '');
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-5px)';
            }
        });

        card.addEventListener('mouseleave', function () {
            if (!this.classList.contains('featured')) {
                this.style.transform = '';
            }
        });
    });

    // ============================================
    // FEATURE CARD INTERACTIONS
    // ============================================

    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    // ============================================
    // FLOATING CARDS STAGGER ANIMATION
    // ============================================

    const floatingCards = document.querySelectorAll('.floating-card');

    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });

    // ============================================
    // STORE BADGE CLICK TRACKING
    // ============================================

    const storeBadges = document.querySelectorAll('.store-badge');

    storeBadges.forEach(badge => {
        badge.addEventListener('click', function (e) {
            // You can add analytics tracking here
            const storeName = this.querySelector('.store-badge-text span').textContent;
            console.log(`Store badge clicked: ${storeName}`);

            // If no real link is set, prevent default
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('App store link coming soon! The app is currently in development.');
            }
        });
    });

    // ============================================
    // QR CODE PLACEHOLDER INTERACTION
    // ============================================

    const qrPlaceholders = document.querySelectorAll('.qr-code-placeholder, .qr-placeholder');

    qrPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function () {
            alert('QR Code placeholder - Replace this with your actual QR code image by:\n\n1. Save your QR code as "qr-code.png" in the images folder\n2. Replace the placeholder div with an <img> tag\n\nSee the HTML comments for exact instructions.');
        });
    });

    // ============================================
    // PRELOAD CRITICAL RESOURCES
    // ============================================

    // Preload hero section images if any
    const heroImages = document.querySelectorAll('.hero img');
    heroImages.forEach(img => {
        if (img.dataset.src) {
            const preloadImg = new Image();
            preloadImg.src = img.dataset.src;
        }
    });

    // ============================================
    // CONSOLE WELCOME MESSAGE
    // ============================================

    console.log('%c🚀 Clientist Website', 'font-size: 24px; font-weight: bold; color: #8B5CF6;');
    console.log('%cManage Your Clients Like a Pro', 'font-size: 14px; color: #6B7280;');
    console.log('%c---', 'color: #E5E7EB;');
    console.log('%cNeed help? Contact: support@clientist.app', 'font-size: 12px; color: #9CA3AF;');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
