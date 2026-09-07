import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

test("renders badge content and tone class", () => {
  render(<Badge tone="accent">Strength</Badge>);

  expect(screen.getByText("Strength")).toHaveClass("accent");
});
