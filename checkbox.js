// this for Function "Select All" checkbox  whn we click
function SelectAllCheckboxClick() {
    const selectAllCheckbox = document.getElementById('select_all');
    const otherCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#select_all)');

    if (selectAllCheckbox.checked) {
      for (const checkbox of otherCheckboxes) {
        checkbox.checked = true;// set the checkproperty each  checkbox
// it means selectall checkbox is check than othercheckbox is checked
        
      }
    } else {
      for (const checkbox of otherCheckboxes) {
        //otherwise  not checked
        checkbox.checked = false;
      }
    }

    updateSelectAllState();
  }

  //  this Function for one by one option checkbox click
  function handleOptionCheckboxClick() {
    const selectAllCheckbox = document.getElementById('select_all');
    const otherCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#select_all)');

    let allChecked = true;
    let allUnchecked = true;
    // all checkboxes are either checked or unchecked at the beginning.

    for (const checkbox of otherCheckboxes) {
      //which contains all checkboxes except the "Select All" checkbox.
      // iterating over each checkbox in the otherCheckboxes
      //An object that has iterable properties.
      if (checkbox.checked) {
        // current checkbox is checked, so we set allUnchecked to false
        //  to indicate that not all checkboxes are unchecked.
        
        allUnchecked = false;
      } else {
        //  Otherwise, if checkbox.checked is false, it means the current checkbox
        //  is unchecked,so we set allChecked to false to indicate that
        //  not all checkboxes are checked.
        allChecked = false;
      }
    }

    selectAllCheckbox.checked = allChecked;
    // The indeterminate state is visual only. 
    // The checkbox is still either checked or unchecked as a state.
    selectAllCheckbox.indeterminate = !allChecked && !allUnchecked;
  }

  // Function to update the state of the "Select All" checkbox
  function updateSelectAllState() {
    const selectAllCheckbox = document.getElementById('select_all');
    const otherCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#select_all)');

    let allChecked = true;
    let allUnchecked = true;

    for (const checkbox of otherCheckboxes) {
      if (checkbox.checked) {
        allUnchecked = false;
      } else {
        allChecked = false;
      }
    }

    selectAllCheckbox.checked = allChecked;
    selectAllCheckbox.indeterminate = !allChecked && !allUnchecked;
  }

  // Add event listener to the "Select All" checkbox
  const selectAllCheckbox = document.getElementById('select_all');
  selectAllCheckbox.addEventListener('click', SelectAllCheckboxClick);

  // Add event listeners to other checkboxes
  const otherCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#select_all)');
  for (const checkbox of otherCheckboxes) {
    checkbox.addEventListener('click', handleOptionCheckboxClick);
  }

//   function handleCheckboxEnterKeyPress(event) {
//     if (event.key === "Enter") {
//       event.preventDefault(); 
//       //event.target.click();   
//     }
//   }

//   //  Enter key press for each checkbox
//   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//   for (const checkbox of checkboxes) {
//     checkbox.addEventListener('keydown', handleCheckboxEnterKeyPress);
//   }