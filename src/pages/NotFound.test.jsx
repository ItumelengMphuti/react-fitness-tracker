import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

test("renders the not found message", () => {
  render(<NotFound />);

  expect(
    screen.getByRole("heading", { name: "404 - Page Not Found" }),
  ).toBeInTheDocument();
  expect(
    screen.getByText("Sorry, the page you're looking for doesn't exist."),
  ).toBeInTheDocument();
});
