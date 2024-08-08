const express = require("express");
const authRoute = require("./auth.route");
const subjectRoute = require("./subject.route");
const chapterRoute = require("./chapter.route");
const testRoute = require("./test.route");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/subjects", subjectRoute);
router.use("/chapters", chapterRoute);
router.use("/tests", testRoute);

module.exports = router;
