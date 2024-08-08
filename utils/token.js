const jwt = require("jsonwebtoken");
const { jwt: jwtConfig } = require("../config/config");

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  const sevenDaysInSeconds = 7 * 24 * 60 * 60;
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: sevenDaysInSeconds,
  });
};

module.exports = { generateToken };
