function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        if (screen.id === screenId) {
            screen.classList.add('active');
        } else {
            screen.classList.remove('active');
        }
    });
    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function setActiveNav(navId) {
    const navLinks = document.querySelectorAll('.menu-options a');
    navLinks.forEach(link => {
        link.classList.remove('active-nav');
    });
    document.getElementById(navId).classList.add('active-nav');
}

const configurations = [
    { scale: 1.1, rotation: -5 },
    { scale: 1.2, rotation: 10 },
    { scale: 1.05, rotation: -3 },
    { scale: 1.15, rotation: 8 },
    { scale: 0.95, rotation: -8 },
];

// Get all the buttons
const buttons = document.querySelectorAll('.game-button');

// Add an event listener to each button
buttons.forEach((button) => {
    button.addEventListener('mouseover', () => {
        // Randomly choose a configuration
        const config = configurations[Math.floor(Math.random() * configurations.length)];

        // Set the scale and rotation
        button.style.transform = `scale(${config.scale}) rotate(${config.rotation}deg)`;
    });

    button.addEventListener('mouseout', () => {
        // Reset the scale and rotation
        button.style.transform = 'scale(1) rotate(0deg)';
    });
});