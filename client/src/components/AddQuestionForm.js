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
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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
      toast.success("Question added! 🎉");
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
        border: "1px solid #E2E8F0",
        borderRadius: 2,
        mb: 3,
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "#5B7EFF",
          boxShadow: open ? "none" : "0 4px 12px rgba(0, 0, 0, 0.06)",
        },
      }}
    >
      {/* Header - Clickable */}
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          cursor: "pointer",
          backgroundColor: open ? "#F8FAFC" : "#FFFFFF",
          borderBottom: open ? "1px solid #E2E8F0" : "none",
          transition: "all 0.2s ease",
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "8px",
            backgroundColor: "#5B7EFF20",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#5B7EFF",
            transition: "all 0.2s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <AddIcon />
        </Box>
        <Typography fontWeight={600} color="#1E293B" sx={{ flex: 1 }}>
          {open ? "Close" : "Add New Question"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          {open ? "✕" : "→"}
        </Typography>
      </Box>

      {/* Form - Collapsible */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            label="Question Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            size="small"
            placeholder="e.g. Two Sum, Merge Intervals"
            required
          />

          <TextField
            label="LeetCode URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
            size="small"
            placeholder="https://leetcode.com/problems/..."
            type="url"
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <TextField
              label="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              fullWidth
              size="small"
              placeholder="e.g. Arrays, Trees, Graphs"
            />
            <TextField
              select
              label="Difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value="Easy">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#10B981",
                    }}
                  />
                  Easy
                </Box>
              </MenuItem>
              <MenuItem value="Medium">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#FFA500",
                    }}
                  />
                  Medium
                </Box>
              </MenuItem>
              <MenuItem value="Hard">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#EF4444",
                    }}
                  />
                  Hard
                </Box>
              </MenuItem>
            </TextField>
          </Box>

          <TextField
            label="Revision Intervals (days, comma separated)"
            value={intervals}
            onChange={(e) => setIntervals(e.target.value)}
            fullWidth
            size="small"
            placeholder="1,7,30"
            helperText="Example: 1,7,30 → Revise after 1 day, 1 week, and 1 month"
          />

          <Divider sx={{ my: 0.5 }} />

          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              onClick={() => setOpen(false)}
              sx={{
                textTransform: "none",
                color: "#64748B",
                "&:hover": { backgroundColor: "#F1F5F9" },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                textTransform: "none",
                background: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
                fontWeight: 600,
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                },
              }}
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
