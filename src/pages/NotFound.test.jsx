import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";

test("renders the not found message", () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("heading", { name: "404 - Page Not Found" }),
  ).toBeInTheDocument();
  expect(
    screen.getByText("Sorry, the page you're looking for doesn't exist."),
  ).toBeInTheDocument();
});

test("offers a button back to the home route", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );

  await user.click(screen.getByRole("button", { name: "Go home" }));

  expect(
    screen.getByRole("heading", { name: "404 - Page Not Found" }),
  ).toBeInTheDocument();
});
