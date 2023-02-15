  //hamburger menu
  const nav = document.getElementById("nav");
  const hamburgerMenu = document.getElementById("hamburger-menu");
  function toggleNav() {
    if (nav.style.display === "flex") {
      nav.style.display = "none";
      hamburgerMenu.classList.remove("open");
    } else {
      nav.style.display = "flex";
      nav.style.flexDirection = "column";
      hamburgerMenu.classList.add("open");
    }
  }

