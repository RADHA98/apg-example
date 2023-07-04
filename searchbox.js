
const textbox = document.getElementById('textbox');
const colorlist = document.querySelector('.colorlist');

// List activated with Enter, Space, or Alt+Down key
const options = colorlist.querySelectorAll('[role="option"]');

textbox.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' || event.key === ' ' || (event.altKey && event.key === 'ArrowDown')) {
    event.preventDefault();
    colorlist.style.display = 'block';
  }
});

// Accessible with arrow keys
const listbox = document.getElementById("listbox");

listbox.addEventListener("keydown", function (event) {
  const currentOption = event.target;

  if (event.key === "ArrowUp") {
    event.preventDefault();
    if (currentOption.previousElementSibling) {
      const previousElement = currentOption.previousElementSibling;
      previousElement.setAttribute("aria-selected", "true");
      previousElement.setAttribute("tabindex", "0");

      currentOption.setAttribute("aria-selected", "false");
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
      nextElement.setAttribute("aria-selected", "true");
      nextElement.setAttribute("tabindex", "0");

      currentOption.setAttribute("aria-selected", "false");
      currentOption.setAttribute("tabindex", "-1");

      nextElement.focus();
    } else {
      const firstOption = listbox.firstElementChild;
      firstOption.focus();
    }
  }
});

// Activating list items
function activeListItem(listItem) {
  textbox.value = listItem.textContent;
  colorlist.style.display = 'none'; 
}

function ListItemEnterspace(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    const listItem = event.target;
    activeListItem(listItem);
  }
}

options.forEach(option => {
  option.addEventListener('keydown', ListItemEnterspace);
});






