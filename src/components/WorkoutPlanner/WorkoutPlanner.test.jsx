import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { FitnessProvider } from "../../context/FitnessContext";
import WorkoutPlannerPage from "./WorkoutPlanner";

const renderPlanner = () =>
  render(
    <MemoryRouter>
      <FitnessProvider>
        <WorkoutPlannerPage />
      </FitnessProvider>
    </MemoryRouter>,
  );

test("adds and removes an exercise from the selected day", async () => {
  const user = userEvent.setup();
  renderPlanner();

  expect(
    screen.getByText("Select a movement above to start this day."),
  ).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Add exercise" }));

  expect(screen.getByRole("link", { name: "Barbell Squat" })).toHaveAttribute(
    "href",
    "/exercises/barbell-squat",
  );
  expect(screen.getByText("1 exercises planned")).toBeInTheDocument();

  await user.click(
    screen.getByRole("button", { name: "Remove Barbell Squat" }),
  );

  expect(screen.getByText("Rest or add a session")).toBeInTheDocument();
});
