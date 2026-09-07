import PropTypes from "prop-types";
import styles from "./UI.module.css";

function Card({ eyebrow, title, children, className = "", style }) {
  return (
    <div className={`${styles.card} ${className}`} style={style}>
      {eyebrow && <span className={styles.cardEyebrow}>{eyebrow}</span>}
      {title && <h3 className={styles.cardTitle}>{title}</h3>}
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}

export default Card;

Card.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};
