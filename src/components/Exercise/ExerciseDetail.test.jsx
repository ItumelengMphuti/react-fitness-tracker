import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { FitnessProvider } from "../../context/FitnessContext";
import ExerciseDetail from "./ExerciseDetail";

const renderDetail = (exerciseId) =>
  render(
    <MemoryRouter initialEntries={[`/exercises/${exerciseId}`]}>
      <FitnessProvider>
        <Routes>
          <Route path="/exercises/:exerciseId" element={<ExerciseDetail />} />
        </Routes>
      </FitnessProvider>
    </MemoryRouter>,
  );

test("renders exercise instructions and demonstration", () => {
  renderDetail("push-up");

  expect(screen.getByRole("heading", { name: "Push-up" })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "How to perform it" }),
  ).toBeInTheDocument();
  expect(screen.getByTitle("Push-up demonstration")).toHaveAttribute(
    "src",
    "https://www.youtube.com/embed/IODxDh0iT4c",
  );
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("renders a recovery link for an unknown exercise", () => {
  renderDetail("unknown");

  expect(
    screen.getByRole("heading", { name: "Exercise not found" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Back to library" })).toHaveAttribute(
    "href",
    "/exercises",
  );
});

test("allows choosing a planner day", async () => {
  const user = userEvent.setup();
  renderDetail("push-up");

  const daySelect = screen.getByRole("combobox");
  await user.selectOptions(daySelect, "Friday");

  await waitFor(() => expect(daySelect).toHaveValue("Friday"));
});
