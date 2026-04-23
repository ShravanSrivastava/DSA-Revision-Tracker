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
  Container,
  Grid,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="#1E293B"
            sx={{ mb: 0.5 }}
          >
            📚 My Questions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your DSA questions and keep track of revision schedules
          </Typography>
        </Box>

        {/* Add Question Form */}
        <AddQuestionForm onQuestionAdded={fetchQuestions} />

        {/* Filter Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <FilterListIcon sx={{ color: "#5B7EFF" }} />
            <Typography variant="body2" fontWeight={600} color="#1E293B">
              Filter by difficulty
            </Typography>
          </Box>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(e, val) => val && setFilter(val)}
            size="small"
            sx={{
              "& .MuiToggleButton-root": {
                textTransform: "none",
                fontSize: 12,
                fontWeight: 500,
                px: 2,
                border: "1px solid #E2E8F0",
                color: "#64748B",
                "&.Mui-selected": {
                  backgroundColor: "#5B7EFF",
                  color: "#FFFFFF",
                  border: "1px solid #5B7EFF",
                  "&:hover": {
                    backgroundColor: "#5B7EFF",
                  },
                },
              },
            }}
          >
            {["All", "Easy", "Medium", "Hard"].map((f) => (
              <ToggleButton key={f} value={f}>
                {f}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Questions List */}
        {filtered.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              border: "2px dashed #E2E8F0",
              borderRadius: 2,
              textAlign: "center",
              backgroundColor: "#F8FAFC",
            }}
          >
            <Box sx={{ fontSize: 48, mb: 1 }}>📭</Box>
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              No questions found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {filter === "All"
                ? "Add your first question to get started!"
                : `No ${filter.toLowerCase()} difficulty questions yet`}
            </Typography>
          </Paper>
        ) : (
          <Box>
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="body2" fontWeight={600} color="#64748B">
                {filtered.length} question{filtered.length !== 1 ? "s" : ""}{" "}
                found
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {filtered.map((q) => (
                <Grid item xs={12} key={q._id}>
                  <QuestionCard question={q} onUpdate={fetchQuestions} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Questions;
