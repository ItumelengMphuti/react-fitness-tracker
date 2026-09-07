import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

test("renders the navigation through the shared header", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );

  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Logo" })).toHaveAttribute(
    "href",
    "/",
  );
});
