document.addEventListener('DOMContentLoaded', () => {
    const catFactElement = document.getElementById('cat-fact');
    const newFactBtn = document.getElementById('new-fact-btn');
    const catImageElement = document.getElementById('cat-image');
    const newImageBtn = document.getElementById('new-image-btn');
    const interactiveCat = document.getElementById('interactive-cat');

    // Navigation elements
    const pawMenuBtn = document.getElementById('paw-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');

    const CAT_FACT_API_URL = 'https://catfact.ninja/fact';
    const CAT_IMAGE_API_URL = 'https://cataas.com/cat';

    // Navigation Menu Functionality
    function toggleMenu() {
        const isOpen = navMenu.classList.contains('open');

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        navMenu.classList.add('open');
        navOverlay.classList.add('open');
        pawMenuBtn.innerHTML = '✕';
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('open');
        navOverlay.classList.remove('open');
        pawMenuBtn.innerHTML = '🐾';
        document.body.style.overflow = '';
    }

    // Event listeners for navigation
    pawMenuBtn.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on navigation links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();

            // Scroll to top for navigation (since we don't have actual pages)
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // You could add page routing logic here
            const page = link.getAttribute('href').substring(1);
            console.log(`Navigating to: ${page}`);
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    async function fetchCatFact() {
        try {
            catFactElement.textContent = 'Loading a purrfect fact...';
            const response = await fetch(CAT_FACT_API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            catFactElement.textContent = data.fact;
        } catch (error) {
            console.error("Failed to fetch cat fact:", error);
            catFactElement.textContent = 'Could not fetch a cat fact. Meow-be later?';
        }
    }

    function fetchCatImage() {
        // Add a timestamp to prevent caching issues
        const timestamp = new Date().getTime();
        catImageElement.src = `${CAT_IMAGE_API_URL}?timestamp=${timestamp}`;
    }

    function fetchNewRandomCatImage() {
        const calicoCats = ['orange', 'ginger', 'tabby', 'calico'];
        const randomColor = calicoCats[Math.floor(Math.random() * calicoCats.length)];
        const randomQuery = Math.random().toString(36).substring(7);
        catImageElement.src = `https://cataas.com/cat/says/Meow?color=${randomColor}&${randomQuery}`;
    }

    newFactBtn.addEventListener('click', fetchCatFact);
    newImageBtn.addEventListener('click', fetchNewRandomCatImage);

    interactiveCat.addEventListener('click', () => {
        interactiveCat.classList.add('clicked');
        // Change text content playfully with calico-themed messages
        const playfulTexts = ['Meow! 🧡', 'Purrrr... 🐾', 'ᓚᘏᗢ', 'Feed me! 🍰', 'Nap time! 😴', 'Calico power! 🧡🖤🤍'];
        interactiveCat.textContent = playfulTexts[Math.floor(Math.random() * playfulTexts.length)];
        setTimeout(() => {
            interactiveCat.classList.remove('clicked');
            // Reset to original cat after animation
            interactiveCat.textContent = 'ᓚᘏᗢ';
        }, 1500);
    });

    // Initial fetches
    fetchCatFact();
    // Initial image is set in HTML with orange color to match calico theme
});
