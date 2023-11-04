import PropTypes from "prop-types";
import FileUploader from "../component/FileUploader";
import styles from './UploadFile.module.css'


function UploadFile({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <div className={styles.container2}>Please Sign in</div>;
  } else return (<div className={styles.containers}
   >
    <h1 className={styles.h1}>Select the file you want to upload</h1>
   <FileUploader/></div>)
}

UploadFile.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default UploadFile;
