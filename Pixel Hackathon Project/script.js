document.addEventListener('DOMContentLoaded', () => {
    const loaderPage = document.getElementById('loader-page');
    const mainContent = document.getElementById('main-content');

    // Element 1: Loader Page
    setTimeout(() => {
        loaderPage.style.opacity = '0';
        loaderPage.style.visibility = 'hidden';
        mainContent.style.opacity = '1';
    }, 2000);

    // Element 4: Navbar
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close nav menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburgerMenu.contains(e.target) && !navMenu.contains(e.target)) {
            hamburgerMenu.classList.remove('open');
            navMenu.classList.remove('open');
        }
    });

    // Element 5: Smooth scroll navigation with page transition simulation
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Page transition simulation
                mainContent.classList.add('fade-out');
                setTimeout(() => {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    mainContent.classList.remove('fade-out');
                    hamburgerMenu.classList.remove('open');
                    navMenu.classList.remove('open');
                }, 300);
            }
        });
    });

    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Element 8: Ripple Effect
    const rippleButton = document.querySelector('.ripple-button');
    if (rippleButton) {
        rippleButton.addEventListener('click', function(e) {
            const button = this;
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            const rect = button.getBoundingClientRect();
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - radius}px`;
            circle.style.top = `${e.clientY - rect.top - radius}px`;
            circle.classList.add('ripple');

            const ripple = button.querySelector('.ripple');
            if (ripple) {
                ripple.remove();
            }

            button.appendChild(circle);

            // Simulate booking action
            setTimeout(() => {
                alert('Booking inquiry sent! We\'ll contact you soon.');
            }, 600);
        });
    }

    // Element 9: Text Animation (Scroll-Based Sizing)
    const scrollText = document.getElementById('scroll-text');
    if (scrollText) {
        const initialFontSize = parseFloat(getComputedStyle(scrollText).fontSize);

        const updateScrollText = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollProgress = Math.min(scrollY / maxScroll, 1);
            
            // Calculate new size based on scroll progress
            const minSize = 20;
            const maxSize = 120;
            const newSize = initialFontSize + (scrollProgress * 50);
            const clampedSize = Math.max(minSize, Math.min(maxSize, newSize));
            
            scrollText.style.fontSize = `${clampedSize}px`;
        };

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateScrollText();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Element 3: Image Grid with Custom Cursor
    const customCursor = document.querySelector('.custom-cursor');
    const imageGridItems = document.querySelectorAll('.image-grid-item');

    if (customCursor && imageGridItems.length > 0) {
        let cursorVisible = false;

        const updateCursorPosition = (e) => {
            customCursor.style.left = `${e.clientX}px`;
            customCursor.style.top = `${e.clientY}px`;
        };

        document.addEventListener('mousemove', updateCursorPosition);

        imageGridItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                customCursor.style.opacity = '1';
                customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                customCursor.style.backgroundColor = 'rgba(59, 130, 246, 0.7)';
                cursorVisible = true;
            });
            
            item.addEventListener('mouseleave', () => {
                customCursor.style.opacity = '0';
                customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
                customCursor.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                cursorVisible = false;
            });
        });

        // Hide cursor when not over grid items
        document.addEventListener('mouseleave', () => {
            if (!cursorVisible) {
                customCursor.style.opacity = '0';
            }
        });
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const travelType = contactForm.querySelector('select').value;
            const message = contactForm.querySelector('textarea').value;

            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate form submission
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert(`Thank you ${name}! Your inquiry about ${travelType || 'travel'} has been received. We'll contact you at ${email} soon.`);
                contactForm.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.element-showcase, .team-member-card, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Element 10: Mystery Element (Three.js Globe)
    const mysteryElementContainer = document.getElementById('mystery-element-container');
    let scene, camera, renderer, globe;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    function initThreeJS() {
        if (!mysteryElementContainer || !window.THREE) return;

        // Scene
        scene = new THREE.Scene();

        // Camera
        camera = new THREE.PerspectiveCamera(
            75, 
            mysteryElementContainer.clientWidth / mysteryElementContainer.clientHeight, 
            0.1, 
            1000
        );
        camera.position.z = 2.5;

        // Renderer
        renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        renderer.setSize(mysteryElementContainer.clientWidth, mysteryElementContainer.clientHeight);
        renderer.setClearColor(0x000000, 0);
        mysteryElementContainer.appendChild(renderer.domElement);

        // Globe (Sphere with wireframe)
        const geometry = new THREE.SphereGeometry(0.8, 32, 32);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x3b82f6, 
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        // Add some points for stars/destinations
        const pointsGeometry = new THREE.BufferGeometry();
        const pointsCount = 100;
        const positions = new Float32Array(pointsCount * 3);

        for (let i = 0; i < pointsCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }

        pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const pointsMaterial = new THREE.PointsMaterial({ 
            color: 0x60a5fa, 
            size: 0.02,
            transparent: true,
            opacity: 0.6
        });
        const points = new THREE.Points(pointsGeometry, pointsMaterial);
        scene.add(points);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        // Event Listeners for Interaction
        const canvas = renderer.domElement;
        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mouseup', onMouseUp, false);
        canvas.addEventListener('mousemove', onMouseMove, false);
        canvas.addEventListener('mouseleave', onMouseUp, false);

        // Touch events for mobile
        canvas.addEventListener('touchstart', onTouchStart, false);
        canvas.addEventListener('touchend', onTouchEnd, false);
        canvas.addEventListener('touchmove', onTouchMove, false);

        // Handle window resize
        window.addEventListener('resize', onWindowResize, false);
    }

    function onMouseDown(event) {
        isDragging = true;
        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;
    }

    function onMouseUp() {
        isDragging = false;
    }

    function onMouseMove(event) {
        if (!isDragging || !globe) return;

        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        const rotationSpeed = 0.01;
        globe.rotation.y += deltaMove.x * rotationSpeed;
        globe.rotation.x += deltaMove.y * rotationSpeed;

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;
    }

    function onTouchStart(event) {
        if (event.touches.length === 1) {
            isDragging = true;
            previousMousePosition.x = event.touches[0].clientX;
            previousMousePosition.y = event.touches[0].clientY;
        }
    }

    function onTouchEnd() {
        isDragging = false;
    }

    function onTouchMove(event) {
        if (!isDragging || !globe || event.touches.length !== 1) return;
        
        event.preventDefault();

        const deltaMove = {
            x: event.touches[0].clientX - previousMousePosition.x,
            y: event.touches[0].clientY - previousMousePosition.y
        };

        const rotationSpeed = 0.01;
        globe.rotation.y += deltaMove.x * rotationSpeed;
        globe.rotation.x += deltaMove.y * rotationSpeed;

        previousMousePosition.x = event.touches[0].clientX;
        previousMousePosition.y = event.touches[0].clientY;
    }

    function onWindowResize() {
        if (!camera || !renderer || !mysteryElementContainer) return;
        
        camera.aspect = mysteryElementContainer.clientWidth / mysteryElementContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mysteryElementContainer.clientWidth, mysteryElementContainer.clientHeight);
    }

    function animate() {
        if (!renderer || !scene || !camera || !globe) return;
        
        requestAnimationFrame(animate);
        
        // Auto-rotation when not dragging
        if (!isDragging) {
            globe.rotation.x += 0.003;
            globe.rotation.y += 0.005;
        }
        
        renderer.render(scene, camera);
    }

    // Initialize Three.js when the page loads
    function initializeThreeJS() {
        if (typeof THREE !== 'undefined' && mysteryElementContainer) {
            initThreeJS();
            animate();
        } else {
            // Retry after a short delay if Three.js hasn't loaded yet
            setTimeout(initializeThreeJS, 100);
        }
    }

    // Initialize Three.js
    initializeThreeJS();

    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(30, 41, 59, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(51, 65, 85, 0.95)';
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });

    // Team member card interactions
    const teamCards = document.querySelectorAll('.team-member-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // CTA button interactions
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            document.getElementById('destinations').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Scroll progress indicator
    function updateScrollProgress() {
        const scrollProgress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        // Create progress bar if it doesn't exist
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${scrollProgress}%;
                height: 3px;
                background: linear-gradient(90deg, #3b82f6, #8b5cf6);
                z-index: 10000;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        } else {
            progressBar.style.width = `${scrollProgress}%`;
        }
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg activated
            document.body.style.animation = 'rainbow 2s infinite';
            
            // Add rainbow animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.animation = '';
                document.head.removeChild(style);
            }, 5000);
            
            // Show secret message
            const message = document.createElement('div');
            message.textContent = '🎉 Secret traveler mode activated! 🌍';
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                color: white;
                padding: 1rem 2rem;
                border-radius: 1rem;
                z-index: 10001;
                font-weight: bold;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                animation: bounce 0.5s ease;
            `;
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                document.body.removeChild(message);
            }, 3000);
            
            konamiCode = [];
        }
    });

    // Add bounce animation for easter egg
    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translate(-50%, -50%) translateY(0);
            }
            40% {
                transform: translate(-50%, -50%) translateY(-20px);
            }
            60% {
                transform: translate(-50%, -50%) translateY(-10px);
            }
        }
    `;
    document.head.appendChild(bounceStyle);

    // Performance optimization: Throttle scroll events
    function throttle(func, wait) {
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

    // Add smooth reveal animations for elements
    const revealElements = document.querySelectorAll('.hover-image-container, .ripple-button, #mystery-element-container');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(el);
    });

    // Add revealed class styles
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(revealStyle);

    // Add floating animation to some elements
    const floatingElements = document.querySelectorAll('.team-photo, .custom-cursor');
    floatingElements.forEach((el, index) => {
        el.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
    });

    // Add float keyframes
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(floatStyle);

    // Console log for developers
    console.log(`
    🌍 Welcome to Wanderlust Web! 🌍
    
    This website features:
    ✈️  Smooth animations and transitions
    🎨  Modern design with gradients
    📱  Fully responsive layout
    🎮  Interactive Three.js globe
    🎯  Custom cursor effects
    🎊  Hidden easter eggs (try the Konami code!)
    
    Built with love for travelers and adventurers.
    Happy exploring! 🚀
    `);

    // Add a subtle animation to the logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseover', () => {
            logo.style.transform = 'scale(1.05)';
            logo.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseout', () => {
            logo.style.transform = 'scale(1)';
        });
    }

    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.textContent) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    heroTitle.innerHTML += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                } else {
                    heroTitle.innerHTML = originalText; // Ensure proper HTML is restored
                }
            };
            typeWriter();
        }, 2500); // Start after loader finishes
    }
});
        