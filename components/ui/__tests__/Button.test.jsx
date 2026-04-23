import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../Button.jsx";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });
  it("renders as anchor when as=a", () => {
    render(<Button as="a" href="#x">Link</Button>);
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toHaveAttribute("href", "#x");
  });
  it("applies disabled semantics", () => {
    render(<Button disabled>Nope</Button>);
    expect(screen.getByRole("button", { name: "Nope" })).toBeDisabled();
  });
});
