import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  test("renders the title", () => {
    render(<Card title="Exercise database">Find your next exercise.</Card>);

    expect(
      screen.getByRole("heading", {
        name: "Exercise database",
      }),
    ).toBeInTheDocument();
  });

  test("renders the eyebrow when provided", () => {
    render(
      <Card eyebrow="Library" title="Exercise database">
        Content
      </Card>,
    );

    expect(screen.getByText("Library")).toBeInTheDocument();
  });

  test("renders children", () => {
    render(<Card title="Test">Card content goes here.</Card>);

    expect(screen.getByText("Card content goes here.")).toBeInTheDocument();
  });

  test("does not render eyebrow when it is not provided", () => {
    render(<Card title="Test">Content</Card>);

    expect(screen.queryByText("Library")).not.toBeInTheDocument();
  });

  test("accepts a custom className", () => {
    const { container } = render(<Card className="custom-card">Content</Card>);

    expect(container.firstChild).toHaveClass("custom-card");
  });
});
