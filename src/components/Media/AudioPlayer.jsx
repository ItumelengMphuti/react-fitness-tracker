import PropTypes from "prop-types";
import styles from "./Media.module.css";

function AudioPlayer({ audioUrl, title, description = "" }) {
  return (
    <section className={styles.mediaCard}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <audio controls preload="metadata" className={styles.audio}>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </section>
  );
}

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default AudioPlayer;
