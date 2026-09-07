import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

test("reports search changes and clears the current value", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  render(<SearchBar value="push" onChange={onChange} />);

  await user.click(screen.getByRole("button", { name: "Clear" }));

  expect(onChange).toHaveBeenCalledWith({ target: { value: "" } });
});
