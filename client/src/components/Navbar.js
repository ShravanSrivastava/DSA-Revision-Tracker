import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        🧠 DSA Revision Tracker
      </Link>
      <div style={styles.links}>
        {user ? (
          <>
            <Link to="/" style={styles.link}>
              Dashboard
            </Link>
            <Link to="/questions" style={styles.link}>
              My Questions
            </Link>
            <span style={styles.username}>Hi, {user.name}!</span>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#1a1a2e",
    color: "white",
  },
  brand: {
    color: "white",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
  username: {
    color: "#a8dadc",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#e63946",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Navbar;
