import PropTypes from "prop-types";
import styles from "./Home.module.css";
import Details from "./../component/Details";
function Home({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <div className={styles.container2}>Please Sign in</div>;
  } else return <div className={styles.container}>
    <h1 className={styles.h1}>Decentraliced Server</h1>
    <div className={styles.userF}>
      <p className={styles.userFp}>user id:</p>
      <p className={styles.userFp}>Status:</p>
    </div>
    <Details/>
  </div>;
}

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Home;
