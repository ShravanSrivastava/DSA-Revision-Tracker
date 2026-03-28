import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MenuBookIcon sx={{ color: "#1976d2" }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: "#1a1a2e",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            DSA Revision Tracker
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              <Button
                component={Link}
                to="/"
                sx={{ color: "#555", textTransform: "none" }}
              >
                Dashboard
              </Button>
              <Button
                component={Link}
                to="/questions"
                sx={{ color: "#555", textTransform: "none" }}
              >
                My Questions
              </Button>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Hi, {user.name}!
              </Typography>
              <Button
                onClick={handleLogout}
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  borderColor: "#e0e0e0",
                  color: "#555",
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{ color: "#555", textTransform: "none" }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="small"
                sx={{ textTransform: "none" }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
