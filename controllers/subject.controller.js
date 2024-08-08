const httpStatus = require("http-status");
const Subject = require("../models/subject.model");
const User = require("../models/user.model");

const addSubject = async (req, res, next) => {
  try {
    const user = req.user;
    const { name } = req.body;

    const subject = new Subject({ name, user: user._id });
    await subject.save();

    user.subjects.push(subject._id);
    await user.save();

    res.status(httpStatus.CREATED).send(subject);
  } catch (error) {
    next(error);
  }
};

const getAllSubjects = async (req, res, next) => {
  try {
    const { userId } = req.body;
    // Find all subjects for the given user ID
    const subjects = await Subject.find({ user: userId });

    res.status(httpStatus.OK).send(subjects);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSubject,
  getAllSubjects,
};
