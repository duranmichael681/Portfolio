import { describe, it, expect } from "vitest";
import { validateContactForm } from "../ContactForm.jsx";

describe("validateContactForm", () => {
  it("flags empty fields", () => {
    const e = validateContactForm({ name: "", email: "", message: "" });
    expect(e.name).toBeDefined();
    expect(e.email).toBeDefined();
    expect(e.message).toBeDefined();
  });
  it("flags invalid email", () => {
    const e = validateContactForm({ name: "A", email: "not-an-email", message: "hello there friend" });
    expect(e.email).toBeDefined();
  });
  it("flags short message", () => {
    const e = validateContactForm({ name: "A", email: "a@b.co", message: "hi" });
    expect(e.message).toBeDefined();
  });
  it("passes valid input", () => {
    const e = validateContactForm({ name: "A", email: "a@b.co", message: "hello there friend" });
    expect(e).toEqual({});
  });
});
