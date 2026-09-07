import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { FitnessProvider } from "../context/FitnessContext";
import HistoryPage from "./HistoryPage";

const renderHistory = () =>
  render(
    <MemoryRouter>
      <FitnessProvider>
        <HistoryPage />
      </FitnessProvider>
    </MemoryRouter>,
  );

test("logs a workout and displays it in recent sessions", async () => {
  const user = userEvent.setup();
  renderHistory();

  expect(
    screen.getByText("Your logged workouts will appear here."),
  ).toBeInTheDocument();

  await user.clear(screen.getByLabelText("Sets"));
  await user.type(screen.getByLabelText("Sets"), "4");
  await user.clear(screen.getByLabelText("Reps"));
  await user.type(screen.getByLabelText("Reps"), "8");
  await user.clear(screen.getByLabelText("Weight (kg)"));
  await user.type(screen.getByLabelText("Weight (kg)"), "30");
  await user.click(screen.getByRole("button", { name: "Save workout" }));

  expect(
    screen.getByRole("heading", { name: "Barbell Squat" }),
  ).toBeInTheDocument();
  expect(screen.getByText("4 × 8")).toBeInTheDocument();
  expect(screen.getByText("30 kg")).toBeInTheDocument();
  expect(screen.getByText("1 logged")).toBeInTheDocument();
});
