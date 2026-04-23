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
  Container,
} from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const StatCard = ({ icon, number, label, color }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: 2,
      border: `2px solid ${color}20`,
      backgroundColor: `${color}08`,
      flex: 1,
      minWidth: 200,
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: `0 8px 24px ${color}20`,
        border: `2px solid ${color}40`,
      },
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "12px",
          backgroundColor: `${color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          fontSize: 28,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="h4" fontWeight={700} color="#1E293B">
          {number}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
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

  const totalDone = allQuestions.reduce(
    (acc, q) => acc + q.revisionPlan.filter((r) => r.status === "done").length,
    0,
  );
  const totalRevisions = allQuestions.reduce(
    (acc, q) => acc + q.revisionPlan.length,
    0,
  );
  const completionPercentage =
    totalRevisions > 0 ? Math.round((totalDone / totalRevisions) * 100) : 0;

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
            Welcome back,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {user?.name}!
            </span>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your DSA revision progress and stay on schedule
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              icon={<LibraryBooksIcon fontSize="inherit" />}
              number={allQuestions.length}
              label="Total Questions"
              color="#5B7EFF"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              icon={<TodayIcon fontSize="inherit" />}
              number={todayQuestions.length}
              label="Due Today"
              color="#FFA500"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              icon={<CheckCircleIcon fontSize="inherit" />}
              number={`${totalDone}/${totalRevisions}`}
              label="Revisions Done"
              color="#10B981"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              icon={<TrendingUpIcon fontSize="inherit" />}
              number={`${completionPercentage}%`}
              label="Completion Rate"
              color="#8B5CF6"
            />
          </Grid>
        </Grid>

        {/* Today's Revisions Section */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 4,
                height: 28,
                backgroundColor: "#5B7EFF",
                borderRadius: 1,
              }}
            />
            <Typography variant="h6" fontWeight={600} color="#1E293B">
              📅 Today's Revisions
            </Typography>
            {todayQuestions.length > 0 && (
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  backgroundColor: "#FFA50020",
                  borderRadius: 1,
                  ml: "auto",
                }}
              >
                <Typography variant="body2" color="#FFA500" fontWeight={600}>
                  {todayQuestions.length} pending
                </Typography>
              </Box>
            )}
          </Box>

          {todayQuestions.length === 0 ? (
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
              <Box sx={{ fontSize: 48, mb: 1 }}>🎉</Box>
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={500}
              >
                No revisions due today!
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                You're all caught up. Great work!
              </Typography>
            </Paper>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {todayQuestions.map((q) => (
                <QuestionCard key={q._id} question={q} onUpdate={fetchData} />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
