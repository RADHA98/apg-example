const listbox = document.getElementById("listbox");
const menuButton = document.getElementById("menu-button");

let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        // Add the "show" class to display the list
        listbox.classList.add("show");

        // Set the focus to the first option when the menu opens
        const selectedOption = listbox.querySelector("[aria-selected='true']");
        if (selectedOption) {
            selectedOption.focus();
        } else {
            const firstOption = listbox.querySelector("[role='menuitem']");
            if (firstOption) {
                firstOption.setAttribute("tabindex", "0");
                firstOption.focus();
            }
        }
    } else {
        // Remove the "show" class to hide the list
        listbox.classList.remove("show");

        // Set the focus back to the menu button when the menu closes
        menuButton.focus();
    }

    // Update the aria-expanded attribute for the "ColorList" button
    menuButton.setAttribute("aria-expanded", isMenuOpen.toString());
}

function toggleSubMenu() {
    const submenu = document.querySelector(".submenu");
    submenu.classList.toggle("show");

    // Update the aria-expanded attribute for the "Black" color option
    const blackOption = document.querySelector(".colorlist [role='menuitem'][textContent='Black']");
    if (blackOption) {
        blackOption.setAttribute("aria-expanded", submenu.classList.contains("show").toString());
    }
}

function selectOption(option) {
    const selectedOption = listbox.querySelector("[aria-expanded='false']");
    if (selectedOption) {
        // selectedOption.setAttribute("aria-selected", "false");
        selectedOption.removeAttribute("tabindex");
    }

    // option.setAttribute("aria-selected", "true");
    option.setAttribute("tabindex", "0");
    option.focus();
}

function focusOnDarkGray() {
    const darkGrayOption = document.querySelector(".submenu [role='menuitem'][textContent='Dark Gray']");
    if (darkGrayOption) {
        selectOption(darkGrayOption);
    }
}

function navigateSubMenuDown() {
    const focusedOption = document.activeElement;
    const siblingOptions = focusedOption.parentElement.querySelectorAll("[role='menuitem']");
    const currentIndex = Array.from(siblingOptions).indexOf(focusedOption);
    const nextIndex = currentIndex + 1;
    const numOptions = siblingOptions.length;
    // Ensure the next index is within bounds
    const newIndex = nextIndex % numOptions;
    const nextOption = siblingOptions[newIndex];
    if (nextOption) {
        selectOption(nextOption);
    }
}

function navigateSubMenuUp() {
    const focusedOption = document.activeElement;
    const siblingOptions = focusedOption.parentElement.querySelectorAll("[role='menuitem']");
    const currentIndex = Array.from(siblingOptions).indexOf(focusedOption);
    const nextIndex = currentIndex - 1;
    const numOptions = siblingOptions.length;
    // Ensure the next index is within bounds
    const newIndex = (nextIndex + numOptions) % numOptions;
    const nextOption = siblingOptions[newIndex];
    if (nextOption) {
        selectOption(nextOption);
    }
}

menuButton.addEventListener("click", toggleMenu);

listbox.addEventListener("keydown", function (event) {
    const currentOption = event.target;

    if (event.key === "ArrowUp") {
        event.preventDefault();
        if (currentOption.previousElementSibling) {
            const previousElement = currentOption.previousElementSibling;
            previousElement.setAttribute("tabindex", "0");
            currentOption.setAttribute("tabindex", "-1");
            previousElement.focus();
        } else {
            const lastOption = listbox.lastElementChild;
            lastOption.focus();
        }
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (currentOption.nextElementSibling) {
            const nextElement = currentOption.nextElementSibling;
            nextElement.setAttribute("tabindex", "0");
            currentOption.setAttribute("tabindex", "-1");
            nextElement.focus();
        } else {
            const firstOption = listbox.firstElementChild;
            firstOption.focus();
        }
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
        if (currentOption.textContent === "Black") {
            // Toggle submenu visibility for the "Black" option
            toggleSubMenu();
            focusOnDarkGray(); // Set focus on the "Dark Gray" option
        }
    }
});

const submenu = document.querySelector(".submenu");
submenu.addEventListener("keydown", function (event) {
    const currentOption = event.target;
    if (event.key === "ArrowUp") {
        event.preventDefault();
        navigateSubMenuUp();
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        navigateSubMenuDown();
    }
});

document.addEventListener("click", function (event) {
    const target = event.target;
    if (isMenuOpen && target !== menuButton && !listbox.contains(target)) {
        toggleMenu();
    }
});

const colorOptions = document.querySelectorAll(".colorlist [role='menuitem']");
colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
        if (option.textContent === "Black") {
            toggleSubMenu();
            focusOnDarkGray();
        } else {
            selectOption(option);
            toggleMenu();
        }
    });
});

const submenuOptions = document.querySelectorAll(".submenu [role='menuitem']");
submenuOptions.forEach((option) => {
    option.addEventListener("click", function () {
        selectOption(option);
        toggleMenu();
    });
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isMenuOpen) {
        const submenu = document.querySelector(".submenu");
        if (submenu.classList.contains("show")) {
            submenu.classList.remove("show");
            // submenu.setAttribute("aria-expanded","false");
        } else {
            toggleMenu();
        }
    }
});
