import { Outlet } from "react-router-dom";
import styles from './AppLayout.module.css'
import Navbar from "./../component/Navbar";
import PropTypes from "prop-types";

function AppLayout({isLoggedIn}) {
  return <div className={styles.body}>
  <Navbar isLoggedIn={isLoggedIn} />
  <Outlet/>
  </div>;
}

AppLayout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppLayout;
