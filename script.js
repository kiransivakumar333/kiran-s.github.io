

document.addEventListener('DOMContentLoaded', () => {
    const sections = [
        'home.html',
        'Projects.html',
        'Certificates.html',
        'AreaOfIntrest.html',
        'Skills.html',
        'Education.html'
    ];
    const contentDiv = document.getElementById('content');
    let currentIndex = 0;
    let isLoading = false; // Prevent multiple simultaneous calls

    // Function to load content dynamically
    const loadContent = async () => {
        if (isLoading || currentIndex >= sections.length) return;
        isLoading = true;

        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        spinner.innerHTML = 'Loading...';
        contentDiv.appendChild(spinner);

        try {
            const response = await fetch(sections[currentIndex]);
            if (!response.ok) throw new Error(`Failed to load content: ${sections[currentIndex]}`);

            const html = await response.text();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Append content
            contentDiv.appendChild(tempDiv);

            // Initialize slider if the section contains it
            if (tempDiv.querySelector('.slider-container')) {
                initializeSlider(tempDiv.querySelector('.slider-container'));
            }

            currentIndex++;
        } catch (error) {
            console.error('Error loading content:', error);
            spinner.innerHTML = 'Error loading content.';
        } finally {
            spinner.remove(); // Always remove the spinner
            isLoading = false;
        }
    };

    // Function to initialize the slider
    const initializeSlider = (container) => {
        const slider = container.querySelector('.slider');
        const slides = container.querySelectorAll('.slide');
        if (!slider || slides.length === 0) {
            console.warn('Slider or slides not found.');
            return;
        }

        let currentIndex = 0;

        const slideNext = () => {
            currentIndex = (currentIndex + 1) % slides.length; // Loop back to the first slide
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        // Optional: Auto-slide functionality
        setInterval(slideNext, 3000); // Automatically slide every 3 seconds
    };

    // Scroll event to detect nearing the bottom
    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 50) {
            loadContent();
        }
    });

    // Load initial content
    loadContent();

    // Select the menu icon and the menu items
const menuIcon = document.querySelector('.menu-icon');
const menuItems = document.querySelector('.menu-items');

// Add click event to toggle the menu visibility
menuIcon.addEventListener('click', () => {
menuItems.classList.toggle('active');
});
});
