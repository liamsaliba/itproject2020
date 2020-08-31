import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should evaluate 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });
});
