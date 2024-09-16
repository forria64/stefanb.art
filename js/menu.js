document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu');
    const mainMenu = document.getElementById('main-menu');
    const subMenu = document.getElementById('sub-menu');
    const canvasPaintingsButton = document.getElementById('canvas-paintings');
    const mainMenuItems = mainMenu.querySelectorAll('a, button'); // Select all main menu items
    const subMenuItems = subMenu.querySelectorAll('a'); // Select all submenu items

    // Track the submenu visibility state
    let wasSubMenuVisible = false;

    // Toggle main menu visibility
    menuToggle.addEventListener('click', () => {
        const isMenuVisible = mainMenu.classList.toggle('show');
        if (!isMenuVisible) {
            // If the main menu is closed, also close the submenu
            wasSubMenuVisible = subMenu.classList.contains('show'); // Track if submenu was open
            subMenu.classList.remove('show');
            canvasPaintingsButton.classList.remove('active');
        } else {
            // If the main menu is reopened and submenu was visible, show it again
            if (wasSubMenuVisible) {
                subMenu.classList.add('show');
                canvasPaintingsButton.classList.add('active');
            }
        }
    });

    // Show submenu when "canvas paintings" button is clicked (do not toggle off)
    canvasPaintingsButton.addEventListener('click', () => {
        if (!subMenu.classList.contains('show')) {
            subMenu.classList.add('show');
            canvasPaintingsButton.classList.add('active');
        }
    });

    // Close submenu when selecting another option in the main menu
    mainMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item !== canvasPaintingsButton) { // If it's not the canvas paintings button
                subMenu.classList.remove('show'); // Hide the submenu
                canvasPaintingsButton.classList.remove('active'); // Remove active state from canvas paintings button
            }
            // Set the active state for the selected menu item
            mainMenuItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
        });
    });

    // Add click event to submenu items to highlight them
    subMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Set the active state for the selected submenu item
            subMenuItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');

            // Remove the 'selected' class from all main menu items when a submenu item is selected
            mainMenuItems.forEach(i => i.classList.remove('selected'));
            canvasPaintingsButton.classList.add('selected'); // Keep the 'canvas paintings' button highlighted
        });
    });

    // Highlight the current page menu item
    highlightCurrentPage();
});

// Function to keep the selected menu item highlighted on page load
function highlightCurrentPage() {
    const currentLocation = window.location.href;
    const menuItems = document.querySelectorAll('#main-menu a, #main-menu button, #sub-menu a');
    
    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('selected');
        }
    });
}

