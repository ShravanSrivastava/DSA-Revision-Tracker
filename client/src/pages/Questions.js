import { useState, useEffect } from "react";
import { getQuestions } from "../utils/api";
import QuestionCard from "../components/QuestionCard";
import AddQuestionForm from "../components/AddQuestionForm";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from "@mui/material";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const fetchQuestions = async () => {
    try {
      const { data } = await getQuestions();
      setQuestions(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const filtered =
    filter === "All"
      ? questions
      : questions.filter((q) => q.difficulty === filter);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 860, margin: "0 auto", padding: "30px 20px" }}>
      <Typography variant="h5" fontWeight={700} color="#1a1a2e" mb={0.5}>
        📚 My Questions
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Manage your DSA questions and revision schedules.
      </Typography>

      <AddQuestionForm onQuestionAdded={fetchQuestions} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="body1" fontWeight={600} color="#1a1a2e">
          {filtered.length} question{filtered.length !== 1 ? "s" : ""} found
        </Typography>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(e, val) => val && setFilter(val)}
          size="small"
        >
          {["All", "Easy", "Medium", "Hard"].map((f) => (
            <ToggleButton
              key={f}
              value={f}
              sx={{ textTransform: "none", fontSize: 12, px: 2 }}
            >
              {f}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {filtered.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            border: "1px solid #e0e0e0",
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No questions found. Add your first question above! 👆
          </Typography>
        </Paper>
      ) : (
        filtered.map((q) => (
          <QuestionCard key={q._id} question={q} onUpdate={fetchQuestions} />
        ))
      )}
    </Box>
  );
};

export default Questions;
