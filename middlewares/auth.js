const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const User = require("../models/user.model");
const { jwt: jwtConfig } = require("../config/config");

const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "Please authenticate" });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({ message: "No user found with this token" });
    }

    req.user = user;
    next();
  } catch (error) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "Please authenticate" });
  }
};

module.exports = auth;
