import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { MemoryRouter as Router } from "react-router-dom";

describe("App", () => {
  it("should evaluate 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });
});

test("renders camel case", () => {
  const { getByText } = render(
    <Router>
      <App />
    </Router>
  );
  const year = getByText(/2020/i);
  expect(year).toBeInTheDocument();
});
