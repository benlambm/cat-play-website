document.addEventListener('DOMContentLoaded', () => {
    const catFactElement = document.getElementById('cat-fact');
    const newFactBtn = document.getElementById('new-fact-btn');
    const catImageElement = document.getElementById('cat-image');
    const newImageBtn = document.getElementById('new-image-btn');
    const interactiveCat = document.getElementById('interactive-cat');

    const CAT_FACT_API_URL = 'https://catfact.ninja/fact';
    const CAT_IMAGE_API_URL = 'https://cataas.com/cat';

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
        const randomQuery = Math.random().toString(36).substring(7);
        catImageElement.src = `https://cataas.com/cat/says/Miao?${randomQuery}`;
    }


    newFactBtn.addEventListener('click', fetchCatFact);
    newImageBtn.addEventListener('click', fetchNewRandomCatImage);

    interactiveCat.addEventListener('click', () => {
        interactiveCat.classList.add('clicked');
        // Change text content playfully
        const playfulTexts = ['Meow!', 'Purrrr...', 'ᓚᘏᗢ', 'Feed me!', 'Nap time!'];
        interactiveCat.textContent = playfulTexts[Math.floor(Math.random() * playfulTexts.length)];
        setTimeout(() => {
            interactiveCat.classList.remove('clicked');
            // Reset to original text or keep the new one for variety
            // interactiveCat.textContent = 'ᓚᘏᗢ'; 
        }, 500); // Duration of the animation
    });

    // Initial fetches
    fetchCatFact();
    // Initial image is set in HTML, new image button fetches a new one.
});
