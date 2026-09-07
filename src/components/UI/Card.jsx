import styles from './UI.module.css';

function Card ({ eyebrow, title, children, className = '' }) {
    return (
      <div className={`${styles.card} ${className}`}>
        {eyebrow && <span className={styles.cardEyebrow}>{eyebrow}</span>}
        {title && <h3 className={styles.cardTitle}>{title}</h3>}
        <div className={styles.cardBody}>{children}</div>
      </div>
    );
}

export default Card;