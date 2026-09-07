import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./UI.module.css";

function SearchBar({
  value,
  onChange,
  onSubmit = (event) => event.preventDefault(),
  placeholder = "Search exercises...",
}) {
  const [focused, setFocused] = useState(false);

  return (
    <form
      className={`${styles.searchBar} ${focused ? styles.focused : ""}`}
      onSubmit={onSubmit}
    >
      <span className="srOnly">Search exercises</span>
      <input
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        type="search"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange({ target: { value: "" } })}
        >
          Clear
        </button>
      )}
    </form>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchBar;
