import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { EXERCISES } from "../../data/exercisesData";
import { useFitness } from "../../context/FitnessContext";
import Badge from "../UI/Badge";
import SearchBar from "../UI/SearchBar";
import styles from "./shared-pages.module.css";

function ExercisesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [sort, setSort] = useState("name");
  const { addToPlanner } = useFitness();
  useEffect(() => {
    document.title = query
      ? `Search: ${query} | FitFlow`
      : "Exercises | FitFlow";
  }, [query]);
  const categories = [
    "All",
    ...new Set(EXERCISES.map((exercise) => exercise.category)),
  ];
  const filtered = useMemo(
    () =>
      EXERCISES.filter(
        (exercise) => category === "All" || exercise.category === category,
      )
        .filter(
          (exercise) =>
            difficulty === "All" || exercise.difficulty === difficulty,
        )
        .filter((exercise) =>
          `${exercise.name} ${exercise.muscleGroups.join(" ")} ${exercise.equipment}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "difficulty"
            ? a.difficulty.localeCompare(b.difficulty)
            : a.name.localeCompare(b.name),
        ),
    [category, difficulty, query, sort],
  );

  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <div>
          <span className={styles.eyebrow}>Training library</span>
          <h1>Find your next movement</h1>
          <p>
            Search by muscle, equipment, or goal. Open any exercise for form
            cues and a demonstration.
          </p>
        </div>
        <div className={styles.headerStat}>
          <strong>{EXERCISES.length}</strong>
          <span>movements ready</span>
        </div>
      </div>
      <div className={styles.toolbar}>
        <SearchBar
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value)}
          aria-label="Filter by difficulty"
        >
          <option>All</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          aria-label="Sort exercises"
        >
          <option value="name">Sort: A-Z</option>
          <option value="difficulty">Sort: difficulty</option>
        </select>
      </div>
      <div className={styles.exerciseGrid}>
        {filtered.map((exercise, index) => (
          <article
            className={styles.exerciseCard}
            key={exercise.id}
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
              <Link
                className={styles.textLink}
                to={`/exercises/${exercise.id}`}
              >
                View form →
              </Link>
              <button
                className={styles.smallButton}
                onClick={() => addToPlanner("Monday", exercise)}
              >
                + Monday
              </button>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className={styles.empty}>
          <h2>No exercises found</h2>
          <p>Try a different search or filter.</p>
        </div>
      )}
    </div>
  );
}

export default ExercisesPage;
