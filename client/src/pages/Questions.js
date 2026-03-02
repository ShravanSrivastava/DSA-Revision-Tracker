import { useState, useEffect } from "react";
import { getQuestions } from "../utils/api";
import QuestionCard from "../components/QuestionCard";
import AddQuestionForm from "../components/AddQuestionForm";

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

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <AddQuestionForm onQuestionAdded={fetchQuestions} />

      <div style={styles.filterRow}>
        <h2 style={styles.heading}>📚 My Questions ({questions.length})</h2>
        <div style={styles.filters}>
          {["All", "Easy", "Medium", "Hard"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                backgroundColor: filter === f ? "#1a1a2e" : "white",
                color: filter === f ? "white" : "#1a1a2e",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={styles.emptyState}>
          No questions found. Add your first question above! 👆
        </div>
      ) : (
        filtered.map((q) => (
          <QuestionCard key={q._id} question={q} onUpdate={fetchQuestions} />
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
  filterRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "10px",
  },
  heading: {
    color: "#1a1a2e",
    margin: 0,
  },
  filters: {
    display: "flex",
    gap: "8px",
  },
  filterBtn: {
    border: "1px solid #1a1a2e",
    padding: "6px 14px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "13px",
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

export default Questions;
