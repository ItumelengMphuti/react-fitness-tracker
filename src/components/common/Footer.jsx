import styles from './common.module.css';

function Footer() {
    return (
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div>
            <span className={styles.logoMark}>LOGO</span>
            <p className={styles.footerNote}>Setbook - training log</p>
          </div>

          <div className={styles.footerLinks}>
            <a href="#exercises">Exercises</a>
            <a href="#planner">Planner</a>
            <a href="#progress">Progress</a>
          </div>
          <p className={styles.footerCopy}>
            © {new Date().getFullYear()} Setbook.
          </p>
        </div>
      </footer>
    );
}

export default Footer;