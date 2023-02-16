const jwt = require("jsonwebtoken");

function generateResetToken(user) {
  const payload = {
    username: user.username,
    email: user.email,
  };

  const secret = process.env.RESET_TOKEN_SECRET;
  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = {
  generateResetToken
}
