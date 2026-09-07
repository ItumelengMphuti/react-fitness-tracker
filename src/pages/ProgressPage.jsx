import { useFitness } from "../context/FitnessContext";
import styles from "../components/Exercise/shared-pages.module.css";

function ProgressPage() {
  const { history } = useFitness();
  const totalVolume = history.reduce(
    (sum, item) => sum + item.sets * item.reps * item.weight,
    0,
  );
  const exerciseCount = new Set(history.map((item) => item.exercise)).size;
  const maxWeight = history.length
    ? Math.max(...history.map((item) => item.weight))
    : 0;
  const chart = history.slice(0, 7).reverse();
  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <div>
          <span className={styles.eyebrow}>Your momentum</span>
          <h1>Progress over time</h1>
          <p>
            Small, consistent sessions add up. These numbers are calculated from
            your workout history.
          </p>
        </div>
      </div>
      <div className={styles.metrics}>
        <div>
          <strong>{history.length}</strong>
          <span>sessions logged</span>
        </div>
        <div>
          <strong>
            {totalVolume.toLocaleString()}
            <small> kg</small>
          </strong>
          <span>total volume</span>
        </div>
        <div>
          <strong>{exerciseCount}</strong>
          <span>movements trained</span>
        </div>
        <div>
          <strong>
            {maxWeight}
            <small> kg</small>
          </strong>
          <span>heaviest set</span>
        </div>
      </div>
      <section className={styles.progressPanel}>
        <div className={styles.panelHeader}>
          <div>
            <span className={styles.eyebrow}>Recent volume</span>
            <h2>Keep showing up</h2>
          </div>
          <span className={styles.muted}>Last 7 entries</span>
        </div>
        {chart.length ? (
          <div className={styles.chart}>
            {chart.map((item) => (
              <div className={styles.barColumn} key={item.id}>
                <span>{item.sets * item.reps * item.weight}</span>
                <div
                  className={styles.bar}
                  style={{
                    height: `${Math.max(12, ((item.sets * item.reps * item.weight) / Math.max(...chart.map((entry) => entry.sets * entry.reps * entry.weight))) * 170)}px`,
                  }}
                />
                <small>
                  {new Date(item.date).toLocaleDateString(undefined, {
                    weekday: "short",
                  })}
                </small>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>Log your first workout to unlock your progress chart.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProgressPage;
