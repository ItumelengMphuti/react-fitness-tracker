import Button from "../components/UI/Button.jsx";
import Card from "../components/UI/Card.jsx";
import styles from "./Home.module.css";

const FEATURES = [
  {
    eyebrow: "Library",
    title: "Exercise database",
    body: "Look up correct form, target muscles, and equipment for every lift before you load the bar.",
  },
  {
    eyebrow: "Planner",
    title: "Weekly split builder",
    body: "Lay out push, pull, and leg days in advance, then follow the plan straight from your phone.",
  },
  {
    eyebrow: "Log",
    title: "Set-by-set tracking",
    body: "Enter weight, reps, and RPE as you train. Every entry is timestamped and searchable later.",
  },
  {
    eyebrow: "Progress",
    title: "Strength charts",
    body: "Watch your working weight and volume climb, lift by lift, with charts pulled straight from your log.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Log your session",
    body: "Enter each set as you finish it — exercise, weight, reps. Takes seconds between sets.",
  },
  {
    number: "02",
    title: "Close out the workout",
    body: "Fitflow timestamps the session and files it under that day, that lift, that plan.",
  },
  {
    number: "03",
    title: "Watch the trend",
    body: "Every past entry feeds your progress charts, so gains show up automatically.",
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Digital training log</span>
            <h1 className={styles.headline}>
              Track every set.
              <br />
              See every gain.
            </h1>
            <p className={styles.subcopy}>
              Fitflow replaces the notebook on the gym floor. Log weight and
              reps as you lift, plan your split for the week, and watch your
              numbers move over months, not just one workout.
            </p>
            <div className={styles.heroActions}>
              <Button href="/exercises" variant="primary">
                Start tracking
              </Button>
              <Button href="#how-it-works" variant="ghost">
                See how it works
              </Button>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <img
              className={styles.heroImage}
              src="/assets/images/fitness.jpeg"
              alt="Fitflow fitness tracker"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.section} id="exercises">
        <div className="container">
          <h2 className={styles.sectionTitle}>
            Everything the log needs to hold
          </h2>
          <div className={styles.featureGrid}>
            {FEATURES.map((feature) => (
              <Card
                key={feature.title}
                eyebrow={feature.eyebrow}
                title={feature.title}
              >
                {feature.body}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.section} id="how-it-works">
        <div className="container">
          <h2 className={styles.sectionTitle}>How a workout gets logged</h2>
          <div className={styles.steps}>
            {STEPS.map((step) => (
              <div key={step.number} className={styles.step}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta} id="start">
        <div className={`container ${styles.ctaInner}`}>
          <h2 className={styles.ctaTitle}>Your next set is worth tracking.</h2>
          <Button href="/exercises" variant="primary">
            Start tracking
          </Button>
        </div>
      </section>
    </>
  );
}

export default Home;
