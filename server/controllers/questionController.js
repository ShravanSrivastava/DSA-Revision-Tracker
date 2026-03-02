const Question = require("../models/Question");

const generateRevisionDates = (intervals) => {
  const today = new Date();
  return intervals.map((days) => {
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    return { date, status: "pending" };
  });
};

const addQuestion = async (req, res) => {
  const { title, url, topic, difficulty, intervals } = req.body;
  try {
    const userIntervals = intervals || [1, 7, 30];
    const revisionPlan = generateRevisionDates(userIntervals);
    const question = await Question.create({
      userId: req.user._id,
      title,
      url,
      topic,
      difficulty,
      revisionPlan,
    });
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ userId: req.user._id });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markRevision = async (req, res) => {
  const { questionId, revisionId } = req.params;
  try {
    const question = await Question.findById(questionId);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    const revision = question.revisionPlan.id(revisionId);
    if (!revision)
      return res.status(404).json({ message: "Revision not found" });
    revision.status = revision.status === "done" ? "pending" : "done";
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    await question.deleteOne();
    res.json({ message: "Question removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodayRevisions = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const questions = await Question.find({
      userId: req.user._id,
      revisionPlan: {
        $elemMatch: {
          date: { $gte: today, $lt: tomorrow },
          status: "pending",
        },
      },
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addQuestion,
  getQuestions,
  markRevision,
  deleteQuestion,
  getTodayRevisions,
};
