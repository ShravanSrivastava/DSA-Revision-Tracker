import { useState, useEffect } from "react";
import { getTodayRevisions, getQuestions } from "../utils/api";
import QuestionCard from "../components/QuestionCard";
import { useAuth } from "../context/AuthContext";

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

  if (loading) return <div style={styles.loading}>Loading...</div>;

  const totalDone = allQuestions.reduce(
    (acc, q) => acc + q.revisionPlan.filter((r) => r.status === "done").length,
    0,
  );
  const totalRevisions = allQuestions.reduce(
    (acc, q) => acc + q.revisionPlan.length,
    0,
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>👋 Welcome back, {user?.name}!</h1>

      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{allQuestions.length}</h2>
          <p style={styles.statLabel}>Total Questions</p>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{todayQuestions.length}</h2>
          <p style={styles.statLabel}>Due Today</p>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>
            {totalDone}/{totalRevisions}
          </h2>
          <p style={styles.statLabel}>Revisions Done</p>
        </div>
      </div>

      <h2 style={styles.sectionTitle}>📅 Today's Revisions</h2>
      {todayQuestions.length === 0 ? (
        <div style={styles.emptyState}>
          🎉 No revisions due today! Go add some questions.
        </div>
      ) : (
        todayQuestions.map((q) => (
          <QuestionCard key={q._id} question={q} onUpdate={fetchData} />
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "30px 20px",
  },
  heading: {
    color: "#1a1a2e",
    marginBottom: "25px",
  },
  statsRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  statCard: {
    backgroundColor: "white",
    padding: "20px 30px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    flex: 1,
    textAlign: "center",
    minWidth: "150px",
  },
  statNumber: {
    color: "#1a1a2e",
    fontSize: "32px",
    margin: "0 0 5px 0",
  },
  statLabel: {
    color: "#777",
    margin: 0,
    fontSize: "14px",
  },
  sectionTitle: {
    color: "#1a1a2e",
    marginBottom: "15px",
  },
  emptyState: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    color: "#555",
    fontSize: "16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
  loading: {
    textAlign: "center",
    padding: "50px",
    fontSize: "18px",
  },
};

export default Dashboard;
