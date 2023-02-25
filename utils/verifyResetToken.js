const jwt = require("jsonwebtoken");
const debug = require('debug');

// setup debug namespaces
const devJWT = debug('devLog:utils_JWT');

function verifyResetToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.RESET_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        devJWT('err on jwt.verify: ', err.message);
        resolve(false);
      } else {
        resolve({email: decoded.email, token: token});
      }
    });
  });
}

module.exports = {
  verifyResetToken
}
