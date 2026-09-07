import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    screen.getByRole("button", { name: "See how it works" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "How a workout gets logged" }),
  ).toBeInTheDocument();
});

test("opens the how-it-works dialog", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );

  await user.click(screen.getByRole("button", { name: "See how it works" }));

  expect(
    screen.getByRole("dialog", { name: "How it works" }),
  ).toBeInTheDocument();
});
