import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

describe("Footer", () => {
  const renderFooter = () =>
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

  test("renders the logo and product note", () => {
    renderFooter();

    expect(screen.getByRole("img", { name: "Setbook" })).toHaveAttribute(
      "src",
      "/assets/images/logo2.png",
    );
    expect(
      screen.getByText("FitFlow - Track your workout"),
    ).toBeInTheDocument();
  });

  test.each([
    ["Exercises", "/exercises"],
    ["Planner", "/planner"],
    ["History", "/history"],
    ["Progress", "/progress"],
  ])("links %s to %s", (label, route) => {
    renderFooter();

    expect(screen.getByRole("link", { name: label })).toHaveAttribute(
      "href",
      route,
    );
  });
});
