import { describe, it, expect } from "vitest";
import { buildScrambleQueue, renderScrambleFrame } from "../scramble.js";

describe("scramble", () => {
  it("builds a queue with one entry per character", () => {
    const q = buildScrambleQueue("abc");
    expect(q).toHaveLength(3);
    expect(q.map((x) => x.to)).toEqual(["a", "b", "c"]);
  });
  it("end times are monotonically increasing", () => {
    const q = buildScrambleQueue("abcd");
    for (let i = 1; i < q.length; i += 1) {
      expect(q[i].end).toBeGreaterThan(q[i - 1].end);
    }
  });
  it("renderScrambleFrame returns full target once past last end", () => {
    const q = buildScrambleQueue("hi");
    const { text, done, total } = renderScrambleFrame(q, 9999);
    expect(text).toBe("hi");
    expect(done).toBe(total);
  });
  it("renderScrambleFrame reports partial progress mid-animation", () => {
    const q = buildScrambleQueue("abcd", { startStep: 2 });
    const { done, total } = renderScrambleFrame(q, 21);
    expect(total).toBe(4);
    expect(done).toBeGreaterThanOrEqual(1);
    expect(done).toBeLessThan(total);
  });
});
