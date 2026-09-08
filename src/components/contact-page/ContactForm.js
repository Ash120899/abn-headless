"use client";

// The enquiry form. Posts straight to Contact Form 7's REST feedback
// endpoint, so submissions land in WordPress exactly as the old form's did —
// same notification mail, same CF7 record — without WP rendering the page.
//
// Form 12775 ("Next Contact Form") was created for this page with only the
// fields the concept shows. Verified against the live endpoint: your-name,
// your-email and your-message are required; phone, company and services are
// optional.
//
// The site runs reCAPTCHA v3 globally (Contact → Integration), so CF7 scores
// every submission and rejects unscored ones as spam. We mint a token in the
// browser and send it as _wpcf7_recaptcha_response.
//
// Worth knowing when testing: reCAPTCHA grades a token server-side against
// the key's authorised domain list. On localhost the token mints fine but
// always scores ~0, so CF7 answers "spam" no matter what is submitted. The
// same payload from abnjunction.com returns mail_sent. A spam response in
// local dev is therefore expected and is not a bug in this component.
//
// The concept's service pills are multi-select and are sent as one
// comma-joined string in the `services` hidden field.
import { useState } from "react";

const ENDPOINT =
  "https://abnjunction.com/wp-json/contact-form-7/v1/contact-forms/12775/feedback";

// Public site key, read from the live page's reCAPTCHA script tag. Site keys
// are designed to be exposed in client code; the secret stays in WordPress.
const RECAPTCHA_KEY = "6Lei74sqAAAAABAzYZOg9Zf8RwR6wihMLl3jGpbk";

// Loads the reCAPTCHA script once and resolves with a fresh token. Resolves
// null on any failure so a CDN blip degrades to "CF7 decides" rather than
// blocking the user from submitting at all.
function getRecaptchaToken() {
  return new Promise((resolve) => {
    function execute() {
      try {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(RECAPTCHA_KEY, { action: "wpcf7" })
            .then(resolve)
            .catch(() => resolve(null));
        });
      } catch {
        resolve(null);
      }
    }

    if (window.grecaptcha?.execute) return execute();

    const existing = document.querySelector("script[data-abn-recaptcha]");
    if (existing) {
      existing.addEventListener("load", execute, { once: true });
      existing.addEventListener("error", () => resolve(null), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_KEY}`;
    script.async = true;
    script.dataset.abnRecaptcha = "true";
    script.addEventListener("load", execute, { once: true });
    script.addEventListener("error", () => resolve(null), { once: true });
    document.head.appendChild(script);
  });
}

const SERVICES = [
  { label: "Marketing", color: "var(--ct-dm)" },
  { label: "Design", color: "var(--ct-design)" },
  { label: "Development", color: "var(--ct-dev)" },
  { label: "Video", color: "var(--ct-video)" },
  { label: "Security", color: "var(--ct-security)" },
  { label: "Not sure yet", color: "#111" },
];

const NOT_SURE = "Not sure yet";
const EMPTY = { name: "", email: "", phone: "", company: "", message: "" };

export default function ContactForm({ content }) {
  const [selected, setSelected] = useState([]);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // {type:'ok'|'err', text}
  const [sending, setSending] = useState(false);

  function toggleService(label) {
    setSelected((prev) => {
      // "Not sure yet" is exclusive: picking it clears the rest, and picking
      // anything else clears it.
      if (label === NOT_SURE) return prev.includes(NOT_SURE) ? [] : [NOT_SURE];
      const next = prev.filter((s) => s !== NOT_SURE);
      return next.includes(label) ? next.filter((s) => s !== label) : [...next, label];
    });
  }

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
    if (!values.message.trim()) next.message = "A line or two about the project helps.";
    return next;
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
      const token = await getRecaptchaToken();

      const body = new FormData();
      if (token) body.set("_wpcf7_recaptcha_response", token);
      // CF7's own hidden fields. Without _wpcf7 the endpoint rejects the post.
      body.set("_wpcf7", "12775");
      body.set("_wpcf7_version", "6.1.6");
      body.set("_wpcf7_locale", "en_US");
      body.set("_wpcf7_unit_tag", "wpcf7-f12775-o1");
      body.set("_wpcf7_container_post", "0");

      body.set("your-name", values.name.trim());
      body.set("your-email", values.email.trim());
      body.set("your-phone", values.phone.trim());
      body.set("your-company", values.company.trim());
      body.set("your-message", values.message.trim());
      body.set("services", selected.join(", "));

      const res = await fetch(ENDPOINT, { method: "POST", body });
      const data = await res.json().catch(() => null);

      if (data?.status === "mail_sent") {
        setStatus({ type: "ok", text: data.message || content.successMessage });
        setValues(EMPTY);
        setSelected([]);
        setErrors({});
        return;
      }

      // CF7 reports per-field problems; surface them against the right input
      // rather than showing one generic failure.
      if (data?.status === "validation_failed" && Array.isArray(data.invalid_fields)) {
        const mapped = {};
        for (const f of data.invalid_fields) {
          const key = { "your-name": "name", "your-email": "email", "your-message": "message" }[f.field];
          if (key) mapped[key] = f.message;
        }
        setErrors(mapped);
        setStatus({ type: "err", text: data.message || content.errorMessage });
        return;
      }

      // CF7's own spam copy ("error trying to send") reads like an outage and
      // gives no way forward, so point at the direct email instead.
      if (data?.status === "spam") {
        setStatus({ type: "err", text: content.spamMessage });
        return;
      }

      setStatus({ type: "err", text: data?.message || content.errorMessage });
    } catch {
      setStatus({ type: "err", text: content.errorMessage });
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="kicker">{content.kicker}</div>
        <h2>{content.heading}</h2>
        <p className="contact-lead">{content.lead}</p>

        <div className="form-shell">
          <div className="card">
            <h3>{content.formHeading}</h3>
            <p className="sub">{content.formSub}</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="service-select">
                {SERVICES.map((s) => (
                  <button
                    type="button"
                    key={s.label}
                    className={`service-btn${selected.includes(s.label) ? " active" : ""}`}
                    style={{ "--c": s.color }}
                    aria-pressed={selected.includes(s.label)}
                    onClick={() => toggleService(s.label)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="fields">
                <div className="field">
                  <label htmlFor="ct-name">Name</label>
                  <input
                    id="ct-name"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    value={values.name}
                    aria-invalid={errors.name ? "true" : undefined}
                    onChange={(e) => setField("name", e.target.value)}
                  />
                  {errors.name ? <span className="field-error">{errors.name}</span> : null}
                </div>

                <div className="field">
                  <label htmlFor="ct-email">Email</label>
                  <input
                    id="ct-email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    value={values.email}
                    aria-invalid={errors.email ? "true" : undefined}
                    onChange={(e) => setField("email", e.target.value)}
                  />
                  {errors.email ? <span className="field-error">{errors.email}</span> : null}
                </div>

                <div className="field">
                  <label htmlFor="ct-phone">Phone / WhatsApp</label>
                  <input
                    id="ct-phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 …"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                  />
                </div>

                <div className="field">
                  <label htmlFor="ct-company">Company / Website</label>
                  <input
                    id="ct-company"
                    name="company"
                    placeholder="Company name or URL"
                    autoComplete="organization"
                    value={values.company}
                    onChange={(e) => setField("company", e.target.value)}
                  />
                </div>

                <div className="field full">
                  <label htmlFor="ct-message">Tell us what&rsquo;s happening</label>
                  <textarea
                    id="ct-message"
                    name="message"
                    placeholder="What are you trying to achieve, build, improve or fix?"
                    value={values.message}
                    aria-invalid={errors.message ? "true" : undefined}
                    onChange={(e) => setField("message", e.target.value)}
                  />
                  {errors.message ? <span className="field-error">{errors.message}</span> : null}
                </div>
              </div>

              <div className="form-bottom">
                <div className="micro">{content.micro}</div>
                <button className="submit" type="submit" disabled={sending}>
                  {sending ? "Sending…" : content.submitLabel}
                </button>
              </div>

              {status ? (
                <p className={`form-status ${status.type}`} role="status" aria-live="polite">
                  {status.text}
                </p>
              ) : null}
            </form>
          </div>

          <aside className="card why">
            <div className="kicker">{content.why.kicker}</div>
            <h3>{content.why.heading}</h3>
            <p className="sub">{content.why.sub}</p>
            <ul>
              {content.why.points.map((point) => (
                <li key={point.title}>
                  <b className={point.highlight ? "ai-line" : undefined}>{point.title}</b>
                  <small>{point.detail}</small>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
