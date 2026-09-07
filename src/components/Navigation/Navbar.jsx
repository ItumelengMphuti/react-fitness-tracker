import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Exercises", to: "/exercises" },
  { label: "Planner", to: "/planner" },
  { label: "History", to: "/history" },
  { label: "Progress", to: "/progress" },
];

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <Link to="/" className={styles.logo}>
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            className={styles.logoImage}
          />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default NavBar;
