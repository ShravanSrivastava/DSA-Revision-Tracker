const mongoose = require("mongoose");

const revisionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "done"],
    default: "pending",
  },
});

const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: "",
    },
    topic: {
      type: String,
      default: "General",
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    revisionPlan: [revisionSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Question", questionSchema);
