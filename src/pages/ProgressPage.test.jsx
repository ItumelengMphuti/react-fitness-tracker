import { render, screen } from "@testing-library/react";
import { FitnessProvider } from "../context/FitnessContext";
import ProgressPage from "./ProgressPage";

const history = [
  {
    id: 1,
    exercise: "Barbell Squat",
    sets: 3,
    reps: 10,
    weight: 50,
    date: "2026-09-07T10:00:00.000Z",
  },
  {
    id: 2,
    exercise: "Push-up",
    sets: 4,
    reps: 12,
    weight: 20,
    date: "2026-09-06T10:00:00.000Z",
  },
];

test("calculates progress metrics from workout history", () => {
  localStorage.setItem(
    "fitflow_fitness_data",
    JSON.stringify({ planner: {}, history }),
  );

  render(
    <FitnessProvider>
      <ProgressPage />
    </FitnessProvider>,
  );

  expect(screen.getAllByText("2", { selector: "strong" })).toHaveLength(2);
  expect(screen.getByText("2,460", { selector: "strong" })).toBeInTheDocument();
  expect(screen.getByText("50", { selector: "strong" })).toBeInTheDocument();
  expect(screen.getByText("movements trained")).toBeInTheDocument();
});
