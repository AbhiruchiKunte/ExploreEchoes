// --- FIREBASE SDK IMPORTS ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";


// --- FIREBASE CONFIGURATION ---
// This is the configuration from your original file.
const firebaseConfig = {
    apiKey: "AIzaSyAmk9dEz4cBSQHTM_YUsPEPaY0Ld643fz8",
    authDomain: "exploreechoes-73c74.firebaseapp.com",
    projectId: "exploreechoes-73c74",
    storageBucket: "exploreechoes-73c74.appspot.com", // Corrected storage bucket URL
    messagingSenderId: "936836633672",
    appId: "1:936836633672:web:f9079c4eed54bc3abdf47d",
    measurementId: "G-K03KYZ71KZ"
};

// --- INITIALIZE FIREBASE & SERVICES ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();  

// --- DOMContentLoaded Event Listener ---
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
    const heroTitle = document.querySelector('.text-gradient');
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
        

// --- FIREBASE INTEGRATION LOGIC ---
    
    const authContainer = document.getElementById('auth-container');
    const teamGrid = document.getElementById('team-grid');
    const contactForm = document.getElementById('contact-form');
    const notificationModal = document.getElementById('notification-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Helper function to show notifications
    function showModal(message) {
        if (modalMessage) modalMessage.textContent = message;
        if (notificationModal) notificationModal.classList.add('show');
    }

    // Event listener to close the modal
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            if (notificationModal) notificationModal.classList.remove('show');
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.querySelector('.slider-container');
    // Exit if the slider container isn't on the page
    if (!sliderContainer) {
        return;
    }

    const prevButton = sliderContainer.querySelector('.slider-button.prev');
    const nextButton = sliderContainer.querySelector('.slider-button.next');
    const radioButtons = Array.from(sliderContainer.querySelectorAll('input[type="radio"]'));
    const numSlides = radioButtons.length;

    function changeSlide(direction) {
        const currentIndex = radioButtons.findIndex(rb => rb.checked);
        
        // The modulo operator (%) handles the circular loop logic elegantly.
        let nextIndex = (currentIndex + direction + numSlides) % numSlides;
        
        // Check the new radio button to trigger the CSS change
        radioButtons[nextIndex].checked = true;
    }

    // Event listeners for the previous and next buttons
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            changeSlide(-1); 
        });

        nextButton.addEventListener('click', () => {
            changeSlide(1); 
        });
    }

    // Add automatic sliding
    setInterval(() => {
        changeSlide(1);
     }, 5000); 
});

    // FEATURE 1: AUTHENTICATION
    onAuthStateChanged(auth, (user) => {
    if (!authContainer) return;
    if (user) {
        // User is signed in
        authContainer.innerHTML = `
            <div class="flex items-center space-x-2">
                <img src="${user.photoURL}" alt="User" class="w-8 h-8 rounded-full border-2 border-blue-400"/>
                <button id="logout-btn" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-bold hover:bg-red-600 transition flex items-center space-x-1">
                    <i class="fas fa-sign-out-alt"></i> 
                    <span>Logout</span>
                </button>
            </div>
        `;
        document.getElementById('logout-btn').addEventListener('click', () => signOut(auth));
    } else {
        // User is signed out
        authContainer.innerHTML = `
            <button id="login-btn" class="px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-bold hover:bg-blue-600 transition flex items-center space-x-1">
                <i class="fas fa-user"></i>
                <span>Login</span>
            </button>
        `;
        document.getElementById('login-btn').addEventListener('click', () => signInWithPopup(auth, provider));
    }
});

    // FEATURE 2: DYNAMIC GUIDES FROM FIRESTORE
    async function fetchAndDisplayGuides() {
        if (!teamGrid) return;
        try {
            const guidesSnapshot = await getDocs(collection(db, "guides"));
            if (guidesSnapshot.empty) {
                teamGrid.innerHTML = '<p class="text-center col-span-full text-slate-400">Our guides are currently on an adventure! Check back later.</p>';
                return;
            }
            let guidesHtml = "";
            guidesSnapshot.forEach((doc) => {
                const guide = doc.data();
                guidesHtml += `
                    <div class="team-member-card">
                        <div class="team-info">
                            <h4 class="team-name">${guide.name}</h4>
                            <p class="team-role">${guide.role}</p>
                            <p class="team-bio">${guide.bio}</p>
                        </div>
                        <img src="${guide.photoUrl}" alt="${guide.name}" class="team-photo">
                    </div>
                `;
            });
            teamGrid.innerHTML = guidesHtml;
        } catch (error) {
            console.error("Error fetching guides: ", error);
            teamGrid.innerHTML = '<p class="text-center text-red-500 col-span-full">Could not load guide information. Please try again later.</p>';
        }
    }
    fetchAndDisplayGuides(); // Call the function to load guides

    // FEATURE 3: REAL-TIME CONTACT FORM
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonContent = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin ml-2"></i>';
            submitButton.disabled = true;

            const inquiry = {
                name: contactForm.querySelector('input[type="text"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                travelType: contactForm.querySelector('select').value,
                message: contactForm.querySelector('textarea').value,
                submittedAt: new Date()
            };

            try {
                await addDoc(collection(db, "inquiries"), inquiry);
                showModal("Thank you! Your inquiry has been sent successfully.");
                contactForm.reset();
            } catch (error) {
                console.error("Error submitting inquiry: ", error);
                showModal("Something went wrong. Please try again.");
            } finally {
                submitButton.innerHTML = originalButtonContent;
                submitButton.disabled = false;
            }
        });
    }   