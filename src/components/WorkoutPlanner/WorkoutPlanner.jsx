import { useState } from "react";
import { Link } from "react-router-dom";
import { EXERCISES, WEEKDAYS } from "../../data/exercisesData";
import { useFitness } from "../../context/FitnessContext";
import styles from "../Exercise/shared-pages.module.css";

function WorkoutPlannerPage() {
  const { planner, addToPlanner, removeFromPlanner } = useFitness();
  const [day, setDay] = useState("Monday");
  const [selected, setSelected] = useState(EXERCISES[0].id);
  const exercises = planner[day] || [];
  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <div>
          <span className={styles.eyebrow}>Weekly plan</span>
          <h1>Build your week</h1>
          <p>
            Assign movements to each day, then use your plan as a simple session
            checklist.
          </p>
        </div>
      </div>
      <div className={styles.plannerLayout}>
        <aside className={styles.dayList}>
          {WEEKDAYS.map((weekday) => (
            <button
              className={day === weekday ? styles.dayActive : ""}
              key={weekday}
              onClick={() => setDay(weekday)}
            >
              <span>{weekday.slice(0, 3)}</span>
              <strong>{(planner[weekday] || []).length}</strong>
            </button>
          ))}
        </aside>
        <section className={styles.planPanel}>
          <div className={styles.panelHeader}>
            <div>
              <span className={styles.eyebrow}>{day}</span>
              <h2>
                {exercises.length
                  ? `${exercises.length} exercises planned`
                  : "Rest or add a session"}
              </h2>
            </div>
            <label className={styles.addExercise}>
              {" "}
              <span className="srOnly">Choose exercise</span>
              <select
                value={selected}
                onChange={(event) => setSelected(event.target.value)}
              >
                {EXERCISES.map((exercise) => (
                  <option value={exercise.id} key={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </select>
              <button
                className={styles.primaryButton}
                onClick={() =>
                  addToPlanner(
                    day,
                    EXERCISES.find((exercise) => exercise.id === selected),
                  )
                }
              >
                Add exercise
              </button>
            </label>
          </div>
          <div className={styles.planList}>
            {exercises.map((exercise, index) => (
              <div className={styles.planItem} key={exercise.id}>
                <span className={styles.planNumber}>0{index + 1}</span>
                <div>
                  <Link to={`/exercises/${exercise.id}`}>
                    <h3>{exercise.name}</h3>
                  </Link>
                  <span>
                    {exercise.muscle} · {exercise.duration}
                  </span>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromPlanner(day, exercise.id)}
                  aria-label={`Remove ${exercise.name}`}
                >
                  ×
                </button>
              </div>
            ))}
            {!exercises.length && (
              <div className={styles.empty}>
                <p>Select a movement above to start this day.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default WorkoutPlannerPage;
