
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
    const selectedOption = listbox.querySelector("[aria-expanded='true']");
    if (selectedOption) {
        selectedOption.removeAttribute("tabindex");
    }

    option.setAttribute("tabindex", "0");
    option.focus();
}

function focusOnDarkGray() {
    const darkGrayOption = document.querySelector("#listbox .submenu.show [role='menuitem']");
    const submenu = document.querySelector(".submenu");

    if (darkGrayOption && submenu.classList.contains("show")) {
        selectOption(darkGrayOption);
    } 
}

function focusOnBlack() {
    const blackOption = document.querySelector(".colorlist .items2");
    if (blackOption) {
        selectOption(blackOption);
    }
}

function navigateRedBlackUp() {
    // const colorOptions=document.querySelectorAll("colorlist>div[role=none]>a");
    const focusedOption = document.activeElement;
    // selectedIndex=-1;
    const siblingOptions = focusedOption.parentElement.parentElement.querySelectorAll(".colorlist>div[role=none]>a");
    const currentIndex = Array.from(siblingOptions).indexOf(focusedOption);
    const prevIndex = (currentIndex - 1 + siblingOptions.length) % siblingOptions.length;
    const prevOption = siblingOptions[prevIndex];
    if (prevOption) {
        selectOption(prevOption);
    }
    
    
}



function navigateRedBlackDown() {
    const focusedOption = document.activeElement;
    const siblingOptions = focusedOption.parentElement.parentElement.querySelectorAll(".colorlist>div[role=none]>a");
    const currentIndex = Array.from(siblingOptions).indexOf(focusedOption);
    const nextIndex = (currentIndex + 1) % siblingOptions.length;
    const nextOption = siblingOptions[nextIndex];
    if (nextOption) {
        // console.log("hisdfghgjkj")
        selectOption(nextOption);
    }
}

function navigateDarkLightUpDown() {
  const focusedOption = document.activeElement;
  const siblingOptions = focusedOption.parentElement.parentElement.querySelectorAll(".submenu [role='menuitem']");
  const currentIndex = Array.from(siblingOptions).indexOf(focusedOption);
  const prevIndex = (currentIndex - 1 + siblingOptions.length) % siblingOptions.length;
  const prevOption = siblingOptions[prevIndex];
  if (prevOption) {
    selectOption(prevOption);
  }
}

menuButton.addEventListener("click", toggleMenu);

listbox.addEventListener("keydown", function (event) {
    const currentOption = event.target;
    if (event.key === "ArrowUp" && isMenuOpen) {
        event.preventDefault();
        navigateRedBlackUp();
    } else if (event.key === "ArrowDown" && isMenuOpen) {
        event.preventDefault();
        navigateRedBlackDown();
    } else if (event.key === "ArrowRight" && isMenuOpen) {
        event.preventDefault();
        if (currentOption.textContent === "Black") {
            // Toggle submenu visibility for the "Black" option
            toggleSubMenu();
            focusOnDarkGray();
            // Set focus on the "Dark Gray" option
        }
    }
});

document.querySelector(".submenu").addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
    navigateDarkLightUpDown();
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
const listOption = document.querySelector("[role='menuitem']");
    listOption.addEventListener("keydown", activateOptionWithEnter);

function activateOptionWithEnter(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.click();
        }
    }
//  closing only black submenu
    document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" && isMenuOpen) {
        const submenu = document.querySelector(".submenu");
        if (submenu.classList.contains("show")) {
            submenu.classList.remove("show");
            focusOnBlack();
            menuButton.setAttribute("aria-expanded", "false");
        }
    }
});

// Closing  all submenu on ArrowLeft and Escape key
document.addEventListener("keydown", function (event) {
    if ( event.key === "Escape" && isMenuOpen) {
        const submenu = document.querySelector(".submenu");
        if (submenu.classList.contains("show")) {
            submenu.classList.remove("show");
            focusOnBlack();
            menuButton.setAttribute("aria-expanded", "false");
        } else {
            toggleMenu();
        }
    }
});