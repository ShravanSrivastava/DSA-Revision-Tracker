import { markRevision, deleteQuestion } from "../utils/api";
import toast from "react-hot-toast";
import { format } from "date-fns";

const difficultyColors = {
  Easy: "#2ecc71",
  Medium: "#f39c12",
  Hard: "#e74c3c",
};

const QuestionCard = ({ question, onUpdate }) => {
  const handleMarkRevision = async (revisionId) => {
    try {
      await markRevision(question._id, revisionId);
      toast.success("Revision updated!");
      onUpdate();
    } catch (error) {
      toast.error("Failed to update revision");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await deleteQuestion(question._id);
        toast.success("Question deleted!");
        onUpdate();
      } catch (error) {
        toast.error("Failed to delete question");
      }
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>
            {question.url ? (
              <a
                href={question.url}
                target="_blank"
                rel="noreferrer"
                style={styles.titleLink}
              >
                {question.title}
              </a>
            ) : (
              question.title
            )}
          </h3>
          <div style={styles.tags}>
            {question.topic && (
              <span style={styles.topic}>{question.topic}</span>
            )}
            <span
              style={{
                ...styles.difficulty,
                backgroundColor: difficultyColors[question.difficulty],
              }}
            >
              {question.difficulty}
            </span>
          </div>
        </div>
        <button onClick={handleDelete} style={styles.deleteBtn}>
          🗑️
        </button>
      </div>

      <div style={styles.revisions}>
        <p style={styles.revisionTitle}>📅 Revision Schedule:</p>
        {question.revisionPlan.map((revision, index) => (
          <div key={revision._id} style={styles.revisionItem}>
            <input
              type="checkbox"
              checked={revision.status === "done"}
              onChange={() => handleMarkRevision(revision._id)}
              style={styles.checkbox}
            />
            <span
              style={{
                ...styles.revisionDate,
                textDecoration:
                  revision.status === "done" ? "line-through" : "none",
                color: revision.status === "done" ? "#aaa" : "#333",
              }}
            >
              Revision {index + 1} —{" "}
              {format(new Date(revision.date), "MMM dd, yyyy")}
            </span>
            <span
              style={{
                ...styles.statusBadge,
                backgroundColor:
                  revision.status === "done" ? "#2ecc71" : "#e74c3c",
              }}
            >
              {revision.status === "done" ? "✅ Done" : "⏳ Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    marginBottom: "15px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px",
  },
  title: {
    margin: "0 0 8px 0",
    color: "#1a1a2e",
    fontSize: "18px",
  },
  titleLink: {
    color: "#1a1a2e",
    textDecoration: "none",
  },
  tags: {
    display: "flex",
    gap: "8px",
  },
  topic: {
    backgroundColor: "#e8f4f8",
    color: "#2980b9",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },
  difficulty: {
    color: "white",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },
  deleteBtn: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  revisions: {
    borderTop: "1px solid #f0f0f0",
    paddingTop: "12px",
  },
  revisionTitle: {
    margin: "0 0 10px 0",
    fontWeight: "bold",
    color: "#555",
    fontSize: "14px",
  },
  revisionItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    cursor: "pointer",
  },
  revisionDate: {
    fontSize: "14px",
    flex: 1,
  },
  statusBadge: {
    color: "white",
    padding: "2px 8px",
    borderRadius: "10px",
    fontSize: "11px",
  },
};

export default QuestionCard;
