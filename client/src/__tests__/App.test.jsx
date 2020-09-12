import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { MemoryRouter as Router } from "react-router-dom";

describe("App", () => {
  it("should evaluate 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });
});

test("renders learn react link", () => {
  const { getByText } = render(
    <Router>
      <App />
    </Router>
  );
  const linkElement = getByText(/Camel Pages/i);
  expect(linkElement).toBeInTheDocument();
});
