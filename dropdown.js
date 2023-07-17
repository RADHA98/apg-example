document.addEventListener('DOMContentLoaded', function () {
    const searchbox = document.getElementById('searchbox');
    const options = document.querySelectorAll('#color-options div');

    let selectedIndex = -1; // Initialize with -1 to indicate no selection
    let listVisible = false;

    function changeSelection(event) {
        const selected = document.querySelector('.selected');

        // If no option is selected, select the first one
        if (!selected) {
            options[0].classList.add('selected');
            selectedIndex = 0;
        }

        // Show the list when certain keys are pressed
        if (!listVisible && (event.key === 'Enter' || event.key === ' ' || (event.altKey && event.key === 'ArrowDown'))) {
            listVisible = true;
            searchbox.setAttribute('aria-activedescendant', 'Red');
            document.getElementById('color-options').style.display = 'block';
            searchbox.setAttribute('aria-expanded', 'true');
            searchbox.focus();
            return;
        }

        // Hide the list when certain keys are pressed
        if (listVisible && (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'Delete')) {
            listVisible = false;
            document.getElementById('color-options').style.display = 'none';
            searchbox.setAttribute('aria-expanded', 'false');
            searchbox.focus();
            return;
        }

        // Navigate within the list using arrow keys
        if (listVisible) {
            if (event.key === 'ArrowDown' && selectedIndex < options.length - 1) {
                selectedIndex++;
            } else if (event.key === 'ArrowUp' && selectedIndex > 0) {
                selectedIndex--;
            }

            selected.classList.remove('selected');
            options[selectedIndex].classList.add('selected');
            searchbox.setAttribute('aria-activedescendant', options[selectedIndex].id);
            searchbox.value = options[selectedIndex].innerText;
        }

        // Select the option when Enter key is pressed
        if (listVisible && event.key === 'Enter') {
            searchbox.value = selected.innerText;
            listVisible = false;
            document.getElementById('color-options').style.display = 'none';
            searchbox.setAttribute('aria-expanded', 'false');
            searchbox.focus();
        }
    }

    // Add event listener to searchbox for handling key events
    searchbox.addEventListener('keydown', changeSelection);

    // Add click event listener to toggle visibility of the list
    searchbox.addEventListener('click', function () {
        listVisible = !listVisible;
        if (listVisible) {
            searchbox.setAttribute('aria-activedescendant', 'Red');
            document.getElementById('color-options').style.display = 'block';
            searchbox.setAttribute('aria-expanded', 'true');
            searchbox.focus();
        } else {
            document.getElementById('color-options').style.display = 'none';
            searchbox.setAttribute('aria-expanded', 'false');
        }
    });

    options.forEach(function (option, index) {
        option.addEventListener('click', function (event) {
            const clickedItem = event.target;
            const selected = document.querySelector('.selected');

            // Remove "selected" class from previously selected option
            if (selected) {
                selected.classList.remove('selected');
            }

            // Add "selected" class to the clicked option
            clickedItem.classList.add('selected');

            // Update searchbox value, selected index, and hide the list
            searchbox.value = clickedItem.innerText;
            selectedIndex = index;
            listVisible = false;
            document.getElementById('color-options').style.display = 'none';
            searchbox.setAttribute('aria-expanded', 'false');
            searchbox.focus();
        });
    });
});