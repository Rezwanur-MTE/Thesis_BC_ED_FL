import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import PropTypes from "prop-types";

function Navbar({ isLoggedIn}) {
  return (
    <div className={styles.container}>
      <Link to={`/home`} className={styles.link}>
        Home
      </Link>
      <Link to={`/upload`} className={styles.link}>
        Upload
      </Link>
      <Link to={`/upload`} className={styles.link}>
        Settings
      </Link>
      <Link to={`/login`} className={styles.link}>
        {isLoggedIn ? "Logout" : "Login"}
      </Link>
    </div>
  );
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Navbar;
