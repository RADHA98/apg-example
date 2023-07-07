const textbox = document.getElementById('textbox');
    const options = document.querySelectorAll('#color-options div');
    let selectedIndex = 0;
    let listVisible = false;

    function changeSelection(event) {
      const selected = document.querySelector('.selected');

      if (!selected) {
        options[0].classList.add('selected');
        options[0].setAttribute('aria-selected', 'true');
        return;
      }

      // Enter, Space, or Alt+ArrowDown to open the list
      if (!listVisible && (event.key === 'Enter' || event.key === 'Space' || (event.altKey && event.key === 'ArrowDown'))) {
        listVisible = true;
        document.getElementById('color-options').style.display = 'block';
        textbox.setAttribute('aria-expanded', 'true');
        return;
      }

      // Esc key to close the list
      if (listVisible && event.key === 'Escape') {
        listVisible = false;
        document.getElementById('color-options').style.display = 'none';
        textbox.setAttribute('aria-expanded', 'false');
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
        selected.setAttribute('aria-selected', 'false');

        const newSelected = options[selectedIndex];
        newSelected.classList.add('selected');
        newSelected.setAttribute('aria-selected', 'true');

        // active-descendant
        textbox.setAttribute('aria-activedescendant', newSelected.id);
      }
    }

    textbox.addEventListener('keydown', changeSelection);

    function handleOptionSelection(event) {
      const selectedOption = event.target;

      options.forEach(function (option) {
        option.classList.remove('selected');
        option.setAttribute('aria-selected', 'false');
      });

      selectedOption.classList.add('selected');
      selectedOption.setAttribute('aria-selected', 'true');
      textbox.value = selectedOption.innerText;

      document.getElementById('color-options').style.display = 'none';
      textbox.setAttribute('aria-expanded', 'false');
    }

    function enableMouseClick() {
      const listbox = document.getElementById('color-options');
      listbox.style.display = 'block';
    }