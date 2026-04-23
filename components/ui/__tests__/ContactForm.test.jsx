import { describe, it, expect } from "vitest";
import { validateContactForm } from "../ContactForm.jsx";

describe("validateContactForm", () => {
  it("flags missing subject and short message", () => {
    const e = validateContactForm({ name: "", subject: "", message: "" });
    expect(e.subject).toBeDefined();
    expect(e.message).toBeDefined();
  });
  it("allows empty name (optional)", () => {
    const e = validateContactForm({ name: "", subject: "hi", message: "hello there friend" });
    expect(e.name).toBeUndefined();
  });
  it("flags short message", () => {
    const e = validateContactForm({ name: "A", subject: "hi", message: "hi" });
    expect(e.message).toBeDefined();
  });
  it("passes valid input", () => {
    const e = validateContactForm({ name: "A", subject: "Hello", message: "hello there friend" });
    expect(e).toEqual({});
  });
});
