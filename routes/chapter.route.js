const express = require("express");
const {
  addChapter,
  getAllChapters,
} = require("../controllers/chapter.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/addChapters", auth, addChapter);
router.post("/getAllChapters", auth, getAllChapters);

module.exports = router;
