import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { FitnessProvider } from "../../context/FitnessContext";
import ExercisePage from "./ExercisePage";

const renderExercises = () =>
  render(
    <MemoryRouter>
      <FitnessProvider>
        <ExercisePage />
      </FitnessProvider>
    </MemoryRouter>,
  );

test("filters exercises by search text", async () => {
  const user = userEvent.setup();
  renderExercises();

  await user.type(
    screen.getByPlaceholderText("Search exercises..."),
    "push-up",
  );

  expect(screen.getByRole("heading", { name: "Push-up" })).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Barbell Squat" }),
  ).not.toBeInTheDocument();
});

test("shows an empty state when no exercise matches", async () => {
  const user = userEvent.setup();
  renderExercises();

  await user.type(
    screen.getByPlaceholderText("Search exercises..."),
    "not-a-real-exercise",
  );

  expect(
    screen.getByRole("heading", { name: "No exercises found" }),
  ).toBeInTheDocument();
});

test("supports category, difficulty, sorting, and planner actions", async () => {
  const user = userEvent.setup();
  renderExercises();

  await user.selectOptions(
    screen.getByRole("combobox", { name: "Filter by category" }),
    "Cardio",
  );
  await user.selectOptions(
    screen.getByRole("combobox", { name: "Filter by difficulty" }),
    "Advanced",
  );
  await user.selectOptions(
    screen.getByRole("combobox", { name: "Sort exercises" }),
    "difficulty",
  );

  expect(screen.getByRole("heading", { name: "Burpees" })).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Push-up" }),
  ).not.toBeInTheDocument();

  await user.click(screen.getAllByRole("button", { name: "+ Monday" })[0]);
});
