
let pageContext = window.location.pathname;
console.log("window.location.pathname: ", pageContext)

//hamburger menu
const nav = document.getElementById("nav");
const hamburgerMenu = document.getElementById("hamburger-menu");
function toggleNav() {
  if (nav.classList.contains("open")) {
    nav.classList.remove("open");
    hamburgerMenu.classList.remove("open");
  } else {
    nav.classList.add("open");
    hamburgerMenu.classList.add("open");
  }
}
nav.addEventListener('click', (e) => {
  toggleNav();
});

if (document.querySelector('#search-btn')) {
  document.querySelector('#search-btn').addEventListener('click', (e) => {
    console.log("search not active")
  });
  
};