import { Link, useNavigate, useParams } from "react-router-dom";
import { EXERCISES, WEEKDAYS } from "../../data/exercisesData";
import { useFitness } from "../../context/FitnessContext";
import styles from "./shared-pages.module.css";

function ExerciseDetail() {
  const { exerciseId } = useParams();
  const exercise = EXERCISES.find((item) => item.id === exerciseId);
  const { addToPlanner } = useFitness();
  const navigate = useNavigate();
  if (!exercise)
    return (
      <div className="container">
        <div className={styles.empty}>
          <h1>Exercise not found</h1>
          <Link className={styles.textLink} to="/exercises">
            Back to library
          </Link>
        </div>
      </div>
    );
  return (
    <div className="container">
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back to library
      </button>
      <div className={styles.detailLayout}>
        <section>
          <span className={styles.eyebrow}>
            {exercise.category} · {exercise.difficulty}
          </span>
          <h1>{exercise.name}</h1>
          <p className={styles.detailDescription}>{exercise.description}</p>
          <div className={styles.detailMeta}>
            <span>
              Target <strong>{exercise.muscle}</strong>
            </span>
            <span>
              Equipment <strong>{exercise.equipment}</strong>
            </span>
            <span>
              Duration <strong>{exercise.duration}</strong>
            </span>
          </div>
          <h2>How to perform it</h2>
          <ol className={styles.instructions}>
            {exercise.instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
          <label className={styles.addExercise}>
            Add to{" "}
            <select
              defaultValue="Monday"
              onChange={(event) => addToPlanner(event.target.value, exercise)}
            >
              {WEEKDAYS.map((day) => (
                <option key={day}>{day}</option>
              ))}
            </select>
          </label>
        </section>
        <section className={styles.videoPanel}>
          <div className={styles.videoWrap}>
            <iframe
              src={exercise.videoUrl}
              title={`${exercise.name} demonstration`}
              allowFullScreen
            />
          </div>
          <div className={styles.audioCard}>
            <span className={styles.eyebrow}>Training soundtrack</span>
            <h3>Stay in the zone</h3>
            <audio
              controls
              src="https://cdn.pixabay.com/audio/2022/03/15/audio_7d3b6d3d5f.mp3"
            >
              Your browser does not support audio.
            </audio>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ExerciseDetail;
