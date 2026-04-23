import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatBullet } from "../StatBullet.jsx";

describe("StatBullet", () => {
  it("renders plain text when no stats", () => {
    render(<ul><StatBullet text="hello world" /></ul>);
    expect(screen.getByRole("listitem")).toHaveTextContent("hello world");
  });
  it("wraps **stat** segments in <strong>", () => {
    render(<ul><StatBullet text="grew **25%** this year" /></ul>);
    const strong = screen.getByText("25%");
    expect(strong.tagName).toBe("STRONG");
  });
});
