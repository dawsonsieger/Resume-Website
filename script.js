const openButton = document.getElementById('open-sidebar-button');
const navbar = document.getElementById('navbar');

const media = window.matchMedia("(width < 700px)")

media.addEventListener('change', (e) => updateNavbar(e))

function trapFocus(container) {
    const focusableSelectors = [
        'a[href]', 'button:not([disabled])', 'textarea:not([disabled])',
        'input:not([disabled])', 'select:not([disabled])', '[tabindex]:not([tabindex="-1"])'
    ];
    const focusables = container.querySelectorAll(focusableSelectors.join(','));
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    container.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    });

    container.addEventListener('keydown', handleKeyDown);

    // Clean up when sidebar closes
    container._focusTrapHandler = handleKeyDown;
}

function updateNavbar(e) {
    const isMobile = e.matches
    console.log(isMobile)
    if (isMobile) {
        navbar.setAttribute('inert', '')
    }
    else {
        //desktop device
        navbar.removeAttribute('inert')
    }
}

function openSidebar() {
    navbar.classList.add('show')
    openButton.setAttribute('aria-expanded', 'true')
    navbar.removeAttribute('inert')
    // Trap focus inside the sidebar
    trapFocus(navbar);

    // Move initial focus to first focusable element
    const firstFocusable = navbar.querySelector('a, button');
    if (firstFocusable) firstFocusable.focus();
}

function closeSidebar() {
    navbar.classList.remove('show')
    openButton.setAttribute('aria-expanded', 'false')
    navbar.setAttribute('inert', '')
    openButton.focus();
}



const navLinks = document.querySelectorAll('nav a')
navLinks.forEach((link => {
    link.addEventListener('click', () => {
        closeSidebar()
    })
}))

updateNavbar(media)

