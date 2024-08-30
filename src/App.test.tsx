import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Button", () => {
  render(<App />);
  const linkElement = screen.getByText(/Button/i);
  expect(linkElement).toBeInTheDocument();
});
