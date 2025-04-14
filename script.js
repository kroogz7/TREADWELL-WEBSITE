// Main JavaScript for Tyrone Treadwell Fitness Coach Website

// Immediate execution to ensure all sections are visible even before DOMContentLoaded
(function() {
    // Fix for sections disappearing
    if (document.readyState === 'loading') {
        // Add a style tag to ensure all sections stay visible during page load
        const style = document.createElement('style');
        style.textContent = `
            body, html {
                height: auto !important;
                overflow-y: auto !important;
                scroll-behavior: smooth;
            }
            
            /* Strong layout fixes for hero section */
            .hero {
                display: flex !important;
                flex-direction: row !important;
                justify-content: space-between !important;
                align-items: center !important;
                gap: 3.75rem !important;
                min-height: 85vh !important;
                width: 100% !important;
                flex-wrap: nowrap !important;
                padding: 7.5rem 5% 5rem !important;
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            .hero-left {
                flex: 1 1 45% !important;
                max-width: 45% !important;
                width: 45% !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: flex-start !important;
                justify-content: center !important;
                text-align: left !important;
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            .hero-right {
                flex: 1 1 45% !important;
                max-width: 45% !important;
                width: 45% !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            .hero-slider {
                width: 100% !important;
                border-radius: 0.75rem !important;
                overflow: hidden !important;
                display: block !important;
                height: auto !important;
                max-width: 100% !important;
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            @media (max-width: 768px) {
                .hero {
                    flex-direction: column !important;
                    text-align: center !important;
                    padding: 6.25rem 1.25rem 3.75rem !important;
                    gap: 2.5rem !important;
                }
                
                .hero-left {
                    flex: 1 1 100% !important;
                    max-width: 100% !important;
                    width: 100% !important;
                    align-items: center !important;
                    margin-bottom: 1.25rem !important;
                    order: 1 !important;
                    text-align: center !important;
                }
                
                .hero-right {
                    flex: 1 1 100% !important;
                    max-width: 28.125rem !important;
                    width: 100% !important;
                    order: 2 !important;
                    margin: 0 auto !important;
                }
            }
            
            section, .section, footer,
            #video, #about, #testimonials, #apply,
            .about-container, .about-image, .about-text-container {
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
                height: auto !important;
                min-height: 3.125rem !important;
                transform: none !important;
                overflow: visible !important;
            }
            
            .about-container {
                display: flex !important;
            }
            
            /* Fix stacking */
            #video, #about, #testimonials, #apply, footer {
                position: relative;
                z-index: 1;
            }
            
            /* About section specific fix */
            #about {
                display: block !important;
                min-height: 25rem !important;
                padding: 5rem 0 !important;
            }
            
            .about-container {
                display: flex !important;
                flex-wrap: wrap !important;
            }
            
            .about-image, .about-text-container {
                min-height: 12.5rem !important;
            }

            /* Ensure video plays automatically */
            .video-embed-container video {
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            /* Hide play overlay */
            .video-play-overlay {
                display: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
            }
        `;
        document.head.appendChild(style);
        
        // Add listener for earliest possible moment to show all sections
        document.addEventListener('readystatechange', function() {
            if (document.readyState === 'interactive') {
                showAllSections();
            }
        });
    } else {
        // Document already interactive or complete
        showAllSections();
    }
    
    function showAllSections() {
        // Fix hero layout immediately
        const hero = document.querySelector('.hero');
        const heroLeft = document.querySelector('.hero-left');
        const heroRight = document.querySelector('.hero-right');
        
        if (hero) {
            hero.style.display = 'flex';
            hero.style.flexDirection = window.innerWidth <= 768 ? 'column' : 'row';
            hero.style.justifyContent = 'space-between';
            hero.style.alignItems = 'center';
            hero.style.opacity = '1';
            hero.style.visibility = 'visible';
        }
        
        if (heroLeft) {
            heroLeft.style.flex = window.innerWidth <= 768 ? '1 1 100%' : '1 1 45%';
            heroLeft.style.maxWidth = window.innerWidth <= 768 ? '100%' : '45%';
            heroLeft.style.width = window.innerWidth <= 768 ? '100%' : '45%';
            heroLeft.style.display = 'flex';
            heroLeft.style.flexDirection = 'column';
            heroLeft.style.alignItems = window.innerWidth <= 768 ? 'center' : 'flex-start';
            heroLeft.style.opacity = '1';
            heroLeft.style.visibility = 'visible';
            heroLeft.style.textAlign = window.innerWidth <= 768 ? 'center' : 'left';
            
            if (window.innerWidth <= 768) {
                heroLeft.style.order = '1';
            }
        }
        
        if (heroRight) {
            heroRight.style.flex = window.innerWidth <= 768 ? '1 1 100%' : '1 1 45%';
            heroRight.style.maxWidth = window.innerWidth <= 768 ? '28.125rem' : '45%';
            heroRight.style.width = window.innerWidth <= 768 ? '100%' : '45%';
            heroRight.style.display = 'flex';
            heroRight.style.justifyContent = 'center';
            heroRight.style.alignItems = 'center';
            heroRight.style.opacity = '1';
            heroRight.style.visibility = 'visible';
            
            if (window.innerWidth <= 768) {
                heroRight.style.order = '2';
                heroRight.style.margin = '0 auto';
            }
        }
        
        // Make hero and all other sections visible
        const allSections = document.querySelectorAll('section, .section, .hero, .hero-left, .hero-right, .hero-slider, #video, #about, #testimonials, #apply, footer, .about-container, .about-image, .about-text-container');
        allSections.forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.display = el.classList.contains('about-container') ? 'flex' : 
                              (el.classList.contains('hero') ? 'flex' :
                               (el.tagName.toLowerCase() === 'section' || el.tagName.toLowerCase() === 'footer' ? 'block' : ''));
            el.style.height = 'auto';
            el.style.transform = 'none';
            el.style.overflow = 'visible';
            
            // Remove any AOS attributes that might cause the section to disappear
            if (el.hasAttribute('data-aos')) {
                el.removeAttribute('data-aos');
                el.removeAttribute('data-aos-duration');
                el.removeAttribute('data-aos-delay');
            }
        });
        
        // Specific fix for About section
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.style.display = 'block';
            aboutSection.style.visibility = 'visible';
            aboutSection.style.opacity = '1';
            aboutSection.style.height = 'auto';
            aboutSection.style.minHeight = '25rem';
            
            const aboutContainer = aboutSection.querySelector('.about-container');
            if (aboutContainer) {
                aboutContainer.style.display = 'flex';
                aboutContainer.style.visibility = 'visible';
                aboutContainer.style.opacity = '1';
                
                const aboutImage = aboutContainer.querySelector('.about-image');
                const aboutText = aboutContainer.querySelector('.about-text-container');
                
                if (aboutImage) {
                    aboutImage.style.display = 'block';
                    aboutImage.style.visibility = 'visible';
                    aboutImage.style.opacity = '1';
                }
                
                if (aboutText) {
                    aboutText.style.display = 'block';
                    aboutText.style.visibility = 'visible'; 
                    aboutText.style.opacity = '1';
                }
            }
        }

        // Ensure video autoplays
        const video = document.getElementById('coach-video');
        if (video) {
            video.play();
            
            // Remove any overlay or play buttons
            const videoContainer = video.closest('.video-embed-container');
            if (videoContainer) {
                const overlay = videoContainer.querySelector('.video-play-overlay');
                if (overlay) {
                    overlay.style.display = 'none';
                    overlay.style.opacity = '0';
                    overlay.style.visibility = 'hidden';
                }
            }
        }
    }
})();

// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Disable AOS animations to prevent sections from disappearing
    if (typeof AOS !== 'undefined') {
        AOS.init({
            disable: true // Disable all AOS animations for now
        });
    }
    
    // Force all sections to be visible
    document.querySelectorAll('section, .section, .hero, #video, #about, #testimonials, #apply, footer').forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        section.style.display = 'block';
        section.style.height = 'auto';
        section.style.overflow = 'visible';
        section.style.transform = 'none';
        
        // Remove AOS attributes
        section.removeAttribute('data-aos');
        section.removeAttribute('data-aos-duration');
        section.removeAttribute('data-aos-delay');
    });
    
    // Check for console errors
    console.log('All sections should now be visible.');
    
    // Ensure main content is visible
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.style.display = 'block';
        mainContent.style.visibility = 'visible';
        mainContent.style.height = 'auto';
        mainContent.style.overflow = 'visible';
    }

    // Restore slider functionality
    try {
        const heroSwiper = new Swiper('.hero-slider .swiper', {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            preloadImages: true,
            updateOnImagesReady: true,
            observer: true,
            observeParents: true
        });
    } catch(e) {
        console.error('Error initializing Swiper:', e);
    }

    // Make sure the video plays automatically
    const video = document.getElementById('coach-video');
    if (video) {
        // Remove any play overlay from the video
        const videoPlayOverlay = document.querySelector('.video-play-overlay');
        if (videoPlayOverlay) {
            videoPlayOverlay.remove();
        }
        
        // Ensure the video is set to autoplay
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.muted = true; // Explicitly mute to ensure autoplay works
        
        // Force the video to play
        video.play().catch(error => {
            console.warn('Video autoplay failed:', error);
        });
    }

    // Disable the video play overlay functionality
    document.querySelectorAll('.video-play-overlay').forEach(overlay => {
        overlay.style.display = 'none';
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    });

    // Smart Header Behavior
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let scrollThreshold = 100;
    
    // Scroll behavior: hide on scroll down, show on scroll up
    window.addEventListener('scroll', function() {
        let scrollTop = window.scrollY;
        
        // Add scrolled class for background change
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scrolling down & past threshold
            navbar.classList.add('hidden');
        } else {
            // Scrolling up or at top
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const navMenu = document.querySelector('.navbar ul');
    const navLinks = document.querySelectorAll('.navbar a');
    
    // Open mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
    
    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
            
            // Add smooth scrolling to internal links
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop;
                    window.scrollTo({
                        top: offsetTop - 100, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Progress bar for scrolling
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.getElementById('progressBar');
    const heroSection = document.querySelector('.hero') || document.getElementById('home');
    let heroHeight = 0;
    
    // Set initial state of progress container
    if (progressContainer) {
        progressContainer.style.opacity = '0';
        progressContainer.style.pointerEvents = 'none';
    }
    
    if (heroSection) {
        heroHeight = heroSection.offsetHeight;
    }
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.scrollY;
        let docHeight = document.body.offsetHeight - window.innerHeight;
        let scrollPercent = scrollTop / docHeight;
        
        // Only show progress bar after scrolling starts
        if (progressContainer) {
            if (scrollTop > 100) {
                progressContainer.style.opacity = '1';
                progressContainer.style.pointerEvents = 'auto';
                
                // Hide after scrolling past hero
                if (heroHeight > 0 && scrollTop > heroHeight) {
                    progressContainer.style.opacity = '0';
                    progressContainer.style.pointerEvents = 'none';
                }
            } else {
                // Keep hidden at the very top
                progressContainer.style.opacity = '0';
                progressContainer.style.pointerEvents = 'none';
            }
        }
        
        if (progressBar) {
            progressBar.style.width = scrollPercent * 100 + '%';
        }
    });

    // Video modal functionality
    const videoThumbnail = document.querySelector('.video-container');
    const videoModal = document.querySelector('.video-modal');
    const videoModalClose = document.querySelector('.video-modal-close');
    const videoIframe = document.querySelector('.video-modal-content iframe');
    const videoElement = document.querySelector('.video-embed-container video');

    // REMOVE click-to-play code and make sure video autoplays
    if (videoElement) {
        // Ensure autoplay attributes are set
        videoElement.setAttribute('autoplay', '');
        videoElement.setAttribute('muted', '');
        videoElement.setAttribute('playsinline', '');
        videoElement.muted = true;
        
        // Force play the video
        videoElement.play().catch(error => {
            console.warn('Video autoplay failed:', error);
        });
    }

    if (videoThumbnail && videoModal && videoModalClose) {
        // Open modal on thumbnail click
        videoThumbnail.addEventListener('click', function() {
            videoModal.classList.add('active');
            // Set iframe src only when modal is opened (performance improvement)
            if (videoIframe && videoIframe.getAttribute('data-src')) {
                videoIframe.setAttribute('src', videoIframe.getAttribute('data-src'));
            }
        });

        // Close modal on X click
        videoModalClose.addEventListener('click', function() {
            videoModal.classList.remove('active');
            // Reset iframe src to pause video
            if (videoIframe) {
                const currentSrc = videoIframe.getAttribute('src');
                videoIframe.setAttribute('data-src', currentSrc);
                videoIframe.setAttribute('src', '');
            }
        });

        // Close modal on background click
        videoModal.addEventListener('click', function(event) {
            if (event.target === videoModal) {
                videoModal.classList.remove('active');
                // Reset iframe src to pause video
                if (videoIframe) {
                    const currentSrc = videoIframe.getAttribute('src');
                    videoIframe.setAttribute('data-src', currentSrc);
                    videoIframe.setAttribute('src', '');
                }
            }
        });
    }

    // Scroll to top button
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll-to-top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add AOS attributes to elements if not already present
    document.querySelectorAll('.video-container, .about-image, .about-text-container').forEach(el => {
        if (!el.hasAttribute('data-aos')) {
            el.setAttribute('data-aos', 'fade-up');
            el.setAttribute('data-aos-duration', '800');
        }
    });
    
    document.querySelectorAll('.testimonial-card, .form-card').forEach((el, index) => {
        if (!el.hasAttribute('data-aos')) {
            el.setAttribute('data-aos', 'fade-up');
            el.setAttribute('data-aos-delay', (index * 100).toString());
            el.setAttribute('data-aos-duration', '800');
        }
    });

    // Scroll down arrow functionality
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            const nextSection = document.querySelector('.hero').nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Initialize Swiper slider if not already done
    try {
        if (!window.heroSwiperInitialized) {
            window.heroSwiperInitialized = true;
            const heroSwiperInstance = new Swiper('.hero-slider .swiper', {
                effect: 'fade',
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }
    } catch(e) {
        console.error('Error initializing additional Swiper:', e);
    }
    
    // Additional smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not(.scroll-processed)').forEach(anchor => {
        anchor.classList.add('scroll-processed');
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Account for fixed navbar
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const mobileMenuEl = document.querySelector('nav.navbar ul');
            if (mobileMenuEl && mobileMenuEl.classList.contains('active')) {
                mobileMenuEl.classList.remove('active');
            }
        });
    });

    // Enhanced mobile menu toggle
    const menuToggleBtn = document.querySelector('.mobile-menu-toggle:not(.processed)');
    const menuCloseBtn = document.querySelector('.mobile-menu-close:not(.processed)');
    const navbarMenu = document.querySelector('nav.navbar ul');

    if (menuToggleBtn && navbarMenu) {
        menuToggleBtn.classList.add('processed');
        menuToggleBtn.addEventListener('click', () => {
            navbarMenu.classList.add('active');
        });
    }

    if (menuCloseBtn && navbarMenu) {
        menuCloseBtn.classList.add('processed');
        menuCloseBtn.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
        });
    }

    // Enhanced force layout fix for hero section
    const heroSectionEl = document.querySelector('.hero:not(.layout-fixed)');
    const heroLeftEl = document.querySelector('.hero-left');
    const heroRightEl = document.querySelector('.hero-right');
    
    if (heroSectionEl && heroLeftEl && heroRightEl) {
        heroSectionEl.classList.add('layout-fixed');
        
        // Apply proper layout based on screen size
        const applyLayoutStyles = () => {
            if (window.innerWidth > 768) {
                // Desktop layout
                heroSectionEl.style.display = 'flex';
                heroSectionEl.style.flexDirection = 'row';
                heroSectionEl.style.alignItems = 'center';
                heroSectionEl.style.justifyContent = 'space-between';
                
                heroLeftEl.style.flex = '1 1 45%';
                heroLeftEl.style.maxWidth = '45%';
                heroLeftEl.style.order = '1';
                
                heroRightEl.style.flex = '1 1 45%';
                heroRightEl.style.maxWidth = '45%';
                heroRightEl.style.order = '2';
            } else {
                // Mobile layout
                heroSectionEl.style.flexDirection = 'column';
                heroSectionEl.style.alignItems = 'center';
                
                heroLeftEl.style.flex = '1 1 100%';
                heroLeftEl.style.maxWidth = '100%';
                heroLeftEl.style.order = '1';
                
                heroRightEl.style.flex = '1 1 100%';
                heroRightEl.style.maxWidth = '450px';
                heroRightEl.style.order = '2';
            }
        };
        
        // Apply layout immediately
        applyLayoutStyles();
        
        // Update on resize
        if (!window.layoutResizeHandlerAdded) {
            window.layoutResizeHandlerAdded = true;
            window.addEventListener('resize', applyLayoutStyles);
        }
    }

    // Enhanced video autoplay management
    const videoElementEl = document.getElementById('coach-video');
    if (videoElementEl && !videoElementEl.hasAttribute('autoplay-processed')) {
        videoElementEl.setAttribute('autoplay-processed', 'true');
        videoElementEl.muted = true;
        videoElementEl.play().catch(error => {
            console.log('Autoplay prevented:', error);
        });
    }
}); 