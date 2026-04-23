import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5B7EFF",
      light: "#7B9EFF",
      dark: "#3B5EDB",
    },
    secondary: {
      main: "#FFA500",
      light: "#FFB81A",
      dark: "#E69500",
    },
    success: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#D97706",
    },
    error: {
      main: "#EF4444",
      light: "#F87171",
      dark: "#DC2626",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h4: {
      fontSize: "32px",
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h5: {
      fontSize: "24px",
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h6: {
      fontSize: "18px",
      fontWeight: 600,
      letterSpacing: "-0.2px",
    },
    body1: {
      fontSize: "14px",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "13px",
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 600,
          fontSize: "14px",
          padding: "10px 16px",
          transition: "all 0.3s ease",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(91, 126, 255, 0.3)",
            transform: "translateY(-2px)",
          },
        },
        outlined: {
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            fontSize: "14px",
            "&:hover fieldset": {
              borderColor: "#5B7EFF",
            },
            "&.Mui-focused fieldset": {
              borderWidth: "2px",
            },
          },
          "& .MuiInputBase-input::placeholder": {
            opacity: 0.6,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          fontWeight: 500,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
