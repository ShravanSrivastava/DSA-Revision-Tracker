import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F8FAFC",
        py: 2,
      }}
    >
      <Box sx={{ width: "100%", display: "flex" }}>
        {/* Left Side - Branding */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            width: "50%",
            background: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
            color: "#FFFFFF",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-50%",
              right: "-20%",
              width: "400px",
              height: "400px",
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-50%",
              left: "-20%",
              width: "300px",
              height: "300px",
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
            },
          }}
        >
          <Box sx={{ zIndex: 1, textAlign: "center" }}>
            <Box sx={{ fontSize: 64, mb: 2 }}>🚀</Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              Get Started
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 300 }}>
              Join thousands of developers mastering DSA with smart revision
              schedules
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Register Form */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              width: "100%",
              maxWidth: 400,
              border: "1px solid #E2E8F0",
              borderRadius: 2,
              backgroundColor: "#FFFFFF",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <MenuBookIcon sx={{ fontSize: 28, color: "#FFFFFF" }} />
              </Box>
              <Typography variant="h5" fontWeight={700} color="#1E293B">
                Create Account
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Start your DSA journey today
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              <TextField
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                size="small"
                placeholder="John Doe"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#5B7EFF", mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                size="small"
                placeholder="you@example.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#5B7EFF", mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                size="small"
                placeholder="••••••••"
                helperText="Min. 6 characters"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#5B7EFF", mr: 1 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: "#5B7EFF" }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon fontSize="small" />
                        ) : (
                          <VisibilityIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1.2,
                  background:
                    "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
                  fontWeight: 600,
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </Box>

            <Box sx={{ mt: 3, pt: 2.5, borderTop: "1px solid #E2E8F0" }}>
              <Typography
                variant="body2"
                textAlign="center"
                color="text.secondary"
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#5B7EFF",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
