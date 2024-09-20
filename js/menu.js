document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu');
    const mainMenu = document.getElementById('main-menu');
    const subMenu = document.getElementById('sub-menu');
    const collaborationSubMenu = document.getElementById('collaboration-submenu');
    const canvasPaintingsButton = document.getElementById('canvas-paintings');
    const collaborationButton = document.getElementById('collaborations');
    const aboutLink = document.querySelector('.about-link');
    const contactLink = document.querySelector('.contact-link');
    const subMenuItems = subMenu.querySelectorAll('a');
    const collaborationSubMenuItems = collaborationSubMenu.querySelectorAll('a');

    // Variables to track previous state of submenus
    let wasSubMenuVisible = false;
    let wasCollaborationSubMenuVisible = false;
    let wasMainMenuVisible = false;  // Track the visibility of the main menu

    // Toggle main menu visibility
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click event from bubbling up
        const isMenuVisible = mainMenu.classList.toggle('show');
        
        if (!isMenuVisible) {
            // If the main menu is being closed, track the current state of the submenus
            wasSubMenuVisible = subMenu.classList.contains('show');
            wasCollaborationSubMenuVisible = collaborationSubMenu.classList.contains('show');

            subMenu.classList.remove('show');
            collaborationSubMenu.classList.remove('show');
        } else {
            // If the main menu is being reopened, restore the state of the submenus
            if (wasSubMenuVisible) {
                subMenu.classList.add('show');
                canvasPaintingsButton.classList.add('selected-menu-item');
            }
            if (wasCollaborationSubMenuVisible) {
                collaborationSubMenu.classList.add('show');
                collaborationButton.classList.add('selected-menu-item');
            }
        }

        wasMainMenuVisible = isMenuVisible;  // Track the visibility of the main menu
    });

    // Handle About and Contact menu links
    [aboutLink, contactLink].forEach(link => {
        link.addEventListener('click', () => {
            clearSelectedStates();
            link.classList.add('active');
        });
    });

    // Handle Canvas Paintings button
    canvasPaintingsButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click event from bubbling up
        clearSelectedStates();
        if (!subMenu.classList.contains('show')) {
            subMenu.classList.add('show');
            canvasPaintingsButton.classList.add('selected-menu-item');
        } else {
            subMenu.classList.remove('show');
            canvasPaintingsButton.classList.remove('selected-menu-item');
        }
    });

    // Handle Collaborations button
    collaborationButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click event from bubbling up
        clearSelectedStates();
        if (!collaborationSubMenu.classList.contains('show')) {
            collaborationSubMenu.classList.add('show');
            collaborationButton.classList.add('selected-menu-item');
        } else {
            collaborationSubMenu.classList.remove('show');
            collaborationButton.classList.remove('selected-menu-item');
        }
    });

    // Handle Submenu item selection
    subMenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            clearSubmenuSelections();
            item.classList.add('selected');
            canvasPaintingsButton.classList.add('selected-menu-item');
        });
    });

    // Handle Collaboration submenu item selection
    collaborationSubMenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            clearSubmenuSelections();
            item.classList.add('selected');
            collaborationButton.classList.add('selected-menu-item');
        });
    });

    // Close all menus and submenus when clicking outside
    document.addEventListener('click', (event) => {
        const menuElements = [menuToggle, mainMenu, subMenu, collaborationSubMenu, canvasPaintingsButton, collaborationButton, aboutLink, contactLink];
        
        if (!menuElements.some(el => el.contains(event.target))) {
            if (mainMenu.classList.contains('show')) {
                wasSubMenuVisible = subMenu.classList.contains('show');
                wasCollaborationSubMenuVisible = collaborationSubMenu.classList.contains('show');
            }

            // Close main menu and submenus
            mainMenu.classList.remove('show');
            subMenu.classList.remove('show');
            collaborationSubMenu.classList.remove('show');

            // Set the state of the main menu to closed
            wasMainMenuVisible = false;
        }
    });

    // Clear selected states when navigating to a new page or clicking on different menu items
    function clearSelectedStates() {
        [aboutLink, contactLink, canvasPaintingsButton, collaborationButton].forEach(item => {
            item.classList.remove('active', 'selected-menu-item');
        });
        clearSubmenuSelections();
        subMenu.classList.remove('show');
        collaborationSubMenu.classList.remove('show');
    }

    // Clear selected status for submenu items
    function clearSubmenuSelections() {
        subMenuItems.forEach(item => {
            item.classList.remove('selected');
        });
        collaborationSubMenuItems.forEach(item => {
            item.classList.remove('selected');
        });
    }

    // Maintain selected state on page load based on the current URL
    function maintainSelectedStateOnLoad() {
        const currentUrl = window.location.href;

        subMenuItems.forEach(item => {
            if (currentUrl.includes(item.getAttribute('href'))) {
                item.classList.add('selected');
                canvasPaintingsButton.classList.add('selected-menu-item');
            }
        });

        collaborationSubMenuItems.forEach(item => {
            if (currentUrl.includes(item.getAttribute('href'))) {
                item.classList.add('selected');
                collaborationButton.classList.add('selected-menu-item');
            }
        });

        if (currentUrl.includes(aboutLink.getAttribute('href'))) {
            aboutLink.classList.add('active');
        }

        if (currentUrl.includes(contactLink.getAttribute('href'))) {
            contactLink.classList.add('active');
        }
    }

    // Call function to maintain the selected state on page load
    maintainSelectedStateOnLoad();
});

