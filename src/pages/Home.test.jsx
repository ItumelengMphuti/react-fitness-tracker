import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

test("renders the home content and tracking links", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("heading", { name: /Track every set/i }),
  ).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: "Start tracking" })).toHaveLength(
    2,
  );
  expect(
    screen.getByRole("link", { name: "See how it works" }),
  ).toHaveAttribute("href", "#how-it-works");
  expect(
    screen.getByRole("heading", { name: "How a workout gets logged" }),
  ).toBeInTheDocument();
});
