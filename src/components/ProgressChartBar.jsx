import styles from "./Exercise/shared-pages.module.css";

function ProgressChartBar({ item, maxVolume }) {
  const volume = item.sets * item.reps * item.weight;

  return (
    <div className={styles.barColumn}>
      <span>{volume}</span>
      <div
        className={styles.bar}
        style={{ height: `${Math.max(12, (volume / maxVolume) * 170)}px` }}
      />
      <small>
        {new Date(item.date).toLocaleDateString(undefined, {
          weekday: "short",
        })}
      </small>
    </div>
  );
}

export default ProgressChartBar;
