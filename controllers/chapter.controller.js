const httpStatus = require("http-status");
const Chapter = require("../models/chapter.model");
const Subject = require("../models/subject.model");

const addChapter = async (req, res, next) => {
  try {
    const { subjectId, name } = req.body;

    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "Subject not found" });
    }

    const chapter = new Chapter({ name, subject: subject._id });
    await chapter.save();

    subject.chapters.push(chapter._id);
    await subject.save();

    res.status(httpStatus.CREATED).send(chapter);
  } catch (error) {
    next(error);
  }
};

const getAllChapters = async (req, res, next) => {
  try {
    const { subjectId } = req.body;
    // Find all subjects for the given user ID
    const chapters = await Chapter.find({ subject: subjectId });
    res.status(httpStatus.OK).send(chapters);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addChapter,
  getAllChapters,
};
