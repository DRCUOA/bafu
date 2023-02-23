
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

if (pageContext === '/application/diagram') {
  let isLargeScreen = window.innerWidth > 1300;
  let isMediumScreen = window.innerWidth < 1300 && window.innerWidth > 800

  window.addEventListener('resize', () => {
    isLargeScreen = window.innerWidth > 1300; // update the variable when the window is resized
  });

  if (isLargeScreen) {
    // Add a delay to keep the icon still for a moment
    setTimeout(() => {
      // Smoothly transition the icon to the top left corner
      document.querySelector('.icon').style.transform = 'translate(-150%, -60%) scale(.5)';

      // Add a delay to keep the icon at the top left corner
      setTimeout(() => {
        // Add the "show" class to the menu to trigger the animation
        document.querySelector('.menu').classList.add('show');
        document.querySelector('.menu').style.transform = 'translate(-35%, 33%) scale(2)';
      }, 0);
    }, 1000);
    // check for small screens
  } else if
    (isMediumScreen) {
    // execute code for mid size devices
    // execute code for mobile devices
    // Add a delay to keep the icon still for a moment
    setTimeout(() => {
      // Smoothly transition the icon to the top left corner
      document.querySelector('.icon').style.transform = 'translate(-100%, -60%) scale(.5)';

      // Add a delay to keep the icon at the top left corner
      setTimeout(() => {
        // Add the "show" class to the menu to trigger the animation
        document.querySelector('.menu').classList.add('show');
        document.querySelector('.menu').style.transform = 'translate(-35%, 33%) scale(1.5)';
      }, 0);
    }, 1000);
  } else
    // execute code for mobile devices
    // Add a delay to keep the icon still for a moment
    setTimeout(() => {
      // Smoothly transition the icon to the top left corner
      document.querySelector('.icon').style.transform = 'translate(-50%, -100%) scale(.3)';

      // Add a delay to keep the icon at the top left corner
      setTimeout(() => {
        // Add the "show" class to the menu to trigger the animation
        document.querySelector('.menu').classList.add('show');
        document.querySelector('.menu').style.transform = 'translate(-50%, 10%) scale(1.5)';
      }, 0);
    }, 1000);
  }


//  // execute code for large screen devices
//     // Add a delay to keep the icon still for a moment
//     setTimeout(() => {
//       // Smoothly transition the icon to the top left corner
//       document.querySelector('.icon').style.transform = 'translate(-100%, -60%) scale(.5)';
//       // Add a delay to keep the icon at the top left corner
//       setTimeout(() => {
//         // Add the "show" class to the menu to trigger the animation
//         document.querySelector('.menu').classList.add('show');
//         document.querySelector('.menu').style.transform = 'translate(-35%, 33%) scale(2)';
//       }, 0);
//     }, 1000);

