import { render, screen } from "@testing-library/react";
import AudioPlayer from "./AudioPlayer";

test("renders an accessible audio player with fallback content", () => {
  const { container } = render(
    <AudioPlayer
      title="Training soundtrack"
      description="Press play"
      audioUrl="/assets/audio/training.mp3"
    />,
  );

  expect(
    screen.getByRole("heading", { name: "Training soundtrack" }),
  ).toBeInTheDocument();
  expect(container.querySelector("audio")).toHaveAttribute("controls");
  expect(
    screen.getByText("Your browser does not support the audio element."),
  ).toBeInTheDocument();
});

test("supports an omitted description", () => {
  render(
    <AudioPlayer title="Soundtrack" audioUrl="/assets/audio/training.mp3" />,
  );

  expect(screen.queryByText("Press play")).not.toBeInTheDocument();
});
