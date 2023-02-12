/*
*  Client-side Javascript
*/

//hamburger menu
if (document.getElementById('hamburger') || document.getElementById('nav')) {
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
  };
}

// regisitration and login helpers:
if (document.getElementById('register-button') || document.getElementById('sign-in-button')) {
  document.getElementById('register-button').addEventListener('click', function () {
    document.getElementById('register-modal').style.display = 'block';
  });
  document.getElementById('sign-in-button').addEventListener('click', function () {
    document.getElementById('sign-in-modal').style.display = 'block';
  });
  // register
  // Get the close btn
  const closeRegButton = document.querySelector('#reg-close');

  // Get the modal element
  const modalReg = document.querySelector('#register-modal');

  // When the close button is clicked, set the modal's display property to "none"
  closeRegButton.addEventListener('click', function () {
    modalReg.style.display = "none";
  });

  // login
  const closeSignInButton = document.querySelector('#close-log-in');

  // Get the modal element
  const modalSignIn = document.querySelector('#sign-in-modal');

  // When the close button is clicked, set the modal's display property to "none"
  closeSignInButton.addEventListener('click', function () {
    modalSignIn.style.display = "none";
  });

  let header = document.querySelector('#header');
  header.style.display = "None";

  let footer = document.querySelector('#footer');
  footer.style.display = "None";
}

if(document.querySelector("#item-summary")) {
  const okBtn = document.querySelector('#confirm-ok-btn');
  okBtn.addEventListener('click', () => {
    window.location.href = "/";
  });
};