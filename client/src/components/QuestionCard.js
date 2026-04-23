import { markRevision, deleteQuestion } from "../utils/api";
import toast from "react-hot-toast";
import { format } from "date-fns";
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  Checkbox,
  Divider,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useState } from "react";

const difficultyColors = {
  Easy: { bg: "#D1FAE5", text: "#047857", border: "#6EE7B7" },
  Medium: { bg: "#FEF3C7", text: "#B45309", border: "#FCD34D" },
  Hard: { bg: "#FEE2E2", text: "#991B1B", border: "#FECACA" },
};

const QuestionCard = ({ question, onUpdate }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleMarkRevision = async (revisionId) => {
    try {
      await markRevision(question._id, revisionId);
      toast.success("Revision updated! 🎉");
      onUpdate();
    } catch (error) {
      toast.error("Failed to update revision");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQuestion(question._id);
      toast.success("Question deleted!");
      setOpenDeleteDialog(false);
      onUpdate();
    } catch (error) {
      toast.error("Failed to delete question");
    }
  };

  const completedRevisions = question.revisionPlan.filter(
    (r) => r.status === "done",
  ).length;
  const totalRevisions = question.revisionPlan.length;
  const progressPercent = Math.round(
    (completedRevisions / totalRevisions) * 100,
  );

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #E2E8F0",
          borderRadius: 2,
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            borderColor: "#CBD5E1",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            backgroundColor: "#F8FAFC",
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}
            >
              <Typography fontWeight={600} fontSize={15} color="#1E293B">
                {question.title}
              </Typography>
              {question.url && (
                <Tooltip title="Open in LeetCode">
                  <IconButton
                    size="small"
                    href={question.url}
                    target="_blank"
                    sx={{
                      color: "#5B7EFF",
                      "&:hover": { backgroundColor: "#5B7EFF20" },
                    }}
                  >
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {question.topic && (
                <Chip
                  label={question.topic}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: 11,
                    fontWeight: 500,
                    borderColor: "#CBD5E1",
                    backgroundColor: "#F1F5F9",
                  }}
                />
              )}
              <Chip
                label={question.difficulty}
                size="small"
                sx={{
                  fontSize: 11,
                  fontWeight: 600,
                  backgroundColor: difficultyColors[question.difficulty].bg,
                  color: difficultyColors[question.difficulty].text,
                  border: `1.5px solid ${difficultyColors[question.difficulty].border}`,
                }}
              />
            </Box>
          </Box>
          <IconButton
            onClick={() => setOpenDeleteDialog(true)}
            size="small"
            sx={{
              color: "#94A3B8",
              "&:hover": {
                color: "#EF4444",
                backgroundColor: "#FEE2E2",
              },
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ px: 3, pt: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600} color="text.secondary">
              Progress
            </Typography>
            <Typography variant="body2" fontWeight={600} color="#5B7EFF">
              {completedRevisions}/{totalRevisions}
            </Typography>
          </Box>
          <Box
            sx={{
              height: 6,
              backgroundColor: "#E2E8F0",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${progressPercent}%`,
                backgroundColor: "#10B981",
                transition: "width 0.3s ease",
              }}
            />
          </Box>
        </Box>

        {/* Revisions */}
        <Box sx={{ p: 3 }}>
          <Typography
            variant="body2"
            fontWeight={600}
            color="text.secondary"
            mb={1.5}
          >
            📅 Revision Schedule
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {question.revisionPlan.map((revision, index) => (
              <Box
                key={revision._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 1,
                  backgroundColor:
                    revision.status === "done" ? "#F0FDF4" : "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  transition: "all 0.2s ease",
                }}
              >
                <Checkbox
                  checked={revision.status === "done"}
                  onChange={() => handleMarkRevision(revision._id)}
                  size="small"
                  sx={{
                    color: "#5B7EFF",
                    "&.Mui-checked": {
                      color: "#10B981",
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    textDecoration:
                      revision.status === "done" ? "line-through" : "none",
                    color: revision.status === "done" ? "#94A3B8" : "#1E293B",
                    fontWeight: 500,
                  }}
                >
                  Revision {index + 1} —{" "}
                  {format(new Date(revision.date), "MMM dd, yyyy")}
                </Typography>
                <Chip
                  label={revision.status === "done" ? "✓ Done" : "Pending"}
                  size="small"
                  sx={{
                    fontSize: 11,
                    fontWeight: 600,
                    backgroundColor:
                      revision.status === "done" ? "#D1FAE5" : "#FEF3C7",
                    color: revision.status === "done" ? "#047857" : "#B45309",
                    border: `1px solid ${revision.status === "done" ? "#6EE7B7" : "#FCD34D"}`,
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, color: "#1E293B" }}>
          Delete Question?
        </DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            Are you sure you want to delete "<strong>{question.title}</strong>"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            sx={{ textTransform: "none", color: "#64748B" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#EF4444",
              "&:hover": { backgroundColor: "#DC2626" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuestionCard;
