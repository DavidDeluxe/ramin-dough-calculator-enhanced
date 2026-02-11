// Add CSS animations
function addThemeStyles() {
    if (document.getElementById('theme-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'theme-styles';
    style.textContent = `
        #darkModeToggle svg, #screenWakeToggle svg {
            transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        }
        
        #darkModeToggle:hover svg, #screenWakeToggle:hover svg {
            transform: rotate(20deg) scale(1.1);
        }
        
        html {
            transition: background-color 0.4s ease, color 0.4s ease;
        }
    `;
    document.head.appendChild(style);
}

// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;

    // Check localStorage for dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        updateDarkModeIcon(true);
    } else {
        updateDarkModeIcon(false);
    }

    darkModeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add rotation animation
        const svg = this.querySelector('svg');
        if (svg) {
            svg.style.transition = 'transform 0.3s ease-in-out';
            svg.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                // Update the icon AFTER rotation completes
                document.documentElement.setAttribute('data-bs-theme', newTheme);
                localStorage.setItem('darkMode', newTheme === 'dark');
                updateDarkModeIcon(newTheme === 'dark');
                // Reset transform after update
                setTimeout(() => {
                    svg.style.transform = '';
                }, 50);
            }, 300);
        } else {
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('darkMode', newTheme === 'dark');
            updateDarkModeIcon(newTheme === 'dark');
        }
    });
}

function updateDarkModeIcon(isDark) {
    const button = document.getElementById('darkModeToggle');
    if (!button) {
        console.warn('darkModeToggle button not found');
        return;
    }
    
    // Remove old SVG
    const oldSvg = button.querySelector('svg');
    if (oldSvg) {
        oldSvg.remove();
    }
    
    // Create new SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('viewBox', '0 0 16 16');
    
    if (isDark) {
        // Sun icon for dark mode
        svg.innerHTML = '<path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>';
        console.log('Dark mode enabled - showing sun icon');
    } else {
        // Moon icon for light mode
        svg.innerHTML = '<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278"/><path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>';
        console.log('Light mode enabled - showing moon icon');
    }
    
    button.appendChild(svg);
}

// Screen Wake Lock Toggle
let wakeLock = null;

async function initScreenWakeLock() {
    const screenWakeToggle = document.getElementById('screenWakeToggle');
    if (!screenWakeToggle) return;

    // Check if Screen Wake Lock API is supported
    if (!('wakeLock' in navigator)) {
        screenWakeToggle.disabled = true;
        screenWakeToggle.title = 'Screen wake lock not supported in this browser';
        return;
    }

    // Check localStorage for wake lock preference
    const shouldKeepAwake = localStorage.getItem('screenWakeLock') === 'true';
    
    if (shouldKeepAwake) {
        try {
            await requestWakeLock();
        } catch (err) {
            console.error('Failed to acquire wake lock:', err);
        }
    } else {
        updateScreenWakeIcon(false);
    }

    screenWakeToggle.addEventListener('click', async function(e) {
        e.preventDefault();
        
        // Add rotation animation
        const svg = this.querySelector('svg');
        svg.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            svg.style.transform = '';
        }, 300);
        
        if (wakeLock) {
            // Release wake lock
            await wakeLock.release();
            wakeLock = null;
            localStorage.setItem('screenWakeLock', 'false');
            updateScreenWakeIcon(false);
        } else {
            // Request wake lock
            try {
                await requestWakeLock();
                localStorage.setItem('screenWakeLock', 'true');
                updateScreenWakeIcon(true);
            } catch (err) {
                console.error('Failed to acquire wake lock:', err);
                alert('Could not enable screen wake lock. Please check your browser permissions.');
            }
        }
    });

    // Re-acquire wake lock if the page regains visibility
    document.addEventListener('visibilitychange', async function() {
        if (!document.hidden && localStorage.getItem('screenWakeLock') === 'true' && !wakeLock) {
            try {
                await requestWakeLock();
            } catch (err) {
                console.error('Failed to re-acquire wake lock:', err);
            }
        }
    });
}

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        updateScreenWakeIcon(true);
    } catch (err) {
        throw err;
    }
}

function updateScreenWakeIcon(isActive) {
    const toggle = document.getElementById('screenWakeToggle');
    if (!toggle) return;

    if (isActive) {
        // Eye icon (screen is awake)
        toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>';
        toggle.title = 'Screen wake lock active - click to disable';
    } else {
        // Eye-slash icon (screen wake lock off)
        toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16"><path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 0-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/><path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.83zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.83 2.83zm3.171 6-12-12 .708-.708 12 12-.707.707z"/></svg>';
        toggle.title = 'Keep screen awake';
    }
}

// Initialize both features when DOM is ready
// This function should be called after the header is loaded
function initializeThemeAndWakeLock() {
    addThemeStyles();
    initDarkMode();
    initScreenWakeLock();
}

// Try to initialize immediately if buttons exist
if (document.getElementById('darkModeToggle') || document.getElementById('screenWakeToggle')) {
    initializeThemeAndWakeLock();
}

// Also initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // If buttons don't exist yet, wait a bit and try again
    if (!document.getElementById('darkModeToggle') && !document.getElementById('screenWakeToggle')) {
        setTimeout(() => {
            initializeThemeAndWakeLock();
        }, 100);
    } else {
        initializeThemeAndWakeLock();
    }
});
