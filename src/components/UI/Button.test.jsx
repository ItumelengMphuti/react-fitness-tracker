import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button.jsx";

describe("Button", () => {
  test("renders button text", () => {
    render(<Button>Click me</Button>);

    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  test("uses the primary variant by default", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button");

    expect(button.className).toContain("primary");
  });

  test("supports different variants", () => {
    render(<Button variant="ghost">Learn more</Button>);

    expect(screen.getByRole("button")).toHaveClass("ghost");
  });

  test("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole("button", { name: "Click me" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders an anchor when href is provided", () => {
    render(<Button href="/exercises">Start tracking</Button>);

    const link = screen.getByRole("link", {
      name: "Start tracking",
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/exercises");
  });
});
