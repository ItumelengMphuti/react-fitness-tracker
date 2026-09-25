import { useFitness } from "../context/FitnessContext";
import ProgressChartBar from "../components/ProgressChartBar";
import styles from "../components/Exercise/shared-pages.module.css";

function ProgressPage() {
  const { history } = useFitness();
  /** Volume is the total load moved across every set and repetition. */
  const calculateVolume = (item) => item.sets * item.reps * item.weight;
  const totalVolume = history.reduce(
    (sum, item) => sum + calculateVolume(item),
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
              <ProgressChartBar
                item={item}
                key={item.id}
                maxVolume={Math.max(...chart.map(calculateVolume))}
              />
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
