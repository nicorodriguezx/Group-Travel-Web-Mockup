// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Testimonials Slider
    const testimonialsSlider = document.getElementById('testimonialsSlider');
    if (testimonialsSlider) {
        const testimonials = testimonialsSlider.querySelectorAll('.testimonial');
        const prevBtn = document.getElementById('prevTestimonial');
        const nextBtn = document.getElementById('nextTestimonial');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;

        function showSlide(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
            showSlide(currentSlide);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto-advance testimonials every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // Tour Expand/Collapse Functionality
    const tourCards = document.querySelectorAll('.tour-card-expandable');
    
    // Function to expand a specific tour card
    function expandTour(card) {
        const expandBtn = card.querySelector('.tour-expand-btn');
        
        // Close other expanded tours (optional - remove if you want multiple open)
        tourCards.forEach(otherCard => {
            if (otherCard !== card && otherCard.classList.contains('expanded')) {
                otherCard.classList.remove('expanded');
                const otherBtn = otherCard.querySelector('.tour-expand-btn');
                if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        card.classList.add('expanded');
        if (expandBtn) {
            expandBtn.setAttribute('aria-expanded', 'true');
        }
        
        // Scroll to tour if it's being expanded (smooth scroll)
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
    
    // Function to collapse a tour card
    function collapseTour(card) {
        const expandBtn = card.querySelector('.tour-expand-btn');
        card.classList.remove('expanded');
        if (expandBtn) {
            expandBtn.setAttribute('aria-expanded', 'false');
        }
    }
    
    // Function to toggle tour expansion
    function toggleTour(card) {
        const isExpanded = card.classList.contains('expanded');
        if (isExpanded) {
            collapseTour(card);
        } else {
            expandTour(card);
        }
    }
    
    tourCards.forEach(card => {
        const expandBtn = card.querySelector('.tour-expand-btn');
        const tourSummary = card.querySelector('.tour-summary');
        
        // Initialize aria-expanded
        if (expandBtn) {
            expandBtn.setAttribute('aria-expanded', 'false');
        }
        
        // Click on expand button
        if (expandBtn) {
            expandBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleTour(card);
            });
        }
        
        // Click on summary to expand (but not on buttons/links)
        if (tourSummary) {
            tourSummary.addEventListener('click', function(e) {
                // Don't expand if clicking on buttons or links
                if (e.target.closest('a') || e.target.closest('button')) {
                    return;
                }
                toggleTour(card);
            });
        }
    });
    
    // Auto-expand tour if hash is present in URL
    if (window.location.hash) {
        const targetTour = document.querySelector(window.location.hash);
        if (targetTour && targetTour.classList.contains('tour-card-expandable')) {
            // Small delay to ensure page is loaded
            setTimeout(() => {
                expandTour(targetTour);
            }, 300);
        }
    }

    // Tour Tabs (only work when tour is expanded)
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            const tourCard = this.closest('.tour-card-expandable');
            
            if (tourCard) {
                // Remove active class from all tabs and content in this tour
                const allTabs = tourCard.querySelectorAll('.tab-btn');
                const allContents = tourCard.querySelectorAll('.tab-content');
                
                allTabs.forEach(tab => tab.classList.remove('active'));
                allContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                const targetContent = tourCard.querySelector(`#${tabName}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Pre-fill form from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const tourParam = urlParams.get('tour');
        const dateParam = urlParams.get('date');

        if (tourParam) {
            const tourSelect = document.getElementById('tour');
            if (tourSelect) {
                tourSelect.value = tourParam;
            }
        }

        if (dateParam) {
            const dateInput = document.getElementById('travelDate');
            if (dateInput) {
                dateInput.value = dateParam;
            }
        }

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formMessage = document.getElementById('formMessage');
            const formData = new FormData(contactForm);
            
            // Simulate form submission (in a real application, this would send to a server)
            setTimeout(function() {
                formMessage.textContent = 'Thank you for your message! We\'ll get back to you within 24 hours.';
                formMessage.className = 'form-message success';
                contactForm.reset();
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Hide message after 5 seconds
                setTimeout(function() {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 500);
        });
    }


    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    // If it's a tour card, expand it first
                    if (target.classList.contains('tour-card-expandable')) {
                        expandTour(target);
                    } else {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }
        });
    });

    // Add animation on scroll (optional enhancement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll('.tour-card, .feature-card, .blog-post, .team-member');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

