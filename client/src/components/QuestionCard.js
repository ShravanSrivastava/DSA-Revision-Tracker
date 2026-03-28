import { markRevision, deleteQuestion } from '../utils/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import {
  Box, Typography, Paper, Chip, IconButton,
  Checkbox, Divider, Tooltip
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const difficultyColors = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
};

const QuestionCard = ({ question, onUpdate }) => {
  const handleMarkRevision = async (revisionId) => {
    try {
      await markRevision(question._id, revisionId);
      toast.success('Revision updated!');
      onUpdate();
    } catch (error) {
      toast.error('Failed to update revision');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await deleteQuestion(question._id);
        toast.success('Question deleted!');
        onUpdate();
      } catch (error) {
        toast.error('Failed to delete question');
      }
    }
  };

  return (
    <Paper elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 3, mb: 2, overflow: 'hidden' }}>
      <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography fontWeight={600} fontSize={16} color="#1a1a2e">
              {question.title}
            </Typography>
            {question.url && (
              <Tooltip title="Open in LeetCode">
                <IconButton size="small" href={question.url} target="_blank" sx={{ color: '#1976d2' }}>
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {question.topic && (
              <Chip label={question.topic} size="small" variant="outlined" sx={{ fontSize: 11 }} />
            )}
            <Chip
              label={question.difficulty}
              size="small"
              color={difficultyColors[question.difficulty]}
              sx={{ fontSize: 11 }}
            />
          </Box>
        </Box>
        <IconButton onClick={handleDelete} size="small" sx={{ color: '#bbb', '&:hover': { color: '#e74c3c' } }}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ p: 2.5 }}>
        <Typography variant="body2" fontWeight={600} color="text.secondary" mb={1.5}>
          📅 Revision Schedule
        </Typography>
        {question.revisionPlan.map((revision, index) => (
          <Box key={revision._id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Checkbox
              checked={revision.status === 'done'}
              onChange={() => handleMarkRevision(revision._id)}
              size="small"
              color="success"
            />
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                textDecoration: revision.status === 'done' ? 'line-through' : 'none',
                color: revision.status === 'done' ? '#aaa' : '#333',
              }}
            >
              Revision {index + 1} — {format(new Date(revision.date), 'MMM dd, yyyy')}
            </Typography>
            <Chip
              label={revision.status === 'done' ? 'Done' : 'Pending'}
              size="small"
              color={revision.status === 'done' ? 'success' : 'default'}
              sx={{ fontSize: 10 }}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default QuestionCard;
