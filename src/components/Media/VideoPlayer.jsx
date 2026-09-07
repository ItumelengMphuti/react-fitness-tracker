import PropTypes from "prop-types";
import styles from "./Media.module.css";

function VideoPlayer({ videoUrl, title, description = "" }) {
  return (
    <section className={styles.mediaCard}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <video controls preload="metadata" className={styles.video}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default VideoPlayer;
