textbox.addEventListener('keydown', function () {
  const textbox = document.getElementById('textbox');
  const options = document.querySelectorAll('#color-options div');
  let selectedIndex = 0;
  let listVisible = false;

  function changeSelection(event) {
    const selected = document.querySelector('.selected');

    if (!selected) {
      options[0].classList.add('selected');
      return;
    }

    // Enter, Space, or Alt+ArrowDown to open the list
    if (!listVisible && (event.key === 'Enter' || event.key === 'Space' || (event.altKey && event.key === 'ArrowDown'))) {
      listVisible = true;
      document.getElementById('color-options').style.display = 'block';
      return;
    }

    // Esc key to close the list
    if (listVisible && event.key === 'Escape') {
      listVisible = false;
      document.getElementById('color-options').style.display = 'none';
      return;
    }

    // Arrow Up and Arrow Down to navigate through options
    if (listVisible) {
      if (event.key === 'ArrowDown' && selectedIndex < options.length - 1) {
        selectedIndex++;
      } else if (event.key === 'ArrowUp' && selectedIndex > 0) {
        selectedIndex--;
      }

      selected.classList.remove('selected');
      options[selectedIndex].classList.add('selected');
      textbox.setAttribute('aria-activedescendant', options[selectedIndex].id);
    }
  }

  textbox.addEventListener('keydown', changeSelection);
});
