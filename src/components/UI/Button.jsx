import styles from './UI.module.css';

function Button({ children, variant = 'primary', href, onClick, type = 'button', ...rest }) {
  const className=`${styles.button} ${styles[variant]}`;

  if (href) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className} {...rest}>
      {children}
    </button>
  );
}

export default Button;