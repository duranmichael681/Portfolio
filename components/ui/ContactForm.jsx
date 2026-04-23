"use client";
import { useState } from "react";
import { Button } from "./Button";
import { cn } from "@/lib/cn";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

function validate(values) {
  const errs = {};
  if (!values.name.trim()) errs.name = "Name is required.";
  if (!values.email.trim()) errs.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = "Enter a valid email.";
  if (!values.message.trim() || values.message.trim().length < 10) {
    errs.message = "Message must be at least 10 characters.";
  }
  return errs;
}

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const update = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(SERVICE_ID, TEMPLATE_ID,
        { from_name: values.name, reply_to: values.email, message: values.message },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="glass rounded-card p-8 text-center">
        <h3 className="font-display text-h2 mb-3">Thanks — message received.</h3>
        <p className="text-body text-ink-dim">I&apos;ll get back to you within a day or two.</p>
      </div>
    );
  }

  const fieldClass = (hasErr) =>
    cn(
      "w-full rounded-[12px] glass px-4 py-3 text-body text-ink placeholder:text-ink-faint",
      "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet",
      hasErr && "border-[color:var(--acc-pink)]"
    );

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-card p-6 md:p-8 space-y-4">
      <div>
        <label htmlFor="name" className="block text-micro font-mono uppercase text-ink-faint mb-2">Name</label>
        <input
          id="name" name="name" type="text" autoComplete="name"
          value={values.name} onChange={update("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-err" : undefined}
          className={fieldClass(errors.name)}
        />
        {errors.name && <p id="name-err" className="text-small text-violet mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-micro font-mono uppercase text-ink-faint mb-2">Email</label>
        <input
          id="email" name="email" type="email" autoComplete="email"
          value={values.email} onChange={update("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-err" : undefined}
          className={fieldClass(errors.email)}
        />
        {errors.email && <p id="email-err" className="text-small text-violet mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-micro font-mono uppercase text-ink-faint mb-2">Message</label>
        <textarea
          id="message" name="message" rows={5}
          value={values.message} onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-err" : undefined}
          className={fieldClass(errors.message)}
        />
        {errors.message && <p id="message-err" className="text-small text-violet mt-1">{errors.message}</p>}
      </div>
      <div className="flex items-center justify-between pt-2">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send →"}
        </Button>
        {status === "error" && (
          <p className="text-small text-violet">Couldn&apos;t send. Please try again.</p>
        )}
      </div>
    </form>
  );
}

export { validate as validateContactForm };
