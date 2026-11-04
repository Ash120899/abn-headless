// Browser-side Contact Form 7 submission, shared by the contact page form
// and the sub-service Campaign Lab enquiry. Posts straight to CF7's REST
// feedback endpoint, so submissions land in WordPress exactly as the old
// forms' did — same notification mail, same CF7 record.
//
// The site runs reCAPTCHA v3 globally (Contact → Integration), so CF7 scores
// every submission and rejects unscored ones as spam. A token is minted in
// the browser and sent as _wpcf7_recaptcha_response.
//
// Worth knowing when testing: reCAPTCHA grades a token server-side against
// the key's authorised domain list. On localhost the token mints fine but
// always scores ~0, so CF7 answers "spam" no matter what is submitted. The
// same payload from abnjunction.com returns mail_sent.

// "Next Contact Form": your-name, your-email and your-message are required;
// your-phone, your-company and services are optional. Any other form a page
// posts to must use the same field names.
export const SITE_ENQUIRY_FORM_ID = 12775;

// Public site key, read from the live page's reCAPTCHA script tag. Site keys
// are designed to be exposed in client code; the secret stays in WordPress.
const RECAPTCHA_KEY = "6Lei74sqAAAAABAzYZOg9Zf8RwR6wihMLl3jGpbk";

// Loads the reCAPTCHA script once and resolves with a fresh token. Resolves
// null on any failure so a CDN blip degrades to "CF7 decides" rather than
// blocking the user from submitting at all.
export function getRecaptchaToken() {
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

/**
 * Posts `fields` ({"your-name": ..., ...}) to a CF7 form and returns CF7's
 * JSON reply (status: mail_sent | validation_failed | spam | mail_failed),
 * or null when the reply isn't JSON. Network errors throw.
 */
export async function submitCf7(formId, fields) {
  const token = await getRecaptchaToken();

  const body = new FormData();
  if (token) body.set("_wpcf7_recaptcha_response", token);
  // CF7's own hidden fields. Without _wpcf7 the endpoint rejects the post.
  body.set("_wpcf7", String(formId));
  body.set("_wpcf7_version", "6.1.6");
  body.set("_wpcf7_locale", "en_US");
  body.set("_wpcf7_unit_tag", `wpcf7-f${formId}-o1`);
  body.set("_wpcf7_container_post", "0");
  for (const [key, value] of Object.entries(fields)) body.set(key, value);

  const res = await fetch(
    `https://abnjunction.com/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
    { method: "POST", body }
  );
  return res.json().catch(() => null);
}
