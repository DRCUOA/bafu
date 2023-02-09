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
    console.log('Close btn clicked')
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

// new-item-form modal
if (document.querySelector('#enter-new-details-form')) {
    // Get the modal and it's close control btn, add event listener for click, display on modal on click
    const modalNewItemForm = document.querySelector('#new-item-form');
    const closeNewItemForm = document.querySelector('#close-new-details-form');
    document.querySelector('#new-item-form-btn').addEventListener('click', function () {
    modalNewItemForm.style.display = 'block';
    });
  // When the close button is clicked, set the modal's display property to "none"
  closeNewItemForm.addEventListener('click', function () {
    console.log('close control btn clicked')
    modalNewItemForm.style.display = "none";
  });

  document.getElementById("enter-new-details-form").addEventListener("submit", function(event) {
    console.log('submit event fired')
    event.preventDefault();
    const formElements = event.target.elements;
    for (let i = 0; i < formElements.length; i++) {
      if (formElements[i].value === "") {
        const placeholder = formElements[i].getAttribute("placeholder");
        if (placeholder) {
          formElements[i].value = placeholder;
        }
      }
    }
    this.submit();
  });
}
