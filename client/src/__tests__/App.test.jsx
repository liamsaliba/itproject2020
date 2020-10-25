import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { MemoryRouter as Router } from "react-router-dom";
import { configureStore } from "../store";
import { Provider } from "react-redux";

describe("App", () => {
  it("should evaluate 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });
});

test("renders camel case", () => {
  const store = configureStore();

  const { getAllByText } = render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );
  const cc = getAllByText(/Camel Pages/i)[0];
  expect(cc).toBeInTheDocument();
});
