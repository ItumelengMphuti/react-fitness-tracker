jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(() => ({ render: jest.fn() })),
}));

jest.mock("./App.jsx", () => ({
  __esModule: true,
  default: () => null,
}));

import { createRoot } from "react-dom/client";

test("mounts the app into the root element", async () => {
  document.body.innerHTML = '<div id="root"></div>';

  await jest.isolateModulesAsync(async () => {
    await import("./main.jsx");
  });

  expect(createRoot).toHaveBeenCalledWith(document.getElementById("root"));
});
