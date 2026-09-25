import { Link } from "react-router-dom";
import styles from "../Exercise/shared-pages.module.css";

function PlannerDayCard({ exercise, index, onRemove }) {
  return (
    <div
      className={styles.planItem}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <span className={styles.planNumber}>0{index + 1}</span>
      <div>
        <Link to={`/exercises/${exercise.id}`}>
          <h3>{exercise.name}</h3>
        </Link>
        <span>
          {exercise.muscleGroups.join(", ")} · {exercise.duration}
        </span>
      </div>
      <button
        className={styles.removeButton}
        onClick={() => onRemove(exercise.id)}
        aria-label={`Remove ${exercise.name}`}
      >
        ×
      </button>
    </div>
  );
}

export default PlannerDayCard;
