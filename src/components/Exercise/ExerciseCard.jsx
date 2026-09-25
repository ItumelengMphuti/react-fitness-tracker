import { Link } from "react-router-dom";
import Badge from "../UI/Badge";
import styles from "./shared-pages.module.css";

function ExerciseCard({ exercise, index, onAddToPlanner }) {
  return (
    <article
      className={styles.exerciseCard}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <img
        src={exercise.image}
        alt={exercise.name}
        className={styles.exerciseCardImage}
      />
      <div className={styles.exerciseCardTop}>
        <Badge tone="accent">{exercise.category}</Badge>
        <span>{exercise.duration}</span>
      </div>
      <h2>{exercise.name}</h2>
      <p>{exercise.description}</p>
      <div className={styles.meta}>
        <span>{exercise.muscleGroups.join(", ")}</span>
        <Badge tone="muted">{exercise.difficulty}</Badge>
      </div>
      <div className={styles.cardActions}>
        <Link className={styles.textLink} to={`/exercises/${exercise.id}`}>
          View form →
        </Link>
        <button
          className={styles.smallButton}
          onClick={() => onAddToPlanner("Monday", exercise)}
        >
          + Monday
        </button>
      </div>
    </article>
  );
}

export default ExerciseCard;
