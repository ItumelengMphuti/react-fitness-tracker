import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";

describe("Fitness Tracker Integration Tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderApp = () =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

  const getNavigation = () => within(screen.getByRole("navigation"));

  test("user can navigate from Home to Exercises page asynchronously", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(
      screen.getByRole("heading", { name: /track every set/i }),
    ).toBeInTheDocument();

    await user.click(getNavigation().getByRole("link", { name: "Exercises" }));

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /find your next movement/i }),
      ).toBeInTheDocument(),
    );
  });

  test("user can search asynchronously and see filtered results", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(getNavigation().getByRole("link", { name: "Exercises" }));

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /find your next movement/i }),
      ).toBeInTheDocument(),
    );

    const searchInput = screen.getByPlaceholderText(/search exercises/i);

    await user.type(searchInput, "push");

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: "Push-up" }),
      ).toBeInTheDocument(),
    );

    expect(
      screen.queryByRole("heading", { name: "Barbell Squat" }),
    ).not.toBeInTheDocument();
  });

  test("user can add an exercise to the workout planner asynchronously", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(getNavigation().getByRole("link", { name: "Exercises" }));

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: "Push-up" }),
      ).toBeInTheDocument(),
    );
    const pushUpCard = screen
      .getByRole("heading", { name: "Push-up" })
      .closest("article");
    await user.click(
      within(pushUpCard).getByRole("button", { name: "+ Monday" }),
    );
    await user.click(getNavigation().getByRole("link", { name: "Planner" }));

    await waitFor(() =>
      expect(screen.getByText("1 exercises planned")).toBeInTheDocument(),
    );
    expect(screen.getByRole("link", { name: "Push-up" })).toHaveAttribute(
      "href",
      "/exercises/push-up",
    );
  });

  test("workout plan persists asynchronously when navigating between pages", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(getNavigation().getByRole("link", { name: "Exercises" }));
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: "Push-up" }),
      ).toBeInTheDocument(),
    );
    const pushUpCard = screen
      .getByRole("heading", { name: "Push-up" })
      .closest("article");
    await user.click(
      within(pushUpCard).getByRole("button", { name: "+ Monday" }),
    );
    await user.click(screen.getByRole("link", { name: "Logo" }));
    await user.click(getNavigation().getByRole("link", { name: "Planner" }));

    await waitFor(() =>
      expect(screen.getByText("1 exercises planned")).toBeInTheDocument(),
    );
    expect(screen.getByRole("link", { name: "Push-up" })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("fitflow_fitness_data"))).toEqual(
      expect.objectContaining({
        planner: expect.objectContaining({
          Monday: [expect.objectContaining({ id: "push-up" })],
        }),
      }),
    );
  });
});
