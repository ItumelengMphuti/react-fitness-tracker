import PropTypes from "prop-types";
import styles from "./common.module.css";

function Loading({ message = "Loading your training space" }) {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <span className={styles.loadingBar} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

export default Loading;

Loading.propTypes = {
  message: PropTypes.string,
};
