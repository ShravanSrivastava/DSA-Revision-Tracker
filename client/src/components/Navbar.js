import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        backgroundImage: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
        opacity: 0.95,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
              borderRadius: "8px",
              p: 0.75,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MenuBookIcon sx={{ color: "#fff", fontSize: 24 }} />
          </Box>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: "#FFFFFF",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "18px",
              letterSpacing: "-0.5px",
            }}
          >
            DSA Tracker
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {user ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                  component={Link}
                  to="/"
                  sx={{
                    color: "#FFFFFF",
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 500,
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  component={Link}
                  to="/questions"
                  sx={{
                    color: "#FFFFFF",
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 500,
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  Questions
                </Button>
              </Box>

              <Box
                sx={{ borderLeft: "1px solid rgba(255,255,255,0.2)", pl: 2 }}
              >
                <Button
                  onClick={handleMenuOpen}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    textTransform: "none",
                    color: "#FFFFFF",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "rgba(255,255,255,0.3)",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    {user.name}
                  </Typography>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={handleMenuClose} sx={{ py: 1 }}>
                    <Typography sx={{ fontSize: "13px" }}>
                      {user.email}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      handleLogout();
                    }}
                    sx={{ color: "#EF4444" }}
                  >
                    <LogoutIcon sx={{ mr: 1, fontSize: 18 }} />
                    <Typography sx={{ fontSize: "14px" }}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: 500,
                  "&:hover": { opacity: 0.8 },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="small"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#FFFFFF",
                  color: "#667EEA",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
                }}
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
