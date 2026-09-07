import { useState } from "react";
import Button from "../components/UI/Button.jsx";
import Card from "../components/UI/Card.jsx";
import AudioPlayer from "../components/Media/AudioPlayer.jsx";
import VideoPlayer from "../components/Media/VideoPlayer.jsx";
import Modal from "../components/UI/Modal.jsx";
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
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <>
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
              <Button variant="ghost" onClick={() => setShowHowItWorks(true)}>
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

      <section className={styles.section}>
        <div className="container">
          <div className={styles.featureGrid}>
            <VideoPlayer
              title="Movement primer"
              description="A short movement demonstration before you train."
              videoUrl="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            />
            <AudioPlayer
              title="Training soundtrack"
              description="Press play when you are ready to start your session."
              audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            />
          </div>
        </div>
      </section>

      <section className={styles.section} id="exercises">
        <div className="container">
          <h2 className={styles.sectionTitle}>
            Everything the log needs to hold
          </h2>
          <div className={styles.featureGrid}>
            {FEATURES.map((feature, index) => (
              <Card
                key={feature.title}
                eyebrow={feature.eyebrow}
                title={feature.title}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {feature.body}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="how-it-works">
        <div className="container">
          <h2 className={styles.sectionTitle}>How a workout gets logged</h2>
          <div className={styles.steps}>
            {STEPS.map((step, index) => (
              <div
                key={step.number}
                className={styles.step}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta} id="start">
        <div className={`container ${styles.ctaInner}`}>
          <h2 className={styles.ctaTitle}>Your next set is worth tracking.</h2>
          <Button href="/exercises" variant="primary">
            Start tracking
          </Button>
        </div>
      </section>

      <Modal
        open={showHowItWorks}
        title="How it works"
        onClose={() => setShowHowItWorks(false)}
      >
        Choose an exercise, add it to your weekly plan, then record your sets,
        reps, and weight in History. Progress turns those entries into a volume
        trend.
      </Modal>
    </>
  );
}

export default Home;
