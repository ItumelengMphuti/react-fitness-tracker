import { render, screen } from "@testing-library/react";
import VideoPlayer from "./VideoPlayer";

test("renders a native video player with fallback content", () => {
  const { container } = render(
    <VideoPlayer
      title="Movement primer"
      description="Prepare to train"
      videoUrl="/assets/videos/primer.mp4"
    />,
  );

  expect(
    screen.getByRole("heading", { name: "Movement primer" }),
  ).toBeInTheDocument();
  expect(container.querySelector("video")).toHaveAttribute("controls");
  expect(
    screen.getByText("Your browser does not support the video tag."),
  ).toBeInTheDocument();
});

test("supports an omitted description", () => {
  render(<VideoPlayer title="Primer" videoUrl="/assets/videos/primer.mp4" />);

  expect(screen.queryByText("Prepare to train")).not.toBeInTheDocument();
});
