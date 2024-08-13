const httpStatus = require("http-status");
const Test = require("../models/test.model");
const Chapter = require("../models/chapter.model");

const addTest = async (req, res, next) => {
  try {
    const {
      chapterId,
      test_number,
      total_questions,
      attempted_questions,
      corrected_questions,
      userId,
      chapterName,
      subjectName,
    } = req.body;

    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "Chapter not found" });
    }

    const test = new Test({
      test_number,
      total_questions,
      attempted_questions,
      corrected_questions,
      chapter: chapter._id,
      userId,
      chapterName,
      subjectName
    });

    await test.save();

    chapter.tests.push(test._id);
    await chapter.save();

    res.status(httpStatus.CREATED).send(test);
  } catch (error) {
    next(error);
  }
};
// New method to get the count of total tests for a given user ID
const getTotalTestsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const testCount = await Test.countDocuments({ userId });

    res.status(httpStatus.OK).send({ userId, testCount });
  } catch (error) {
    next(error);
  }
};

const getTotalTestsByUserData = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const testCount = await Test.find({ userId });

    res.status(httpStatus.OK).send({ userId, testCount });
  } catch (error) {
    next(error);
  }
};

const getTestsDataByChapterId = async (req, res, next) => {
  try {
    const { chapter } = req.body;

    const testData = await Test.find({ chapter });

    res.status(httpStatus.OK).send({ chapter, testData });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTest,
  getTotalTestsByUser, // Export the new method
  getTotalTestsByUserData,
  getTestsDataByChapterId,
};
