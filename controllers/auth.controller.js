const httpStatus = require("http-status");
const User = require("../models/user.model");
const { generateToken } = require("../utils/token");

const register = async (req, res, next) => {
  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "Email already exists" });
    }

    // Create and save the new user
    const user = new User(req.body);
    await user.save();

    // Generate a token for the new user
    const token = generateToken(user);

    // Remove sensitive fields from the user object
    const userObject = user.toObject();
    const keysToExclude = ["password", "createdAt", "role", "updatedAt"];
    keysToExclude.forEach((key) => {
      delete userObject[key];
    });

    // Send the response
    res.status(httpStatus.CREATED).send({ user: userObject, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordMatch(password))) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({ message: "Incorrect email or password" });
    }

    const token = generateToken(user);

    res.send({ user, token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
