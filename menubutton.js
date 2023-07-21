function OpenSubmenu() {
    const submenu = document.getElementById("submenu");
    submenu.style.display = submenu.style.display === "block" ? "none" : "block";
  }

  function OpenSubmenu2() {
    const submenu2 = document.getElementById("submenu2");
    submenu2.style.display = submenu2.style.display === "block" ? "none" : "block";
  }

  function pressMenuButtonKeyDown(event) {
    if (event.key === "Enter") {
      const submenu = document.getElementById("submenu");
      if (submenu.style.display !== "block") {
        submenu.style.display = "block";
        const menuItems = submenu.querySelectorAll("a[role='menuitem']");
        if (menuItems.length > 0) {
          menuItems[0].focus();
        }
      }
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      OpenSubmenu2();
      const option2menu = document.getElementById("option2");
      option2menu.setAttribute("aria-expanded", submenu2.style.display === "block" ? "true" : "false");
    }
  });

  

  // Handle the ArrowUp and ArrowDown keys for submenu2 items
  const submenu2Items = document.querySelectorAll(".submenu2 a");
  let focusedSubmenu2Index = -1;

  function focusSubmenu2Item(index) {
    if (index >= 0 && index < submenu2Items.length) {
      submenu2Items[index].focus();
      focusedSubmenu2Index = index;
    }
  }

  document.getElementById("option2").addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight" && submenu2.style.display === "block") {
      event.preventDefault();
      focusSubmenu2Item(0);
    }
  });

  document.addEventListener("keydown", function(event) {
  
    if (event.key === "ArrowUp" && submenu2.style.display === "block") {
      event.preventDefault();
      focusSubmenu2Item(focusedSubmenu2Index - 1);
    } else if (event.key === "ArrowDown" && submenu2.style.display === "block") {
      event.preventDefault();
      focusSubmenu2Item(focusedSubmenu2Index + 1);
    }
  });

  // Handle the ArrowUp and ArrowDown keys for the main submenu items
  const submenuItems = document.querySelectorAll(".submenu a");
  let focusedSubmenuIndex = -1;

  function focusSubmenuItem(index) {
    if (index >= 0 && index < submenuItems.length) {
      submenuItems[index].focus();
      focusedSubmenuIndex = index;
    }
  }

  document.getElementById("submenu").addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" && submenu.style.display === "block") {
      event.preventDefault();
      focusSubmenuItem(focusedSubmenuIndex - 1);
    } else if (event.key === "ArrowDown" && submenu.style.display === "block") {
      event.preventDefault();
      focusSubmenuItem(focusedSubmenuIndex + 1);
    }
    else if (event.key === "Escape") {
            if (submenu.style.display === "block") {
                event.preventDefault();
                OpenSubmenu();
            } else if (submenu2.style.display === "block") {
                event.preventDefault();
                OpenSubmenu2();
            }
        }
  });