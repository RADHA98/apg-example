const textbox = document.getElementById('textbox');
const listbox = document.getElementById('color-options');

const options = document.querySelectorAll('#color-options div');
let selectedIndex = 0;
//for the focus fixing for mouse user
let lastSelectedIndex = 0; 
let listVisible = false;

function changeSelection(event) {
  const selected = document.querySelector('.selected');

  if (!selected) {
    options[0].classList.add('selected');
    options[0].setAttribute('aria-selected', 'true');
    return;
  }

  if (!listVisible && (event.key === 'Enter' || event.key === 'Space')) {
    event.preventDefault();
    const newSelected = options[selectedIndex];
    handleOptionSelection({ target: newSelected });
    return;
  }

  if (!listVisible && (event.altKey && event.key === 'ArrowDown')) {
    event.preventDefault();
    listVisible = true;
    textbox.setAttribute('aria-activedescendant', options[lastSelectedIndex].id); 
    // Use the last selected index
    listbox.style.display = 'block';
    textbox.setAttribute('aria-expanded', 'true');
    return;
  }

  if (listVisible && event.key === 'Escape') {
    listVisible = false;
    listbox.style.display = 'none';
    textbox.setAttribute('aria-expanded', 'false');
    return;
  }

  if (listVisible && (event.key === 'Enter' || event.key === 'Space')) {
    event.preventDefault();
    const newSelected = options[selectedIndex];
    handleOptionSelection({ target: newSelected });
    return;
  }

  if (listVisible) {
    if (event.key === 'ArrowDown' && selectedIndex < options.length - 1) {
      event.preventDefault();
      selectedIndex++;
    } else if (event.key === 'ArrowUp' && selectedIndex > 0) {
      selectedIndex--;
    }

    selected.classList.remove('selected');
    selected.setAttribute('aria-selected', 'false');

    const newSelected = options[selectedIndex];
    newSelected.classList.add('selected');
    newSelected.setAttribute('aria-selected', 'true');

    textbox.setAttribute('aria-activedescendant', newSelected.id);
  }
}

textbox.addEventListener('keydown', changeSelection);

options.forEach(option => {
  option.addEventListener('click', handleOptionSelection);
});

function handleOptionSelection(event) {
  const selectedOption = event.target;

  options.forEach(function (option, index) {
    option.classList.remove('selected');
    option.setAttribute('aria-selected', 'false');
    if (option === selectedOption) {
      selectedIndex = index; 
      // mouse click fixing
    }
  });

  selectedOption.classList.add('selected');
  selectedOption.setAttribute('aria-selected', 'true');
  textbox.value = trimString(selectedOption.innerText);
//mouse click focus fixing
  textbox.setAttribute('aria-activedescendant', selectedOption.id);
  lastSelectedIndex = selectedIndex; 

  console.log(textbox.value);

  listVisible = false;
  listbox.style.display = 'none';
  textbox.setAttribute('aria-expanded', 'false');
  textbox.focus();
  event.preventDefault();
}

function enableMouseClick() {
  listbox.style.display = 'none';
}

function trimString(str) {
  return str.trim();
}

const inputField = document.getElementById("textbox");

inputField.addEventListener("keydown", function(event) {
  if (event.altKey && event.key === "ArrowDown") {
    console.log("you pressed the Alt + ArrowDown key");
    event.preventDefault();
  } else if (event.key === "ArrowDown") {
    console.log("you pressed the down key");
  }
});

function Dropdown() {
  if (listVisible) {
    listVisible = false;
    listbox.style.display = 'none';
    textbox.setAttribute('aria-expanded', 'false');
  } else {
    listVisible = true;
    listbox.style.display = 'block';
    textbox.setAttribute('aria-expanded', 'true');
    textbox.focus();
  }
}
