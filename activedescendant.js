const textbox = document.getElementById('textbox');
const listbox = document.getElementById('color-options');

// option is the collection of all list items.

const options = document.querySelectorAll('#color-options div');
// indicating first element in this array
let selectedIndex = 0;
//the initial value is false, it implies that the list is
// initially hidden or not visible.
let listVisible = false;

//
function changeSelection(event) {
  
  //querySelector() method returns the first element that matches a CSS selector
  const selected = document.querySelector('.selected');

  if (!selected) {
    //This condition checks if the selected variable is falsy, which means 
    //there is no element with the class name 'selected' in the document.
    options[0].classList.add('selected');
    //This line adds the CSS class name 'selected' to the first element in the options array. It assumes that the options 
    //array contains a list of elements representing selectable options.
    options[0].setAttribute('aria-selected', 'true');
    // if this read the first element in selected.
    return;

  }

  // Enter, Space, or Alt+ArrowDown to open the list
  if (!listVisible && (event.key === 'Enter' || event.key === 'Space' || (event.altKey && event.key === 'ArrowDown'))) {
    event.preventDefault();
    
    listVisible = true;
    
    //this line for reading first element of list

    textbox.setAttribute('aria-activedescendant', Red.id);
    listbox.style.display = 'block';
    textbox.setAttribute('aria-expanded', 'true');
    
    return;
    
  }
  textbox.addEventListener('keydown', changeSelection);
  textbox.addEventListener('click', function() {
    listVisible = true;
  });


  // Activating list item by using Enter or Space key
  if (listVisible && (event.key === 'Enter' || event.key === 'Space')) {
    event.preventDefault();
    const newSelected = options[selectedIndex];
    handleOptionSelection({ target:newSelected });
    //The purpose of the return statement is to 
    //immediately exit the function and prevent the code from executing any further. 
    return;
  }

  // Esc key to close the list
  if (listVisible && event.key === 'Escape') {
    listVisible = false;
    listbox.style.display = 'none';
    textbox.setAttribute('aria-expanded', 'false');
    return;
  }

  // Arrow Up and Arrow Down to navigate through options
  if (listVisible) {
    //if the selectedIndex is less than the index of 
    //the last option in the options array (selectedIndex < options.length - 1).
    if (event.key === 'ArrowDown' && selectedIndex < options.length - 1) {
console.log("asdfghj");
      event.preventDefault();
      selectedIndex++;//moving the selection to the next option in the list.
    } else if (event.key === 'ArrowUp' && selectedIndex > 0) {
      //selectedIndex is greater than zero (selectedIndex > 0).
      selectedIndex--;
      //variable by one, moving the selection to
      // the previous option in the list.
    }
    //This line removes the CSS class name 'selected' from the selected element.
    selected.classList.remove('selected');

    selected.setAttribute('aria-selected', 'false');
    // It assumes that selectedIndex holds a valid index for the options array.
    const newSelected = options[selectedIndex];
    // It visually indicates that the element is selected.
    newSelected.classList.add('selected');
    newSelected.setAttribute('aria-selected', 'true');

    // active-descendant

    // This attribute is often used to indicate the active
    // descendant element when navigating through a list or dropdown. 
    //It assists with screen readers or other 
    //assistive technologies in providing contextual information
    textbox.setAttribute('aria-activedescendant', newSelected.id);
  }
}

textbox.addEventListener('keydown', changeSelection);

//This line attaches a 'click' event listener to each option element.
// When an option is clicked, the handleOptionSelection function will be called.
options.forEach(option => {
  //forEach:The forEach() method calls a function for each element in an array.
  // The forEach() method is not executed for empty element
  option.addEventListener('click', handleOptionSelection);
});

function handleOptionSelection(event) {
  // It represents the specific option that triggered the event.
  const selectedOption = event.target;

  options.forEach(function (option) {
    option.classList.remove('selected');
    option.setAttribute('aria-selected', 'false');
  });

  selectedOption.classList.add('selected');
  selectedOption.setAttribute('aria-selected', 'true');
  //It updates the displayed value of the textbox to reflect the selected option.
  //textbox.value = selectedOption.innerText;
textbox.value=trimString(selectedOption.innerText);
// removing whitespaces.


  console.log(textbox.value);

  listVisible = false; // Reset list visibility
  listbox.style.display = 'none';
  textbox.setAttribute('aria-expanded', 'false');
  textbox.focus();
  event.preventDefault();
  

}

// navigation with mouse user.
function enableMouseClick() {
  listbox.style.display = 'none';
}

function trimString(str) {
  // specifies the value that the function will give back.
  // It's like the answer the function provides.
  return str.trim();
  //str.trim->string to remove any extra spaces at the beginning or end of the string.
}

//*************************************************************************** */

//for dropdown 








