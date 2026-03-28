import { useState, useEffect } from "react";
import { getTodayRevisions, getQuestions } from "../utils/api";
import QuestionCard from "../components/QuestionCard";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StatCard = ({ icon, number, label, color }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      border: "1px solid #e0e0e0",
      borderRadius: 3,
      flex: 1,
      minWidth: 150,
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box sx={{ color, fontSize: 36 }}>{icon}</Box>
      <Box>
        <Typography variant="h4" fontWeight={700} color="#1a1a2e">
          {number}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Box>
  </Paper>
);

const Dashboard = () => {
  const [todayQuestions, setTodayQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const [todayRes, allRes] = await Promise.all([
        getTodayRevisions(),
        getQuestions(),
      ]);
      setTodayQuestions(todayRes.data);
      setAllQuestions(allRes.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  const totalDone = allQuestions.reduce(
    (acc, q) => acc + q.revisionPlan.filter((r) => r.status === "done").length,
    0,
  );
  const totalRevisions = allQuestions.reduce(
    (acc, q) => acc + q.revisionPlan.length,
    0,
  );

  return (
    <Box sx={{ maxWidth: 860, margin: "0 auto", padding: "30px 20px" }}>
      <Typography variant="h5" fontWeight={700} color="#1a1a2e" mb={0.5}>
        👋 Welcome back, {user?.name}!
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Here's your revision progress at a glance.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <StatCard
          icon={<LibraryBooksIcon fontSize="inherit" />}
          number={allQuestions.length}
          label="Total Questions"
          color="#1976d2"
        />
        <StatCard
          icon={<TodayIcon fontSize="inherit" />}
          number={todayQuestions.length}
          label="Due Today"
          color="#ed6c02"
        />
        <StatCard
          icon={<CheckCircleIcon fontSize="inherit" />}
          number={`${totalDone}/${totalRevisions}`}
          label="Revisions Done"
          color="#2e7d32"
        />
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" fontWeight={600} color="#1a1a2e" mb={2}>
        📅 Today's Revisions
      </Typography>

      {todayQuestions.length === 0 ? (
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
            🎉 No revisions due today! Go add some questions.
          </Typography>
        </Paper>
      ) : (
        todayQuestions.map((q) => (
          <QuestionCard key={q._id} question={q} onUpdate={fetchData} />
        ))
      )}
    </Box>
  );
};

export default Dashboard;
