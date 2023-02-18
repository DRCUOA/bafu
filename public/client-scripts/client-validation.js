if (document.querySelector('#pwd-confirm-status')) {
  // validation flags
  let emailNotInUse = false;
  let userNameNotInUse = false;
  let passwordValid = false;
  let reEnterPasswordMatch = false;

  // function to keep submit button disabled until all validation flags are true
  function setSubmitButton() {
    let submissonBtn = document.querySelector("#create-account");
    if (emailNotInUse && userNameNotInUse && passwordValid && reEnterPasswordMatch) {
      submissonBtn.disabled = false;
      submissonBtn.pointerEvents = "auto";
      submissonBtn.cursor = "pointer";
    } else {
      submissonBtn.disabled = true;
      submissonBtn.pointerEvents = "none";
      submissonBtn.cursor = "not-allowed";
    }
  }

  const emailToCheck = document.querySelector('#email');
  const usernameToCheck = document.querySelector('#username');
  const pwdToCheck = document.querySelector('#txtPassword');
  const secondPwdToCheck = document.querySelector('#pwd-confirm');

  document.querySelector('#email').addEventListener('keyup', () => {
    const email = emailToCheck.value;
    if (email != "") {
      fetch('/validation/email_check?email=' + email.toLowerCase())
        .then(response => response.json())
        .then(data => {
          if (data.message == "inuse") {
            emailNotInUse = false;
            document.querySelector('#email-status').innerText = "Email already in use!";
            setSubmitButton();
          } else {
            emailNotInUse = true;
            document.querySelector('#email-status').innerText = "";
            setSubmitButton();
          }
        });
    } else {
      emailNotInUse = false;
      document.querySelector('#email-status');
      setSubmitButton();
    }
  });

  document.querySelector('#username').addEventListener('keyup', () => {
    const nameToCheck = usernameToCheck.value;
    if (username != "") {
      fetch('/validation/username_check?username=' + nameToCheck.toLowerCase())
        .then(response => response.json())
        .then(data => {
          if (data.message == "taken") {
            userNameNotInUse = false;
            document.querySelector('#username-status').innerText = "Username already taken!";
            setSubmitButton();
          } else {
            userNameNotInUse = true;
            document.querySelector('#username-status').innerText = "";
            setSubmitButton();
          }
        });
    } else {
      userNameNotInUse = false;
      document.querySelector('#username-status').innerText = "Username can not be empty!!";
      setSubmitButton();
    }
  });

  document.querySelector('#txtPassword').addEventListener('keyup', () => {
    let password = pwdToCheck.value;
    passwordValid = isValidPassword(password)
    if (passwordValid) {
      document.querySelector('#pwd-status').innerText = "";
      setSubmitButton();
    } else {
      document.querySelector('#pwd-status').innerHTML = "Password must contain at least 8 characters, at least one of which must be uppercase, lowercase and numeric.";
      setSubmitButton();
    }
  });

  document.querySelector('#pwd-confirm').addEventListener('keyup', () => {
    let pwd = pwdToCheck.value;
    let confirmPwd = secondPwdToCheck.value;
    if (pwd != "" && confirmPwd != "" && pwd == confirmPwd) {
      reEnterPasswordMatch = true;
      document.querySelector('#pwd-confirm-status').innerText = '';
      setSubmitButton();
    } else if (confirmPwd == "") {
      reEnterPasswordMatch = false;
      document.querySelector('#pwd-confirm-status').innerText = "password can not be empty!";
      setSubmitButton();
    } else if (confirmPwd != pwd) {
      reEnterPasswordMatch = false;
      document.querySelector('#pwd-confirm-status').innerText = "passwords do not match!";
      setSubmitButton();
    }
  });
} else {
  console.log("not on validation page")
}

function isValidPassword(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

// password resets
if(document.querySelector('#password-reset-form')){
document.querySelector('#password-reset-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email2').value;
  if (email !== '') {
    const emailExists = await isEmailForResetPassword(email);
    console.log('mailExists', emailExists);
    if (emailExists) {
      await sendPasswordResetEmail(email);
      document.querySelector('#password-reset-form').style.display = 'none';
      document.querySelector('#password-reset-success').style.display = 'block';
    } else {
      // Show an error message if the email does not exist
      document.querySelector('#email-status').innerText = 'Email not found';
    }
  } else {
    document.querySelector('#email-status').innerText = 'Please enter an email address';
  }
});
}
// Function to check if the email exists for the password reset
async function isEmailForResetPassword(email) {
  return await fetch(`/api/user/email/${encodeURIComponent(email.toLowerCase())}`)
    .then(response => response.json())
    .then(data => data.emailExists)
    .catch(error => {
      console.error(`Error checking email for password reset: ${error.message}`);
      return false;
    });
}

async function sendPasswordResetEmail(email) {
  const encodedEmail = encodeURIComponent(email);
  
  return await fetch(`/api/resetpassword?email=${encodedEmail}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        return true;
      }
      throw new Error('Failed to send password reset email');
    })
    .catch(error => {
      console.error(`Error sending password reset email: ${error.message}`);
      return false;
    });
}


// Extract the reset token from the URL
const urlParams = new URLSearchParams(window.location.search);
const resetToken = urlParams.get('resetToken');

// Store the reset token in the hidden input field
document.querySelector('#resetToken').value = resetToken;

// Redirect to the password reset confirmation page
const confirmationUrl = `http://${window.location.host}/reset-password-confirmation?resetToken=${resetToken}`;
window.location.href = confirmationUrl;

// Handle the form submission
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#reset-password-confirmation-submit').addEventListener('click', async (event) => {
    // event.preventDefault();

    // Extract the form data
    const email = document.querySelector('#email').value;
    const resetToken = document.querySelector('#resetToken').value;
    const newPassword = document.querySelector('#newPassword').value;
    const confirmNewPassword = document.querySelector('#confirmNewPassword').value;

    // Verify that the new password and confirm password fields match
    if (newPassword !== confirmNewPassword) {
      document.querySelector('#password-match-status').innerText = 'Passwords do not match';
      return;
    }

    // Send the password reset confirmation to the server
    const response = await fetch('/api/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        resetToken: resetToken,
        newPassword: newPassword
      })
    });
  });

    if (response.ok) {
      // Redirect to the login page if the password reset was successful
      window.location.href = '/login';
    } else {
      // Display an error message if the password reset failed
      document.querySelector('#password-reset-status').innerText = 'Password reset failed';
    }
  });
