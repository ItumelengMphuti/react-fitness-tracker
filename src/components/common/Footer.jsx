import { Link } from "react-router-dom";
import styles from "./common.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div>
          <img
            src="/assets/images/logo2.png"
            alt="Setbook"
            className={styles.footerLogo}
          />
          <p className={styles.footerNote}>FitFlow - Track your workout</p>
        </div>

        <div className={styles.footerLinks}>
          <Link to="/exercises">Exercises</Link>
          <Link to="/planner">Planner</Link>
          <Link to="/history">History</Link>
          <Link to="/progress">Progress</Link>
        </div>
        <p className={styles.footerCopy}>
          © {new Date().getFullYear()} FitFlow.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
