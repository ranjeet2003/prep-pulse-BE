const express = require("express");
const {
  addSubject,
  getAllSubjects,
} = require("../controllers/subject.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/subjects", auth, addSubject);
router.post("/getAllSubjects", auth, getAllSubjects);

module.exports = router;
