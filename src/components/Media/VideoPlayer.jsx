import PropTypes from "prop-types";
import styles from "./Media.module.css";

function getYouTubeEmbedUrl(videoUrl) {
  try {
    const url = new URL(videoUrl);
    const isYouTube =
      url.hostname === "youtu.be" ||
      url.hostname === "www.youtube.com" ||
      url.hostname === "youtube.com";

    if (!isYouTube) return null;

    const videoId =
      url.hostname === "youtu.be"
        ? url.pathname.slice(1)
        : url.pathname.startsWith("/embed/")
          ? url.pathname.split("/")[2]
          : url.searchParams.get("v");

    return videoId
      ? `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?controls=1`
      : null;
  } catch {
    return null;
  }
}

function VideoPlayer({ videoUrl, title, description = "" }) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <section className={styles.mediaCard}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {embedUrl ? (
        <iframe
          className={styles.video}
          src={embedUrl}
          title={`${title} video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video controls preload="metadata" className={styles.video}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </section>
  );
}

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default VideoPlayer;
