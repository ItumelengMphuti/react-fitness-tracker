import { useEffect, useState } from "react";
import { EXERCISES } from "../data/exercisesData";
import { useFitness } from "../context/FitnessContext";
import styles from "../components/Exercise/shared-pages.module.css";

function HistoryPage() {
  const { history, logWorkout } = useFitness();
  const [exerciseId, setExerciseId] = useState(EXERCISES[0].id);
  const [sets, setSets] = useState("3");
  const [reps, setReps] = useState("10");
  const [weight, setWeight] = useState("20");
  useEffect(() => {
    document.title = "History | FitFlow";
  }, []);
  function submit(event) {
    event.preventDefault();
    const exercise = EXERCISES.find((item) => item.id === exerciseId);
    logWorkout({
      exercise: exercise.name,
      sets: Number(sets),
      reps: Number(reps),
      weight: Number(weight),
      date: new Date().toISOString(),
    });
  }
  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <div>
          <span className={styles.eyebrow}>Training log</span>
          <h1>Workout history</h1>
          <p>
            Record completed work and keep a searchable record of the lifts that
            move you forward.
          </p>
        </div>
      </div>
      <div className={styles.historyLayout}>
        <form className={styles.logForm} onSubmit={submit}>
          <h2>Log a completed exercise</h2>
          <label>
            Exercise
            <select
              value={exerciseId}
              onChange={(event) => setExerciseId(event.target.value)}
            >
              {EXERCISES.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.formRow}>
            <label>
              Sets
              <input
                type="number"
                min="1"
                value={sets}
                onChange={(event) => setSets(event.target.value)}
              />
            </label>
            <label>
              Reps
              <input
                type="number"
                min="1"
                value={reps}
                onChange={(event) => setReps(event.target.value)}
              />
            </label>
            <label>
              Weight (kg)
              <input
                type="number"
                min="0"
                step="0.5"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
              />
            </label>
          </div>
          <button className={styles.primaryButton}>Save workout</button>
        </form>
        <section className={styles.historyList}>
          <div className={styles.panelHeader}>
            <h2>Recent sessions</h2>
            <span className={styles.muted}>{history.length} logged</span>
          </div>
          {history.map((item) => (
            <article className={styles.historyItem} key={item.id}>
              <div>
                <h3>{item.exercise}</h3>
                <span>
                  {new Date(item.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <strong>
                {item.sets} × {item.reps}
                <small>{item.weight} kg</small>
              </strong>
            </article>
          ))}
          {!history.length && (
            <div className={styles.empty}>
              <p>Your logged workouts will appear here.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default HistoryPage;
