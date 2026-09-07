import PropTypes from "prop-types";
import styles from "./UI.module.css";

function Badge({ children, tone = "neutral", className = "" }) {
  return (
    <span className={`${styles.badge} ${styles[tone]} ${className}`}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  tone: PropTypes.oneOf(["neutral", "accent", "muted"]),
  className: PropTypes.string,
};

export default Badge;
