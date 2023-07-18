document.addEventListener('DOMContentLoaded', function () {
    const textbox = document.getElementById('textbox');
    const options = document.querySelectorAll('#color-options div');

    let selectedIndex = -1; 
    let listVisible = false;

    function changeSelection(event) {
        const selected = document.querySelector('.selected');

        
        if (!selected) {
            options[0].classList.add('selected');
            selectedIndex = 0;
        }

        
        if (!listVisible && (event.key === 'Enter' || event.key === ' ' || (event.altKey && event.key === 'ArrowDown'))) {
            listVisible = true;
            textbox.setAttribute('aria-activedescendant', 'color-option');
            document.getElementById('color-options').style.display = 'block';
            textbox.setAttribute('aria-expanded', 'true');
            textbox.focus();
            return;
        }

        
        if (listVisible && (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'Delete')) {
            listVisible = false;
            document.getElementById('color-options').style.display = 'none';
            textbox.setAttribute('aria-expanded', 'false');
            textbox.focus();
            return;
        }

        
        if (listVisible) {
            if (event.key === 'ArrowDown' && selectedIndex < options.length - 1) {
                selectedIndex++;
            } else if (event.key === 'ArrowUp' && selectedIndex > 0) {
                selectedIndex--;
            }

            selected.classList.remove('selected');
            options[selectedIndex].classList.add('selected');
            textbox.setAttribute('aria-activedescendant', options[selectedIndex].id);
            textbox.value = options[selectedIndex].innerText;
        }

       
        if (listVisible && event.key === 'Enter') {
            textbox.value = selected.innerText;
            listVisible = false;
            document.getElementById('color-options').style.display = 'none';
            textbox.setAttribute('aria-expanded', 'false');
            textbox.focus();
        }
    }

    
    textbox.addEventListener('keydown', changeSelection);

   
    textbox.addEventListener('click', function () {
        listVisible = !listVisible;
        if (listVisible) {
            textbox.setAttribute('aria-activedescendant', 'color-option');
            document.getElementById('color-options').style.display = 'block';
            textbox.setAttribute('aria-expanded', 'true');
            textbox.focus();
        } else {
            document.getElementById('color-options').style.display = 'none';
            textbox.setAttribute('aria-expanded', 'false');
        }
    });

    options.forEach(function (option, index) {
        option.addEventListener('click', function (event) {
            const clickedItem = event.target;
            const selected = document.querySelector('.selected');

            
            if (selected) {
                selected.classList.remove('selected');
            }

            clickedItem.classList.add('selected');

            
            textbox.value = clickedItem.innerText;
            selectedIndex = index;
            listVisible = false;
            document.getElementById('color-options').style.display = 'none';
            textbox.setAttribute('aria-expanded', 'false');
            textbox.focus();
        });
    });
});






















// document.addEventListener('DOMContentLoaded', function () {
//     const searchbox = document.getElementById('searchbox');
//     const options = document.querySelectorAll('#color-options div');

//     let selectedIndex = -1; 
//     let listVisible = false;

//     function changeSelection(event) {
//         const selected = document.querySelector('.selected');

        
//         if (!selected) {
//             options[0].classList.add('selected');
//             selectedIndex = 0;
//         }

        
//         if (!listVisible && (event.key === 'Enter' || event.key === ' ' || (event.altKey && event.key === 'ArrowDown'))) {
//             listVisible = true;
//             searchbox.setAttribute('aria-activedescendant', 'Red');
//             document.getElementById('color-options').style.display = 'block';
//             searchbox.setAttribute('aria-expanded', 'true');
//             searchbox.focus();
//             return;
//         }

       
//         if (listVisible && (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'Delete')) {
//             listVisible = false;
//             document.getElementById('color-options').style.display = 'none';
//             searchbox.setAttribute('aria-expanded', 'false');
//             searchbox.focus();
//             return;
//         }

       
//         if (listVisible) {
//             if (event.key === 'ArrowDown' && selectedIndex < options.length - 1) {
//                 selectedIndex++;
//             } else if (event.key === 'ArrowUp' && selectedIndex > 0) {
//                 selectedIndex--;
//             }

//             selected.classList.remove('selected');
//             options[selectedIndex].classList.add('selected');
//             searchbox.setAttribute('aria-activedescendant', options[selectedIndex].id);
//             searchbox.value = options[selectedIndex].innerText;
//         }

       
//         if (listVisible && event.key === 'Enter') {
//             searchbox.value = selected.innerText;
//             listVisible = false;
//             document.getElementById('color-options').style.display = 'none';
//             searchbox.setAttribute('aria-expanded', 'false');
//             searchbox.focus();
//         }
//     }

    
//     searchbox.addEventListener('keydown', changeSelection);

    
//     searchbox.addEventListener('click', function () {
//         listVisible = !listVisible;
//         if (listVisible) {
//             searchbox.setAttribute('aria-activedescendant', 'Red');
//             document.getElementById('color-options').style.display = 'block';
//             searchbox.setAttribute('aria-expanded', 'true');
//             searchbox.focus();
//         } else {
//             document.getElementById('color-options').style.display = 'none';
//             searchbox.setAttribute('aria-expanded', 'false');
//         }
//     });

//     options.forEach(function (option, index) {
//         option.addEventListener('click', function (event) {
//             const clickedItem = event.target;
//             const selected = document.querySelector('.selected');

           
//             if (selected) {
//                 selected.classList.remove('selected');
//             }

           
//             clickedItem.classList.add('selected');

           
//             searchbox.value = clickedItem.innerText;
//             selectedIndex = index;
//             listVisible = false;
//             document.getElementById('color-options').style.display = 'none';
//             searchbox.setAttribute('aria-expanded', 'false');
//             searchbox.focus();
//         });
//     });
// });