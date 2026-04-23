import { describe, it, expect } from "vitest";
import { cn } from "../cn.js";

describe("cn", () => {
  it("joins string classes", () => {
    expect(cn("a", "b")).toBe("a b");
  });
  it("merges tailwind conflicts (last wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
  it("handles conditional objects", () => {
    expect(cn("a", { b: true, c: false })).toBe("a b");
  });
});
