"use client";

// The Campaign Lab enquiry dialog. The concept opened a mailto: link; this
// posts to Contact Form 7 instead (src/lib/cf7-client.js), so the enquiry
// reaches the same WordPress inbox as the contact page's.
//
// What gets sent is per page: the lab's own questions with the visitor's
// answers, the plan title they ended on, which page it came from, and their
// own note. The CF7 form is the page's "Lead form ID" field, or the site's
// shared enquiry form when that's blank.
import { useEffect, useRef, useState } from "react";
import useFocusTrap from "@/hooks/useFocusTrap";
import { SITE_ENQUIRY_FORM_ID, submitCf7 } from "@/lib/cf7-client";

const EMPTY = { name: "", email: "", company: "", phone: "", message: "", consent: false };

export default function LeadModal({ lead, brief, planTitle, pageTitle, serviceTitle, returnFocusRef, onClose }) {
  const panelRef = useRef(null);
  const nameRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // {type:'ok'|'err', text}
  const [sending, setSending] = useState(false);

  // Kept in a ref so the mount-only effect below always calls the latest.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useFocusTrap(panelRef, true, { returnFocusRef });

  // After the trap (which focuses the close button), move focus to the
  // first field, as the concept did. Also locks page scroll while open and
  // closes on Escape.
  useEffect(() => {
    nameRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") onCloseRef.current();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function setField(key, value) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: null }));
  }

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = "Please tell us your name.";
    if (!values.email.trim()) next.email = "Please add an email so we can reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "That email address doesn't look right.";
    if (!values.company.trim()) next.company = "Please add your company or website.";
    if (lead.consent && !values.consent) next.consent = "Please tick the box so we can contact you.";
    return next;
  }

  function composeMessage() {
    const lines = [`${pageTitle} enquiry${planTitle ? `: ${planTitle}` : ""}`, ""];
    for (const b of brief) if (b.answer) lines.push(`${b.question}: ${b.answer}`);
    lines.push("", `Notes: ${values.message.trim() || "None"}`);
    if (lead.consent) lines.push("", "Consent to be contacted: yes");
    return lines.join("\n");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);

    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    setSending(true);
    try {
      const data = await submitCf7(lead.formId || SITE_ENQUIRY_FORM_ID, {
        "your-name": values.name.trim(),
        "your-email": values.email.trim(),
        "your-phone": values.phone.trim(),
        "your-company": values.company.trim(),
        "your-message": composeMessage(),
        services: lead.servicesLabel || [serviceTitle, pageTitle].filter(Boolean).join(" / "),
      });

      if (data?.status === "mail_sent") {
        setStatus({ type: "ok", text: lead.successMessage || data.message });
        setValues(EMPTY);
        setErrors({});
        return;
      }

      if (data?.status === "validation_failed" && Array.isArray(data.invalid_fields)) {
        const mapped = {};
        for (const f of data.invalid_fields) {
          const key = { "your-name": "name", "your-email": "email", "your-company": "company" }[f.field];
          if (key) mapped[key] = f.message;
        }
        setErrors(mapped);
      }

      // CF7's own spam copy reads like an outage, so the page's own error
      // message (which can point at a direct email) wins when it's set.
      setStatus({ type: "err", text: lead.errorMessage || data?.message || "" });
    } catch {
      setStatus({ type: "err", text: lead.errorMessage });
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className="lead-modal"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lead-panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="leadTitle">
        <button type="button" className="lead-close" aria-label="Close enquiry form" onClick={onClose}>
          ×
        </button>
        {lead.eyebrow ? <div className="eyebrow">{lead.eyebrow}</div> : null}
        <h2 id="leadTitle">{lead.heading || planTitle || pageTitle}</h2>
        {lead.description ? <p>{lead.description}</p> : null}

        <form className="lead-form" onSubmit={handleSubmit} noValidate>
          <label>
            Your name
            <input
              ref={nameRef}
              name="name"
              autoComplete="name"
              maxLength={100}
              value={values.name}
              aria-invalid={errors.name ? "true" : undefined}
              onChange={(e) => setField("name", e.target.value)}
            />
            {errors.name ? <span className="field-error">{errors.name}</span> : null}
          </label>
          <label>
            Work email
            <input
              name="email"
              type="email"
              autoComplete="email"
              maxLength={160}
              value={values.email}
              aria-invalid={errors.email ? "true" : undefined}
              onChange={(e) => setField("email", e.target.value)}
            />
            {errors.email ? <span className="field-error">{errors.email}</span> : null}
          </label>
          <label>
            Company or website
            <input
              name="company"
              autoComplete="organization"
              maxLength={180}
              value={values.company}
              aria-invalid={errors.company ? "true" : undefined}
              onChange={(e) => setField("company", e.target.value)}
            />
            {errors.company ? <span className="field-error">{errors.company}</span> : null}
          </label>
          <label>
            Phone (optional)
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              value={values.phone}
              onChange={(e) => setField("phone", e.target.value)}
            />
          </label>
          <label>
            Anything we should know?
            <textarea
              name="message"
              maxLength={800}
              value={values.message}
              onChange={(e) => setField("message", e.target.value)}
            />
          </label>
          {lead.consent ? (
            <label className="consent">
              <input
                type="checkbox"
                name="consent"
                checked={values.consent}
                aria-invalid={errors.consent ? "true" : undefined}
                onChange={(e) => setField("consent", e.target.checked)}
              />
              <span>
                {lead.consent}
                {errors.consent ? <span className="field-error">{errors.consent}</span> : null}
              </span>
            </label>
          ) : null}
          <button type="submit" disabled={sending}>
            {sending ? "Sending…" : lead.submitLabel || "Send"}
          </button>
          {status?.text ? (
            <p className={`status ${status.type}`} role="status" aria-live="polite">
              {status.text}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
