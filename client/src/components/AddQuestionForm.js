import { useState } from "react";
import { addQuestion } from "../utils/api";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem,
  CircularProgress,
  Collapse,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AddQuestionForm = ({ onQuestionAdded }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [intervals, setIntervals] = useState("1,7,30");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return toast.error("Title is required!");
    setLoading(true);
    try {
      const intervalsArray = intervals
        .split(",")
        .map((n) => parseInt(n.trim()))
        .filter((n) => !isNaN(n));
      await addQuestion({
        title,
        url,
        topic,
        difficulty,
        intervals: intervalsArray,
      });
      toast.success("Question added!");
      setTitle("");
      setUrl("");
      setTopic("");
      setDifficulty("Medium");
      setIntervals("1,7,30");
      setOpen(false);
      onQuestionAdded();
    } catch (error) {
      toast.error("Failed to add question");
    }
    setLoading(false);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 3,
        mb: 3,
        overflow: "hidden",
      }}
    >
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          p: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          cursor: "pointer",
          "&:hover": { backgroundColor: "#f9f9f9" },
        }}
      >
        <AddCircleOutlineIcon sx={{ color: "#1976d2" }} />
        <Typography fontWeight={600} color="#1a1a2e">
          Add New Question
        </Typography>
      </Box>

      <Collapse in={open}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ p: 3, pt: 0, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Question Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            size="small"
            placeholder="e.g. Two Sum"
          />
          <TextField
            label="LeetCode URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
            size="small"
            placeholder="https://leetcode.com/problems/..."
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              fullWidth
              size="small"
              placeholder="e.g. Arrays, Trees"
            />
            <TextField
              select
              label="Difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
            </TextField>
          </Box>
          <TextField
            label="Revision Intervals (days, comma separated)"
            value={intervals}
            onChange={(e) => setIntervals(e.target.value)}
            fullWidth
            size="small"
            helperText="e.g. 1,7,30 means revise after 1 day, 1 week, and 1 month"
          />
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              onClick={() => setOpen(false)}
              sx={{ textTransform: "none", color: "#555" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ textTransform: "none" }}
            >
              {loading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                "Add Question"
              )}
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default AddQuestionForm;
