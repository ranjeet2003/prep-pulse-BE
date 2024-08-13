const express = require("express");
const {
  addTest,
  getTotalTestsByUser,
  getTotalTestsByUserData,
  getTestsDataByChapterId,
} = require("../controllers/test.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/addTests", auth, addTest);
router.post("/getAllTest", auth, getTotalTestsByUser);
router.post("/getTotalTestsByUserData", auth, getTotalTestsByUserData);
router.post("/getTestsDataByChapterId", auth, getTestsDataByChapterId);

module.exports = router;
