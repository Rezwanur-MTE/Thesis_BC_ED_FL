import { Link } from "react-router-dom";
import styles from "./Login.module.css";
// prop validatuin
import PropTypes from "prop-types";

function Login({ isLoggedIn, setIsLoggedIn }) {
  function handleLogin() {
    setIsLoggedIn((prev) => !prev);
  }

  if (isLoggedIn) {
    return (
      <div className={styles.container}>
        <Link to={`/home`} className={styles.link} onClick={handleLogin}>
          Sign Out
        </Link>
      </div>
    );
  } else
    return (
      <>
        <div className={styles.container}>
          <h1 className={styles.h1}>MetaMask Wallet ID</h1>
          <Link to={`/home`} className={styles.link} onClick={handleLogin}>
            Sign In
          </Link>
        </div>
      </>
    );
}

Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Login;
