import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

test("renders children and closes from the close button", async () => {
  const user = userEvent.setup();
  const onClose = jest.fn();

  render(
    <Modal open title="How it works" onClose={onClose}>
      Log a workout, then review the trend.
    </Modal>,
  );

  expect(screen.getByRole("dialog")).toHaveTextContent("Log a workout");
  await user.click(screen.getByRole("button", { name: "Close dialog" }));

  expect(onClose).toHaveBeenCalledTimes(1);
});

test("renders nothing when closed", () => {
  render(
    <Modal open={false} title="Hidden" onClose={jest.fn()}>
      Hidden content
    </Modal>,
  );

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
