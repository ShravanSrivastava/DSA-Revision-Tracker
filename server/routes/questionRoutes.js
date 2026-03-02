const express = require("express");
const router = express.Router();
const {
  addQuestion,
  getQuestions,
  markRevision,
  deleteQuestion,
  getTodayRevisions,
} = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", addQuestion);
router.get("/", getQuestions);
router.get("/today", getTodayRevisions);
router.delete("/:id", deleteQuestion);
router.patch("/:questionId/revisions/:revisionId", markRevision);

module.exports = router;
