/*
*  Client-side Javascript
*/


// regisitration and login helpers:
if (document.querySelector('#register-button') || document.querySelector('#sign-in-button') || document.querySelector('#reset-pwd-btn')) {
  document.querySelector('#register-button').addEventListener('click', function () {
    document.querySelector('#register-modal').style.display = 'block';
  });
  document.querySelector('#sign-in-button').addEventListener('click', function () {
    document.querySelector('#sign-in-modal').style.display = 'block';
  });
  document.querySelector('#reset-pwd-btn').addEventListener('click', function () {
    document.querySelector('#password-reset-modal').style.display = 'block';
  });

  // manage model close (times) btn events
  const closeRegButton = document.querySelector('#reg-close');
  const closeSignInButton = document.querySelector('#close-log-in');
  const pwdResetButton = document.querySelector('#close-password-reset');
  const modalReg = document.querySelector('#register-modal');
  const modalSignIn = document.querySelector('#sign-in-modal');
  const modelPwdRest = document.querySelector('#password-reset-modal');
  closeRegButton.addEventListener('click', function () {
    modalReg.style.display = "none";
  });
  closeSignInButton.addEventListener('click', function () {
    modalSignIn.style.display = "none";
  });
  pwdResetButton.addEventListener('click', function () {
    modelPwdRest.style.display = "none";
  });

  //section break

  let header = document.querySelector('#header');
  header.style.display = "None";

  let footer = document.querySelector('#footer');
  // footer.style.display = "None";
}

if (document.querySelector("#item-summary")) {
  const okBtn = document.querySelector('#confirm-ok-btn');
  okBtn.addEventListener('click', () => {
    window.location.href = "/";
  });
};

if (document.querySelector("#search-results-list")) {
  const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
  viewDetailsButtons.forEach(button => {
    button.addEventListener('click', event => {
      const itemDetails = event.target.nextElementSibling;
      itemDetails.style.display = itemDetails.style.display === 'none' ? 'block' : 'none';
    });
  });
}
