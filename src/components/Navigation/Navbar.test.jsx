import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./Navbar";

describe("NavBar", () => {
  const renderNavBar = () =>
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

  test("renders the home logo link and route links", () => {
    renderNavBar();

    expect(screen.getByRole("link", { name: "Logo" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Exercises" })).toHaveAttribute(
      "href",
      "/exercises",
    );
    expect(screen.getByRole("link", { name: "Planner" })).toHaveAttribute(
      "href",
      "/planner",
    );
    expect(screen.getByRole("link", { name: "History" })).toHaveAttribute(
      "href",
      "/history",
    );
    expect(screen.getByRole("link", { name: "Progress" })).toHaveAttribute(
      "href",
      "/progress",
    );
  });

  test("opens and closes the mobile menu", async () => {
    const user = userEvent.setup();
    renderNavBar();

    const menuButton = screen.getByRole("button", { name: "Open menu" });
    const navigation = screen.getByRole("navigation");

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(navigation.className).not.toContain("navOpen");

    await user.click(menuButton);

    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await waitFor(() => expect(navigation.className).toContain("navOpen"));

    await user.click(screen.getByRole("button", { name: "Close menu" }));

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    await waitFor(() => expect(navigation.className).not.toContain("navOpen"));
  });

  test("closes the menu after choosing a route", async () => {
    const user = userEvent.setup();
    renderNavBar();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("link", { name: "Exercises" }));

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
