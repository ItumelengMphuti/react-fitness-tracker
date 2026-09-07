import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading", () => {
  test("renders the default loading message", () => {
    render(<Loading />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Loading your training space",
    );
  });

  test("renders a custom loading message", () => {
    render(<Loading message="Loading exercises" />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading exercises");
  });

  test("marks the loading indicator as decorative", () => {
    render(<Loading />);

    expect(screen.getByRole("status").querySelector("span")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
