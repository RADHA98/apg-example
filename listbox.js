const listbox = document.getElementById("listbox");

            listbox.addEventListener("keydown", function (event) {
                const currentOption = event.target;

                    

                // accessible with arrow keys
                if (event.key === "ArrowUp") {
                    event.preventDefault();
                    if (currentOption.previousElementSibling) {
                        //accessible with arrow keys arrow up selected 

                       const previousElement=currentOption.previousElementSibling;

                       previousElement.setAttribute("aria-selected","true");
                       previousElement.setAttribute("tabindex","0");

                       currentOption.setAttribute("aria-selected","false");
                    currentOption.setAttribute("tabindex","-1");

                       // currentOption.previousElementSibling.focus();
                       previousElement.focus();
                        
                    } else {
                        const lastOption = listbox.lastElementChild;
                        lastOption.focus();
                    }
                } else if (event.key === "ArrowDown") {
                    event.preventDefault();
                    if (currentOption.nextElementSibling) {

                        const nextElement=currentOption.nextElementSibling;
                        nextElement.setAttribute("aria-selected","true");
                        nextElement.setAttribute("tabindex","0");

                        currentOption.setAttribute("aria-selected","false");
                        currentOption.setAttribute("aria-selected","-1");


                        nextElement.focus();
                    } else {
                        const firstOption = listbox.firstElementChild;
                        firstOption.focus();
                    }
                }

                // when arrow key navigate that time select list -item.
            //     const options = document.querySelectorAll("[role='option']");
            //     options.forEach((option) => {
            //       option.setAttribute("aria-selected", "false");
            //     });
            //     currentOption.setAttribute("aria-selected", "true");
             });
              
            //});



