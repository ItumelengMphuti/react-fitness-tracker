import PropTypes from "prop-types";
import styles from "./UI.module.css";

function Modal({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div className={styles.modalBackdrop} role="presentation" onClick={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 id="modal-title">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close dialog">
            x
          </button>
        </div>
        <div>{children}</div>
      </section>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
