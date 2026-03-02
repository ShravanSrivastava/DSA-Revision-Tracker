import { useState } from "react";
import { addQuestion } from "../utils/api";
import toast from "react-hot-toast";

const AddQuestionForm = ({ onQuestionAdded }) => {
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
      toast.success("Question added successfully!");
      setTitle("");
      setUrl("");
      setTopic("");
      setDifficulty("Medium");
      setIntervals("1,7,30");
      onQuestionAdded();
    } catch (error) {
      toast.error("Failed to add question");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>➕ Add New Question</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Question title (e.g. Two Sum)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="LeetCode URL (optional)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Topic (e.g. Arrays, Trees)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <select
          style={styles.input}
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <div style={styles.intervalContainer}>
          <label style={styles.label}>
            Revision intervals (days, comma separated):
          </label>
          <input
            style={styles.input}
            type="text"
            placeholder="e.g. 1,7,30 means tomorrow, next week, next month"
            value={intervals}
            onChange={(e) => setIntervals(e.target.value)}
          />
        </div>
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Question"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  heading: {
    marginBottom: "20px",
    color: "#1a1a2e",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px 15px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "15px",
    outline: "none",
  },
  intervalContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontSize: "14px",
    color: "#555",
  },
  button: {
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "5px",
  },
};

export default AddQuestionForm;
