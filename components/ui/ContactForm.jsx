"use client";
import { useState } from "react";
import { Button } from "./Button";
import { cn } from "@/lib/cn";

const EMAIL = "duranmichael681@gmail.com";

function validate(values) {
  const errs = {};
  if (!values.subject.trim()) errs.subject = "Subject is required.";
  if (!values.message.trim() || values.message.trim().length < 10) {
    errs.message = "Message must be at least 10 characters.";
  }
  return errs;
}

function buildMailto({ name, subject, message }) {
  const trimmedName = name.trim();
  const body =
    message.trim() +
    (trimmedName ? `\n\n— ${trimmedName}` : "");
  const params = new URLSearchParams({
    subject: subject.trim(),
    body,
  });
  return `mailto:${EMAIL}?${params.toString()}`;
}

export function ContactForm() {
  const [values, setValues] = useState({ name: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    window.location.href = buildMailto(values);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="glass rounded-card p-8 text-center">
        <h3 className="font-display text-h2 mb-3">Mail client opened.</h3>
        <p className="text-body text-ink-dim mb-4">
          Send the message from there and I&apos;ll get back to you within a day or two.
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-small text-violet hover:underline"
        >
          Write another →
        </button>
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
        <label htmlFor="name" className="block text-micro font-mono uppercase text-ink-faint mb-2">
          Your name <span className="text-ink-faint normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="name" name="name" type="text" autoComplete="name"
          value={values.name} onChange={update("name")}
          className={fieldClass(false)}
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-micro font-mono uppercase text-ink-faint mb-2">
          Subject
        </label>
        <input
          id="subject" name="subject" type="text"
          placeholder="e.g. Internship at Acme Co."
          value={values.subject} onChange={update("subject")}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-err" : undefined}
          className={fieldClass(errors.subject)}
        />
        {errors.subject && <p id="subject-err" className="text-small text-violet mt-1">{errors.subject}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-micro font-mono uppercase text-ink-faint mb-2">
          Message
        </label>
        <textarea
          id="message" name="message" rows={5}
          placeholder="Tell me what you&apos;re building…"
          value={values.message} onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-err" : "message-hint"}
          className={fieldClass(errors.message)}
        />
        {errors.message ? (
          <p id="message-err" className="text-small text-violet mt-1">{errors.message}</p>
        ) : (
          <p id="message-hint" className="text-small text-ink-faint mt-2">
            This opens your mail app with the message pre-filled — nothing gets sent until you hit send there.
          </p>
        )}
      </div>
      <div className="pt-2">
        <Button type="submit">Open in mail app →</Button>
      </div>
    </form>
  );
}

export { validate as validateContactForm };
