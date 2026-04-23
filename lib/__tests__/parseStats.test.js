import { describe, it, expect } from "vitest";
import { parseStatMarkdown } from "../parseStats.js";

describe("parseStatMarkdown", () => {
  it("returns a single text part when no bold markers", () => {
    expect(parseStatMarkdown("plain text")).toEqual([{ type: "text", value: "plain text" }]);
  });
  it("extracts one stat in the middle", () => {
    expect(parseStatMarkdown("grew by **25%** last year")).toEqual([
      { type: "text", value: "grew by " },
      { type: "stat", value: "25%" },
      { type: "text", value: " last year" },
    ]);
  });
  it("extracts multiple stats", () => {
    expect(parseStatMarkdown("**A** then **B**")).toEqual([
      { type: "stat", value: "A" },
      { type: "text", value: " then " },
      { type: "stat", value: "B" },
    ]);
  });
  it("handles stat at end", () => {
    expect(parseStatMarkdown("ended on **20%**")).toEqual([
      { type: "text", value: "ended on " },
      { type: "stat", value: "20%" },
    ]);
  });
});
