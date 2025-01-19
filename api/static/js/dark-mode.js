// static/js/dark-mode.js

const darkMode = localStorage.getItem('darkMode');
const darkModeIcon = document.getElementById('darkModeIcon');

// Enable dark mode
const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    document.querySelectorAll('.bg-light').forEach((el) => el.classList.add('dark-mode'));
    localStorage.setItem('darkMode', 'enabled');
    darkModeIcon.classList.replace('bi-moon', 'bi-sun'); // Change icon to sun
};

// Disable dark mode
const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    document.querySelectorAll('.bg-light').forEach((el) => el.classList.remove('dark-mode'));
    localStorage.setItem('darkMode', 'disabled');
    darkModeIcon.classList.replace('bi-sun', 'bi-moon'); // Change icon to moon
};

// Load the saved preference
if (darkMode === 'enabled') {
    enableDarkMode();
}

// Add event listener to the toggle button
document.getElementById('darkModeToggle').addEventListener('click', () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});
